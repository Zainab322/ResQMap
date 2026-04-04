import { useEffect, useMemo, useState, useCallback } from "react";
import { AdminIncidentStyles, darkTheme, lightTheme } from "../../styles/AdminIncidentStyling";
import { apiFetch } from "../services/api.js";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

// Import background images
import bgImageDark from "../assets/images/bg-image1.jpg";
import bgImageLight from "../assets/images/bg-image-light.jpg";

export default function AdminIncidentReview() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [verified, setVerified] = useState([]);
  const [triaged, setTriaged] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [responders, setResponders] = useState([]);
  const [selectedResponder, setSelectedResponder] = useState({});
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [verifyingTriagedId, setVerifyingTriagedId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedStat, setSelectedStat] = useState("pending");

  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = AdminIncidentStyles(theme);

  const formatDate = (val) => {
    if (!val) return "—";
    if (typeof val === "object") {
      if (typeof val.toDate === "function") return val.toDate().toLocaleString();
      if (typeof val._seconds === "number") return new Date(val._seconds * 1000).toLocaleString();
      if (typeof val.seconds === "number") return new Date(val.seconds * 1000).toLocaleString();
    }
    const d = new Date(val);
    return isNaN(d.getTime()) ? "—" : d.toLocaleString();
  };

  const fetchPending = useCallback(async () => {
    const data = await apiFetch("/api/incidents/pending");
    setPending(data.incidents || []);
  }, []);

  const fetchVerified = useCallback(async () => {
    const data = await apiFetch("/api/incidents/verified");
    setVerified(data.incidents || []);
  }, []);

  const fetchAssigned = useCallback(async () => {
    const data = await apiFetch("/api/incidents/assigned");
    const list = data.incidents || [];
    const tri = list.filter((x) => String(x.status || "").toLowerCase() === "triaged");
    setTriaged(tri);
    setAssigned(list);
  }, []);

  const fetchResponders = useCallback(async () => {
    try {
      const data = await apiFetch("/api/profile/responders");
      setResponders(data.responders || []);
    } catch (err) {
      console.log("Failed to fetch responders:", err?.message);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setErrMsg("");
    setLoading(true);
    try {
      await Promise.all([fetchPending(), fetchVerified(), fetchAssigned(), fetchResponders()]);
    } catch (err) {
      setErrMsg(err?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [fetchAssigned, fetchPending, fetchResponders, fetchVerified]);

  useEffect(() => {
    refreshAll();
    const t = setInterval(() => {
      fetchAssigned().catch(() => {});
    }, 8000);
    return () => clearInterval(t);
  }, [fetchAssigned, refreshAll]);

  useEffect(() => {
    setTab(selectedStat);
  }, [selectedStat]);

  const reviewIncident = async (id, decision) => {
    const ok = window.confirm(`Are you sure you want to ${decision.toUpperCase()} this incident?`);
    if (!ok) return;
    const severity = prompt("Override severity? (low/medium/high) or leave blank:");
    try {
      await apiFetch(`/api/incidents/${id}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          ...(severity ? { severity } : {}),
        }),
      });
      if (decision === "rejected") {
        setPending((prev) => prev.filter((x) => x.id !== id));
        return;
      }
      const verifiedItem = pending.find((x) => x.id === id);
      setPending((prev) => prev.filter((x) => x.id !== id));
      if (verifiedItem) {
        setVerified((prev) => [
          {
            ...verifiedItem,
            status: "verified",
            ...(severity ? { severity } : {}),
            updatedAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (err) {
      alert(err?.message || "Failed to review incident");
    }
  };

  const assignIncident = async (incidentId) => {
    const responderId = selectedResponder[incidentId];
    if (!responderId) return alert("Select a responder first");
    try {
      await apiFetch(`/api/incidents/${incidentId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responderId }),
      });
      alert("Incident assigned ✅");
      setVerified((prev) => prev.filter((x) => x.id !== incidentId));
      await fetchAssigned();
      setExpandedRow(null);
    } catch (err) {
      alert(err?.message || "Failed to assign incident");
    }
  };

  const verifyTriagedIncident = async (incidentId) => {
    const ok = window.confirm("Verify this triaged incident and move it to Assigned?");
    if (!ok) return;
    try {
      setVerifyingTriagedId(incidentId);
      setErrMsg("");
      await apiFetch(`/api/incidents/${incidentId}/verify-triaged`, {
        method: "PATCH",
      });
      await fetchAssigned();
      alert("Triaged incident verified ✅");
      setExpandedRow(null);
    } catch (err) {
      alert(err?.message || "Failed to verify triaged incident");
    } finally {
      setVerifyingTriagedId(null);
    }
  };

  const rows = useMemo(() => {
    let data = [];
    if (tab === "pending") data = pending;
    if (tab === "verified") data = verified;
    if (tab === "triaged") data = triaged;
    if (tab === "assigned") data = assigned;

    return data.filter(incident => {
      return searchTerm === "" || 
        incident.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.fullAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.type?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [assigned, pending, tab, triaged, verified, searchTerm]);

  const stats = useMemo(() => ({
    pending: pending.length,
    verified: verified.length,
    triaged: triaged.length,
    assigned: assigned.length,
    resolved: assigned.filter((i) => String(i.status || "").toLowerCase() === "resolved").length
  }), [pending, verified, triaged, assigned]);

  const statusLabel = (s) => {
    const v = String(s || "").toLowerCase();
    if (v === "triaged") return "Triaged";
    if (v === "assigned") return "Assigned";
    if (v === "in_progress") return "In Progress";
    if (v === "resolved") return "Resolved";
    if (v === "verified") return "Verified";
    if (v === "pending_review") return "Pending Review";
    if (v === "rejected") return "Rejected";
    return s || "—";
  };

  const responderName = (incident) => {
    if (incident.assignedResponder?.name) return incident.assignedResponder.name;
    if (incident.assignedResponder?.email) return incident.assignedResponder.email;
    const rid = incident.assignedTo || incident.triagedBy;
    const r = responders.find((x) => x.id === rid);
    return r?.name || r?.email || (rid ? rid : "—");
  };

  const getSeverityColor = (severity) => {
    switch (String(severity || "").toLowerCase()) {
      case "high": return "#FF3B30";
      case "medium": return "#FFA500";
      case "low": return "#4CAF50";
      default: return "#999";
    }
  };

  const getStatusColor = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "pending_review": return "#FFA500";
      case "verified": return "#4CAF50";
      case "triaged": return "#8B5CF6";
      case "assigned": return "#FF6B35";
      case "in_progress": return "#FF6B35";
      case "resolved": return "#4CAF50";
      case "rejected": return "#FF3B30";
      default: return "#999";
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatClick = (statName) => {
    setSelectedStat(statName);
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.backgroundContainer}>
        <img 
          src={isDarkMode ? bgImageDark : bgImageLight} 
          alt="Background" 
          style={styles.backgroundImage}
        />
        <div style={styles.overlay}></div>
      </div>

      {/* Theme Toggle */}
      <div style={styles.themeToggle}>
        <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>
            ResQ<span style={styles.titleAccent}>Admin</span>
          </h1>
          <p style={styles.subtitle}>Incident Management Dashboard</p>
        </div>

        <div style={styles.headerRight}>
          <button 
            style={styles.primaryButton}
            onClick={() => navigate("/admin/incidents")}
          >
            <span>📋</span> Review Incidents
          </button>
          <button 
            style={styles.secondaryButton}
            onClick={() => navigate("/admin/reports")}
          >
            <span>📊</span> Reports
          </button>
        </div>
      </div>

      {/* Clickable Stats Bar */}
      <div style={styles.statsBar}>
        <div 
          style={{
            ...styles.statItem,
            ...(selectedStat === "pending" ? styles.activeStat : {})
          }}
          onClick={() => handleStatClick("pending")}
        >
          <span style={styles.statLabel}>Pending</span>
          <span style={styles.statValue}>{stats.pending}</span>
          <span style={styles.statTrend}>+12%</span>
        </div>
        <div style={styles.statDivider}></div>
        <div 
          style={{
            ...styles.statItem,
            ...(selectedStat === "verified" ? styles.activeStat : {})
          }}
          onClick={() => handleStatClick("verified")}
        >
          <span style={styles.statLabel}>Verified</span>
          <span style={{...styles.statValue, color: theme.success}}>{stats.verified}</span>
          <span style={styles.statTrend}>+8%</span>
        </div>
        <div style={styles.statDivider}></div>
        <div 
          style={{
            ...styles.statItem,
            ...(selectedStat === "triaged" ? styles.activeStat : {})
          }}
          onClick={() => handleStatClick("triaged")}
        >
          <span style={styles.statLabel}>Triaged</span>
          <span style={{...styles.statValue, color: theme.purple}}>{stats.triaged}</span>
          <span style={styles.statTrend}>+5%</span>
        </div>
        <div style={styles.statDivider}></div>
        <div 
          style={{
            ...styles.statItem,
            ...(selectedStat === "assigned" ? styles.activeStat : {})
          }}
          onClick={() => handleStatClick("assigned")}
        >
          <span style={styles.statLabel}>Assigned</span>
          <span style={{...styles.statValue, color: theme.primary}}>{stats.assigned}</span>
          <span style={styles.statTrend}>+15%</span>
        </div>
        <div style={styles.statDivider}></div>
        <div 
          style={{
            ...styles.statItem,
            ...(selectedStat === "resolved" ? styles.activeStat : {})
          }}
          onClick={() => handleStatClick("resolved")}
        >
          <span style={styles.statLabel}>Resolved</span>
          <span style={{...styles.statValue, color: theme.success}}>{stats.resolved}</span>
          <span style={styles.statTrend}>+7%</span>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.search}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {searchTerm && (
            <button style={styles.clearSearch} onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        <button onClick={refreshAll} style={styles.refreshButton}>
          <span style={styles.refreshIcon}>↻</span>
          Refresh
        </button>
      </div>

      {/* Table */}
      {!loading && !errMsg && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Severity</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((incident) => (
                <>
                  <tr 
                    key={incident.id} 
                    style={styles.tr}
                    onClick={() => toggleRow(incident.id)}
                  >
                    <td style={styles.td}>
                      <span style={styles.incidentType}>{incident.type || "Incident"}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.description}>
                        {(incident.description || "").slice(0, 60)}
                        {(incident.description || "").length > 60 && "..."}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {incident.severity && (
                        <span style={{
                          ...styles.severity,
                          backgroundColor: getSeverityColor(incident.severity) + "20",
                          color: getSeverityColor(incident.severity)
                        }}>
                          {incident.severity}
                        </span>
                      )}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.location}>
                        <span style={styles.locationIcon}>📍</span>
                        {(incident.fullAddress || "").slice(0, 30)}
                        {(incident.fullAddress || "").length > 30 && "..."}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.status,
                        backgroundColor: getStatusColor(incident.status) + "20",
                        color: getStatusColor(incident.status)
                      }}>
                        {statusLabel(incident.status)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.expandIcon}>
                        {expandedRow === incident.id ? "▼" : "▶"}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  {expandedRow === incident.id && (
                    <tr style={styles.expandedRow}>
                      <td colSpan="6" style={styles.expandedContent}>
                        <div style={styles.detailsGrid}>
                          <div style={styles.detailsSection}>
                            <h4 style={styles.detailsTitle}>Incident Details</h4>
                            <p style={styles.detailsText}>
                              <strong>Full Description:</strong> {incident.description || "No description"}
                            </p>
                            <p style={styles.detailsText}>
                              <strong>Full Address:</strong> {incident.fullAddress || "Not available"}
                            </p>
                            <p style={styles.detailsText}>
                              <strong>Created:</strong> {formatDate(incident.createdAt)}
                            </p>
                            <p style={styles.detailsText}>
                              <strong>Last Updated:</strong> {formatDate(incident.updatedAt)}
                            </p>
                          </div>

                          {incident.imageUrl && (
                            <div style={styles.detailsSection}>
                              <h4 style={styles.detailsTitle}>Image</h4>
                              <a href={incident.imageUrl} target="_blank" rel="noreferrer" style={styles.imageLink}>
                                <img src={incident.imageUrl} alt="Incident" style={styles.previewImage} />
                              </a>
                            </div>
                          )}

                          <div style={styles.detailsSection}>
                            <h4 style={styles.detailsTitle}>Actions</h4>
                            
                            {tab === "pending" && (
                              <div style={styles.actionButtons}>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    reviewIncident(incident.id, "verified");
                                  }} 
                                  style={styles.verifyBtn}
                                >
                                  ✓ Verify Incident
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    reviewIncident(incident.id, "rejected");
                                  }} 
                                  style={styles.rejectBtn}
                                >
                                  ✗ Reject Incident
                                </button>
                              </div>
                            )}

                            {tab === "verified" && (
                              <div style={styles.assignSection}>
                                <select
                                  value={selectedResponder[incident.id] || ""}
                                  onChange={(e) =>
                                    setSelectedResponder((prev) => ({
                                      ...prev,
                                      [incident.id]: e.target.value,
                                    }))
                                  }
                                  style={styles.responderSelect}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="">Select Responder</option>
                                  {responders.map((r) => (
                                    <option key={r.id} value={r.id}>
                                      {r.name || r.email}
                                    </option>
                                  ))}
                                </select>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    assignIncident(incident.id);
                                  }} 
                                  style={styles.assignBtn}
                                >
                                  Assign Incident
                                </button>
                              </div>
                            )}

                            {tab === "triaged" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  verifyTriagedIncident(incident.id);
                                }}
                                style={{
                                  ...styles.verifyTriagedBtn,
                                  opacity: verifyingTriagedId === incident.id ? 0.7 : 1
                                }}
                                disabled={verifyingTriagedId === incident.id}
                              >
                                {verifyingTriagedId === incident.id ? "Verifying..." : "✓ Verify & Assign"}
                              </button>
                            )}

                            {(tab === "triaged" || tab === "assigned") && (
                              <div style={styles.responderInfo}>
                                <p style={styles.detailsText}>
                                  <strong>Assigned Responder:</strong> {responderName(incident)}
                                </p>
                                <p style={styles.detailsText}>
                                  <strong>Progress:</strong> {statusLabel(incident.status)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📋</span>
              <h3 style={styles.emptyTitle}>No incidents found</h3>
              <p style={styles.emptyText}>
                {searchTerm ? "Try adjusting your search" : `No ${tab} incidents at the moment`}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Loading incidents...</p>
        </div>
      )}

      {/* Error State */}
      {errMsg && (
        <div style={styles.errorContainer}>
          <span style={styles.errorIcon}>⚠️</span>
          <span style={styles.errorText}>{errMsg}</span>
        </div>
      )}
    </div>
  );
}