// Theme definitions
export const darkTheme = {
  background: '#0A0B0E',
  surface: 'rgba(26, 27, 31, 0.8)',
  surfaceLight: 'rgba(44, 45, 50, 0.8)',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  primary: '#FF6B35',
  primaryLight: 'rgba(255, 107, 53, 0.15)',
  success: '#4CAF50',
  error: '#FF3B30',
  warning: '#FFA500',
  purple: '#8B5CF6',
  border: 'rgba(255, 255, 255, 0.1)',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  overlay: 'rgba(10, 11, 14, 0.7)',
};

export const lightTheme = {
  background: '#F8F9FA',
  surface: 'rgba(255, 255, 255, 0.9)',
  surfaceLight: 'rgba(241, 243, 245, 0.9)',
  text: '#1A1B1F',
  textSecondary: 'rgba(0, 0, 0, 0.7)',
  textMuted: 'rgba(0, 0, 0, 0.5)',
  primary: '#FF6B35',
  primaryLight: 'rgba(255, 107, 53, 0.1)',
  success: '#4CAF50',
  error: '#FF3B30',
  warning: '#FFA500',
  purple: '#8B5CF6',
  border: 'rgba(0, 0, 0, 0.1)',
  cardBg: 'rgba(255, 255, 255, 0.9)',
  overlay: 'rgba(255, 255, 255, 0.7)',
};

