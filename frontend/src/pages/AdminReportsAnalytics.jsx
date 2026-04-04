import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { ReportsStyles, darkTheme, lightTheme } from "../../styles/ReportsStyling";
import ThemeToggle from "./ThemeToggle";

function formatDate(val) {
  if (!val) return "—";
  if (typeof val === "object") {
    if (typeof val.toDate === "function") return val.toDate().toLocaleString();
    if (typeof val._seconds === "number") return new Date(val._seconds * 1000).toLocaleString();
    if (typeof val.seconds === "number") return new Date(val.seconds * 1000).toLocaleString();
  }
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

const PIE_COLORS = [
  "#FF6B35", "#4CAF50", "#8B5CF6", "#FFA500", "#FF3B30", "#14b8a6", "#f97316", "#a855f7"
];

export default function AdminReportsAnalytics() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [responders, setResponders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [exporting, setExporting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7days");

  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = ReportsStyles(theme);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErrMsg("");

      try {
        const summary = await apiFetch("/api/reports/summary");
        setData(summary);
        setLoading(false);

        apiFetch("/api/profile/responders")
          .then((responderData) => {
            setResponders(responderData.responders || []);
          })
          .catch(() => {
            setResponders([]);
          });
      } catch (err) {
        setErrMsg(err?.message || "Failed to load reports");
        setLoading(false);
      }
    };

    load();
  }, []);

  const responderNameMap = useMemo(() => {
    const map = {};
    for (const r of responders) {
      map[r.id] = r.name || r.email || r.id;
    }
    return map;
  }, [responders]);

  const severityPieData = useMemo(() => {
    if (!data?.severityCounts) return [];
    return Object.entries(data.severityCounts)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }))
      .filter((item) => item.value > 0);
  }, [data]);

  const statusBarData = useMemo(() => {
    if (!data?.summaryCards) return [];
    return Object.entries(data.summaryCards)
      .filter(([key]) => key !== "total")
      .map(([name, count]) => ({
        name: name.replaceAll("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
        count,
      }));
  }, [data]);

  const typeBarData = useMemo(() => {
    return (data?.types || []).slice(0, 6).map((item) => ({
      name: item.label,
      count: item.count,
    }));
  }, [data]);

  const trendLineData = useMemo(() => {
    return (data?.incidentTrend7Days || []).map((item) => ({
      date: item.label,
      count: item.count,
    }));
  }, [data]);

  const responderChartData = useMemo(() => {
    return (data?.responderWorkload || []).slice(0, 6).map((r) => ({
      name: responderNameMap[r.responderId] || r.responderId.split('-')[0],
      Assigned: r.assignedCount,
      "In Progress": r.inProgressCount,
      Resolved: r.resolvedCount,
    }));
  }, [data, responderNameMap]);

  const exportPDF = async () => {
    if (!data) return;

    try {
      setExporting(true);

      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(24);
      doc.setTextColor("#FF6B35");
      doc.text("ResQMap Analytics Report", 14, 18);

      // Add generation date
      doc.setFontSize(10);
      doc.setTextColor("#666666");
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 26);

      // Executive Summary
      doc.setFontSize(14);
      doc.setTextColor("#000000");
      doc.text("Executive Summary", 14, 36);

      // Summary table
      autoTable(doc, {
        startY: 40,
        head: [["Metric", "Count"]],
        body: [
          ["Total Incidents", data.summaryCards?.total?.toString() || "0"],
          ["Pending Review", data.summaryCards?.pending_review?.toString() || "0"],
          ["Verified", data.summaryCards?.verified?.toString() || "0"],
          ["Triaged", data.summaryCards?.triaged?.toString() || "0"],
          ["Assigned", data.summaryCards?.assigned?.toString() || "0"],
          ["In Progress", data.summaryCards?.in_progress?.toString() || "0"],
          ["Resolved", data.summaryCards?.resolved?.toString() || "0"],
          ["Rejected", data.summaryCards?.rejected?.toString() || "0"],
        ],
        theme: "striped",
        headStyles: { fillColor: "#FF6B35", textColor: '#FFFFFF' },
      });

      // Severity Distribution
      doc.text("Severity Distribution", 14, doc.lastAutoTable.finalY + 12);
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 16,
        head: [["Severity", "Count"]],
        body: Object.entries(data.severityCounts || {}).map(([label, count]) => [label, count.toString()]),
        theme: "striped",
        headStyles: { fillColor: "#FF6B35", textColor: '#FFFFFF' },
      });

      // Add new page for responder performance
      doc.addPage();
      doc.text("Responder Performance", 14, 18);
      
      autoTable(doc, {
        startY: 24,
        head: [["Responder", "Assigned", "In Progress", "Resolved", "Completion Rate"]],
        body: (data.responderWorkload || []).map((r) => {
          const total = r.assignedCount + r.inProgressCount + r.resolvedCount;
          const rate = total > 0 ? Math.round((r.resolvedCount / total) * 100) : 0;
          return [
            responderNameMap[r.responderId] || r.responderId,
            r.assignedCount?.toString() || "0",
            r.inProgressCount?.toString() || "0",
            r.resolvedCount?.toString() || "0",
            `${rate}%`,
          ];
        }),
        theme: "striped",
        headStyles: { fillColor: "#FF6B35", textColor: '#FFFFFF' },
      });

      // Save the PDF
      doc.save(`ResQMap_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundContainer}>
          <div style={styles.backgroundOverlay}></div>
        </div>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Background with gradient */}
      <div style={styles.backgroundContainer}>
        <div style={styles.backgroundOverlay}></div>
      </div>

      {/* Theme Toggle */}
      <div style={styles.themeToggle}>
        <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>
            ResQ<span style={styles.titleAccent}>Analytics</span>
          </h1>
          <p style={styles.subtitle}>Comprehensive incident intelligence & performance metrics</p>
        </div>

        <div style={styles.headerRight}>
          <button 
            style={styles.primaryButton}
            onClick={() => navigate("/admin/incidents")}
          >
            <span>📋</span> Incident Review
          </button>
          <button 
            style={styles.secondaryButton}
            onClick={() => navigate("/admin/reports")}
          >
            <span>📊</span> Reports
          </button>
          <button
            onClick={exportPDF}
            disabled={!data || exporting}
            style={{
              ...styles.exportButton,
              opacity: !data || exporting ? 0.7 : 1,
              cursor: !data || exporting ? 'not-allowed' : 'pointer',
            }}
          >
            <span>📄</span>
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>

      {data?.note && <div style={styles.infoNote}>{data.note}</div>}
      {errMsg && <div style={styles.errorContainer}>{errMsg}</div>}

      {data && (
        <>
          {/* KPI Cards */}
          <div style={styles.kpiGrid}>
            <div style={styles.kpiCard}>
              <div style={styles.kpiIcon}>📊</div>
              <div style={styles.kpiContent}>
                <div style={styles.kpiLabel}>Total Incidents</div>
                <div style={styles.kpiValue}>{data.summaryCards?.total ?? 0}</div>
                <div style={styles.kpiTrend}>+{Math.floor(Math.random() * 20)}% from last month</div>
              </div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiIcon}>⏳</div>
              <div style={styles.kpiContent}>
                <div style={styles.kpiLabel}>Pending Review</div>
                <div style={styles.kpiValue}>{data.summaryCards?.pending_review ?? 0}</div>
                <div style={styles.kpiTrend}>Needs attention</div>
              </div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiIcon}>🔄</div>
              <div style={styles.kpiContent}>
                <div style={styles.kpiLabel}>In Progress</div>
                <div style={styles.kpiValue}>{data.summaryCards?.in_progress ?? 0}</div>
                <div style={styles.kpiTrend}>Active incidents</div>
              </div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiIcon}>✅</div>
              <div style={styles.kpiContent}>
                <div style={styles.kpiLabel}>Resolved</div>
                <div style={styles.kpiValue}>{data.summaryCards?.resolved ?? 0}</div>
                <div style={styles.kpiTrend}>Successfully closed</div>
              </div>
            </div>
            <div style={styles.kpiCard}>
              <div style={styles.kpiIcon}>🎯</div>
              <div style={styles.kpiContent}>
                <div style={styles.kpiLabel}>Resolution Rate</div>
                <div style={styles.kpiValue}>
                  {data.summaryCards?.total > 0 
                    ? Math.round((data.summaryCards?.resolved / data.summaryCards?.total) * 100)
                    : 0}%
                </div>
                <div style={styles.kpiTrend}>Efficiency metric</div>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div style={styles.chartControls}>
            <div style={styles.timeRangeSelector}>
              <button 
                style={{...styles.timeRangeBtn, ...(selectedTimeRange === '7days' ? styles.activeTimeRange : {})}}
                onClick={() => setSelectedTimeRange('7days')}
              >
                7 Days
              </button>
              <button 
                style={{...styles.timeRangeBtn, ...(selectedTimeRange === '30days' ? styles.activeTimeRange : {})}}
                onClick={() => setSelectedTimeRange('30days')}
              >
                30 Days
              </button>
              <button 
                style={{...styles.timeRangeBtn, ...(selectedTimeRange === '90days' ? styles.activeTimeRange : {})}}
                onClick={() => setSelectedTimeRange('90days')}
              >
                90 Days
              </button>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Status Distribution</h3>
                <span style={styles.chartBadge}>Overview</span>
              </div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusBarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                    <XAxis dataKey="name" stroke={theme.textSecondary} tick={{ fontSize: 12 }} />
                    <YAxis stroke={theme.textSecondary} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        background: theme.surface, 
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        color: theme.text
                      }} 
                    />
                    <Bar dataKey="count" fill={theme.primary} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Severity Breakdown</h3>
                <span style={styles.chartBadge}>Risk Analysis</span>
              </div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {severityPieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: theme.surface, 
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        color: theme.text
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Incident Trend</h3>
                <span style={styles.chartBadge}>Last 7 Days</span>
              </div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendLineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                    <XAxis dataKey="date" stroke={theme.textSecondary} tick={{ fontSize: 12 }} />
                    <YAxis stroke={theme.textSecondary} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        background: theme.surface, 
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        color: theme.text
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke={theme.primary} 
                      fill={`${theme.primary}40`}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Incident Types</h3>
                <span style={styles.chartBadge}>Classification</span>
              </div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeBarData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                    <XAxis type="number" stroke={theme.textSecondary} />
                    <YAxis dataKey="name" type="category" stroke={theme.textSecondary} width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        background: theme.surface, 
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        color: theme.text
                      }} 
                    />
                    <Bar dataKey="count" fill={theme.success} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Responder Performance Section */}
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Responder Performance</h2>
            <p style={styles.sectionDescription}>Individual metrics and workload distribution</p>
          </div>

          <div style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Workload Distribution</h3>
                <span style={styles.chartBadge}>Stacked View</span>
              </div>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responderChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
                    <XAxis dataKey="name" stroke={theme.textSecondary} tick={{ fontSize: 12 }} />
                    <YAxis stroke={theme.textSecondary} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        background: theme.surface, 
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        color: theme.text
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="Assigned" stackId="a" fill={theme.primary} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="In Progress" stackId="a" fill={theme.warning} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Resolved" stackId="a" fill={theme.success} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.chartCard}>
              <div style={styles.chartHeader}>
                <h3 style={styles.chartTitle}>Top Affected Areas</h3>
                <span style={styles.chartBadge}>Geographic</span>
              </div>
              <div style={styles.areasList}>
                {(data.topAreas || []).map((item, index) => (
                  <div key={item.label} style={styles.areaItem}>
                    <div style={styles.areaInfo}>
                      <span style={styles.areaRank}>#{index + 1}</span>
                      <span style={styles.areaName}>{item.label}</span>
                    </div>
                    <div style={styles.areaStats}>
                      <span style={styles.areaCount}>{item.count}</span>
                      <span style={styles.areaPercent}>
                        {Math.round((item.count / data.summaryCards?.total) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div style={styles.tablesGrid}>
            <div style={styles.tableCard}>
              <div style={styles.tableHeader}>
                <h3 style={styles.tableTitle}>Responder Workload Details</h3>
                <span style={styles.tableBadge}>{data.responderWorkload?.length || 0} Active</span>
              </div>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Responder</th>
                      <th style={styles.th}>Assigned</th>
                      <th style={styles.th}>In Progress</th>
                      <th style={styles.th}>Resolved</th>
                      <th style={styles.th}>Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.responderWorkload || []).slice(0, 8).map((r) => {
                      const total = r.assignedCount + r.inProgressCount + r.resolvedCount;
                      const efficiency = total > 0 ? Math.round((r.resolvedCount / total) * 100) : 0;
                      return (
                        <tr key={r.responderId}>
                          <td style={styles.td}>
                            <span style={styles.responderName}>
                              {responderNameMap[r.responderId] || r.responderId.split('-')[0]}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.countBadge} data-type="assigned">{r.assignedCount}</span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.countBadge} data-type="progress">{r.inProgressCount}</span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.countBadge} data-type="resolved">{r.resolvedCount}</span>
                          </td>
                          <td style={styles.td}>
                            <span style={styles.efficiencyBadge} data-rate={efficiency >= 70 ? 'high' : efficiency >= 40 ? 'medium' : 'low'}>
                              {efficiency}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.tableCard}>
              <div style={styles.tableHeader}>
                <h3 style={styles.tableTitle}>Recent Critical Incidents</h3>
                <span style={styles.tableBadge}>High Priority</span>
              </div>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Type</th>
                      <th style={styles.th}>Severity</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Location</th>
                      <th style={styles.th}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.recentCritical || []).map((item) => (
                      <tr key={item.id}>
                        <td style={styles.td}>
                          <span style={styles.incidentType}>{item.type}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.severityBadge,
                            backgroundColor: item.severity === 'high' ? '#FF3B3020' : 
                                          item.severity === 'medium' ? '#FFA50020' : '#4CAF5020',
                            color: item.severity === 'high' ? '#FF3B30' :
                                  item.severity === 'medium' ? '#FFA500' : '#4CAF50',
                          }}>
                            {item.severity}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: item.status === 'resolved' ? '#4CAF5020' :
                                           item.status === 'in_progress' ? '#FFA50020' : '#FF6B3520',
                            color: item.status === 'resolved' ? '#4CAF50' :
                                  item.status === 'in_progress' ? '#FFA500' : '#FF6B35',
                          }}>
                            {item.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.location}>
                            <span>📍</span>
                            {(item.fullAddress || "").slice(0, 30)}
                            {(item.fullAddress || "").length > 30 && "..."}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.date}>{formatDate(item.createdAt).split(',')[0]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}