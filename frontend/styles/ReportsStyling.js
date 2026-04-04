// Theme definitions
export const darkTheme = {
  background: '#0A0B0E',
  surface: 'rgba(26, 27, 31, 0.85)',
  surfaceLight: 'rgba(44, 45, 50, 0.85)',
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
  overlay: 'rgba(10, 11, 14, 0.85)',
  gradientStart: '#0A0B0E',
  gradientMid: '#1A1B1F',
  gradientEnd: '#2C2D32',
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
  overlay: 'rgba(255, 255, 255, 0.85)',
  gradientStart: '#F8F9FA',
  gradientMid: '#FFFFFF',
  gradientEnd: '#F1F3F5',
};

export const ReportsStyles = (theme) => ({
  container: {
    minHeight: "100vh",
    padding: "32px 40px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    color: theme.text,
    transition: "all 0.3s ease",
  },

  // Background with gradient
  backgroundContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    background: `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 50%, ${theme.gradientEnd} 100%)`,
  },

  backgroundOverlay: {
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

  exportButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: `1px solid ${theme.success}`,
    background: theme.surface,
    color: theme.success,
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: `${theme.success}20`,
      transform: "translateY(-2px)",
    },
  },

  // Info Note
  infoNote: {
    background: `${theme.primary}15`,
    border: `1px solid ${theme.primary}`,
    borderRadius: "10px",
    padding: "12px 16px",
    marginBottom: "20px",
    color: theme.textSecondary,
    fontSize: "13px",
    position: "relative",
    zIndex: 1,
  },

  // Error Container
  errorContainer: {
    background: `${theme.error}15`,
    border: `1px solid ${theme.error}`,
    borderRadius: "10px",
    padding: "12px 16px",
    marginBottom: "20px",
    color: theme.error,
    fontSize: "14px",
    position: "relative",
    zIndex: 1,
  },

  // KPI Grid
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
    marginBottom: "24px",
    position: "relative",
    zIndex: 1,
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },

  kpiCard: {
    background: theme.surface,
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.border}`,
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: `0 12px 24px -8px ${theme.primary}40`,
      borderColor: theme.primary,
    },
  },

  kpiIcon: {
    fontSize: "32px",
    background: theme.primaryLight,
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    color: theme.primary,
  },

  kpiContent: {
    flex: 1,
  },

  kpiLabel: {
    fontSize: "13px",
    color: theme.textSecondary,
    marginBottom: "4px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },

  kpiValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: theme.primary,
    lineHeight: 1.2,
    marginBottom: "4px",
  },

  kpiTrend: {
    fontSize: "11px",
    color: theme.textMuted,
    fontWeight: "400",
  },

  // Chart Controls
  chartControls: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
    position: "relative",
    zIndex: 1,
  },

  timeRangeSelector: {
    display: "flex",
    gap: "8px",
    background: theme.surface,
    padding: "4px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    backdropFilter: "blur(10px)",
  },

  timeRangeBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "transparent",
    color: theme.textSecondary,
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      background: theme.primaryLight,
      color: theme.primary,
    },
  },

  activeTimeRange: {
    background: theme.primary,
    color: "#FFFFFF",
    "&:hover": {
      background: theme.primary,
      color: "#FFFFFF",
    },
  },

  // Charts Grid
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "24px",
    position: "relative",
    zIndex: 1,
    "@media (max-width: 992px)": {
      gridTemplateColumns: "1fr",
    },
  },

  chartCard: {
    background: theme.surface,
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.border}`,
    borderRadius: "20px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: `0 12px 24px -8px ${theme.primary}30`,
    },
  },

  chartHeader: {
    padding: "16px 20px",
    borderBottom: `1px solid ${theme.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: theme.text,
    margin: 0,
  },

  chartBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    background: theme.primaryLight,
    color: theme.primary,
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },

  chartContainer: {
    height: "300px",
    padding: "16px",
  },

  // Areas List
  areasList: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  areaItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: theme.surfaceLight,
    borderRadius: "12px",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateX(4px)",
      background: theme.primaryLight,
    },
  },

  areaInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  areaRank: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: theme.primary,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
  },

  areaName: {
    fontSize: "14px",
    fontWeight: "500",
    color: theme.text,
  },

  areaStats: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  areaCount: {
    fontSize: "16px",
    fontWeight: "600",
    color: theme.primary,
  },

  areaPercent: {
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "12px",
    background: theme.success + "20",
    color: theme.success,
    fontWeight: "600",
  },

  // Section Header
  sectionHeader: {
    marginBottom: "16px",
    position: "relative",
    zIndex: 1,
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: theme.text,
    margin: "0 0 4px 0",
  },

  sectionDescription: {
    fontSize: "13px",
    color: theme.textSecondary,
    margin: 0,
  },

  // Tables Grid
  tablesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "24px",
    position: "relative",
    zIndex: 1,
    "@media (max-width: 992px)": {
      gridTemplateColumns: "1fr",
    },
  },

  tableCard: {
    background: theme.surface,
    backdropFilter: "blur(10px)",
    border: `1px solid ${theme.border}`,
    borderRadius: "20px",
    overflow: "hidden",
  },

  tableHeader: {
    padding: "16px 20px",
    borderBottom: `1px solid ${theme.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tableTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: theme.text,
    margin: 0,
  },

  tableBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    background: theme.primaryLight,
    color: theme.primary,
    fontSize: "11px",
    fontWeight: "600",
  },

  tableContainer: {
    overflowX: "auto",
    maxHeight: "400px",
    overflowY: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: "12px",
    fontWeight: "600",
    color: theme.textSecondary,
    borderBottom: `1px solid ${theme.border}`,
    background: theme.surfaceLight,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },

  td: {
    padding: "12px 16px",
    fontSize: "13px",
    color: theme.text,
    borderBottom: `1px solid ${theme.border}`,
  },

  responderName: {
    fontWeight: "500",
    color: theme.text,
  },

  countBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    "&[data-type='assigned']": {
      background: theme.primaryLight,
      color: theme.primary,
    },
    "&[data-type='progress']": {
      background: `${theme.warning}20`,
      color: theme.warning,
    },
    "&[data-type='resolved']": {
      background: `${theme.success}20`,
      color: theme.success,
    },
  },

  efficiencyBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    "&[data-rate='high']": {
      background: `${theme.success}20`,
      color: theme.success,
    },
    "&[data-rate='medium']": {
      background: `${theme.warning}20`,
      color: theme.warning,
    },
    "&[data-rate='low']": {
      background: `${theme.error}20`,
      color: theme.error,
    },
  },

  incidentType: {
    fontWeight: "500",
    color: theme.text,
  },

  severityBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600",
    display: "inline-block",
    textTransform: "capitalize",
  },

  statusBadge: {
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600",
    display: "inline-block",
    textTransform: "capitalize",
  },

  location: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: theme.textSecondary,
    fontSize: "12px",
  },

  date: {
    fontSize: "11px",
    color: theme.textMuted,
  },

  // Loading State
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    position: "relative",
    zIndex: 1,
  },

  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: `3px solid ${theme.primaryLight}`,
    borderTopColor: theme.primary,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },

  loadingText: {
    color: theme.textSecondary,
    fontSize: "16px",
  },
});