export const AdminIncidentStyles = (theme) => ({
  container: {
    minHeight: "100vh",
    padding: "32px 40px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    color: theme.text,
    transition: "all 0.3s ease",
  },

  // Background
  backgroundContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.overlay,
    backdropFilter: "blur(12px)",
  },

  // Theme Toggle
  themeToggle: {
    position: "fixed",
    top: "24px",
    right: "32px",
    zIndex: 100,
  },

  // Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: 0,
    color: theme.text,
    letterSpacing: "-0.5px",
  },

  titleAccent: {
    color: theme.primary,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "2px",
      left: 0,
      width: "100%",
      height: "2px",
      background: theme.primary,
      borderRadius: "1px",
    },
  },

  subtitle: {
    fontSize: "14px",
    color: theme.textSecondary,
    margin: 0,
    fontWeight: "400",
  },

  headerRight: {
    display: "flex",
    gap: "12px",
  },

  primaryButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: theme.primary,
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    boxShadow: `0 4px 12px ${theme.primary}30`,
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 8px 20px ${theme.primary}50`,
    },
  },

  secondaryButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: theme.surfaceLight,
      transform: "translateY(-2px)",
      borderColor: theme.primary,
    },
  },

  // Clickable Stats Bar
  statsBar: {
    display: "flex",
    alignItems: "center",
    background: theme.surface,
    backdropFilter: "blur(10px)",
    borderRadius: "14px",
    padding: "12px 20px",
    marginBottom: "24px",
    border: `1px solid ${theme.border}`,
    position: "relative",
    zIndex: 1,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },

  statItem: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 16px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      background: theme.primaryLight,
      transform: "translateY(-1px)",
    },
  },

  activeStat: {
    background: theme.primaryLight,
    border: `1px solid ${theme.primary}`,
    boxShadow: `0 2px 8px ${theme.primary}30`,
  },

  statLabel: {
    fontSize: "14px",
    color: theme.textSecondary,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },

  statValue: {
    fontSize: "22px",
    fontWeight: "700",
    color: theme.primary,
    lineHeight: 1,
  },

  statTrend: {
    fontSize: "11px",
    color: theme.success,
    background: `${theme.success}15`,
    padding: "4px 8px",
    borderRadius: "20px",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },

  statDivider: {
    width: "1px",
    height: "30px",
    background: theme.border,
    margin: "0 8px",
  },

  // Controls
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "16px",
    position: "relative",
    zIndex: 1,
  },

  search: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    padding: "0 16px",
    minWidth: "350px",
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
    "&:focus-within": {
      borderColor: theme.primary,
      boxShadow: `0 0 0 3px ${theme.primary}20`,
    },
  },

  searchIcon: {
    fontSize: "16px",
    color: theme.textMuted,
  },

  searchInput: {
    padding: "12px 0",
    border: "none",
    background: "transparent",
    color: theme.text,
    fontSize: "14px",
    width: "100%",
    outline: "none",
    "&::placeholder": {
      color: theme.textMuted,
      fontWeight: "400",
    },
  },

  clearSearch: {
    background: "none",
    border: "none",
    color: theme.textMuted,
    fontSize: "14px",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      background: theme.surfaceLight,
      color: theme.text,
    },
  },

  refreshButton: {
    padding: "10px 20px",
    borderRadius: "12px",
    border: `1px solid ${theme.primary}`,
    background: theme.surface,
    color: theme.primary,
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: theme.primaryLight,
      transform: "translateY(-2px)",
      boxShadow: `0 4px 12px ${theme.primary}30`,
    },
  },

  refreshIcon: {
    fontSize: "16px",
  },

  // Table
  tableContainer: {
    background: theme.surface,
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "16px 20px",
    fontSize: "13px",
    fontWeight: "600",
    color: theme.textSecondary,
    borderBottom: `1px solid ${theme.border}`,
    background: theme.surfaceLight,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  tr: {
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderBottom: `1px solid ${theme.border}`,
    "&:hover": {
      background: theme.primaryLight,
      transform: "translateY(-1px)",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
  },

  td: {
    padding: "16px 20px",
    fontSize: "14px",
    color: theme.text,
  },

  incidentType: {
    fontWeight: "600",
    color: theme.text,
    background: theme.primaryLight,
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  description: {
    color: theme.textSecondary,
    fontSize: "13px",
    lineHeight: "1.5",
  },

  severity: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
    textTransform: "capitalize",
  },

  location: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: theme.textSecondary,
    fontSize: "13px",
  },

  locationIcon: {
    fontSize: "14px",
    opacity: 0.7,
  },

  status: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
    textTransform: "capitalize",
  },

  expandIcon: {
    fontSize: "12px",
    color: theme.textMuted,
    display: "inline-block",
    transition: "transform 0.2s ease",
  },

  // Expanded Row
  expandedRow: {
    background: theme.surfaceLight,
    borderTop: `2px solid ${theme.primary}`,
    animation: "fadeIn 0.3s ease",
  },

  expandedContent: {
    padding: "24px",
  },

  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },

  detailsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: theme.surface,
    padding: "20px",
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
  },

  detailsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: theme.primary,
    margin: "0 0 8px 0",
    paddingBottom: "8px",
    borderBottom: `1px solid ${theme.border}`,
  },

  detailsText: {
    fontSize: "14px",
    color: theme.textSecondary,
    margin: "4px 0",
    lineHeight: "1.6",
    "& strong": {
      color: theme.text,
      fontWeight: "600",
      marginRight: "8px",
    },
  },

  previewImage: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: `1px solid ${theme.border}`,
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: `0 8px 20px ${theme.primary}30`,
    },
  },

  imageLink: {
    textDecoration: "none",
    display: "block",
  },

  actionButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
    flexWrap: "wrap",
  },

  verifyBtn: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: theme.success,
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "140px",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 16px ${theme.success}40`,
    },
  },

  rejectBtn: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: theme.error,
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "140px",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 16px ${theme.error}40`,
    },
  },

  assignSection: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  responderSelect: {
    flex: 2,
    padding: "12px 16px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    background: theme.surface,
    color: theme.text,
    fontSize: "14px",
    minWidth: "220px",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:focus": {
      borderColor: theme.primary,
      boxShadow: `0 0 0 3px ${theme.primary}20`,
    },
  },

  assignBtn: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: theme.primary,
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "140px",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 16px ${theme.primary}40`,
    },
  },

  verifyTriagedBtn: {
    width: "100%",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: theme.purple,
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 16px ${theme.purple}40`,
    },
  },

  responderInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",
    background: theme.surface,
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
  },

  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },

  emptyIcon: {
    fontSize: "48px",
    opacity: 0.5,
    marginBottom: "16px",
    display: "block",
  },

  emptyTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: theme.text,
    marginBottom: "8px",
  },

  emptyText: {
    fontSize: "14px",
    color: theme.textMuted,
  },

  // Loading State
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 0",
    background: theme.surface,
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
  },

  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: `3px solid ${theme.primaryLight}`,
    borderTopColor: theme.primary,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },

  loadingText: {
    color: theme.textSecondary,
    fontSize: "14px",
  },

  // Error State
  errorContainer: {
    background: `${theme.error}15`,
    border: `1px solid ${theme.error}`,
    borderRadius: "12px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backdropFilter: "blur(10px)",
  },

  errorIcon: {
    fontSize: "20px",
  },

  errorText: {
    color: theme.error,
    fontSize: "14px",
    fontWeight: "500",
  },

  // Global Animations (add these to your global CSS file)
  // @keyframes spin {
  //   0% { transform: rotate(0deg); }
  //   100% { transform: rotate(360deg); }
  // }
  // @keyframes fadeIn {
  //   from {
  //     opacity: 0;
  //     transform: translateY(-10px);
  //   }
  //   to {
  //     opacity: 1;
  //     transform: translateY(0);
  //   }
  // }
  // @keyframes slideIn {
  //   from {
  //     opacity: 0;
  //     transform: translateX(-20px);
  //   }
  //   to {
  //     opacity: 1;
  //     transform: translateX(0);
  //   }
  // }
});