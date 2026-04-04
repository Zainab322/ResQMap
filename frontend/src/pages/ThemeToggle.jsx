import React from 'react';

const ThemeToggle = ({ isDark, onToggle }) => {
  const toggleStyle = {
    container: {
      position: 'relative',
      width: '60px',
      height: '30px',
      borderRadius: '30px',
      background: isDark ? '#2C2D32' : '#E8E9ED',
      cursor: 'pointer',
      border: '1px solid rgba(255, 107, 53, 0.3)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    slider: {
      position: 'absolute',
      top: '2px',
      left: isDark ? '32px' : '2px',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: '#FF6B35',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      transition: 'left 0.3s ease',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    icon: {
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
    },
  };

  return (
    <div style={toggleStyle.container} onClick={onToggle}>
      <div style={toggleStyle.slider}>
        <span style={toggleStyle.icon}>{isDark ? '🌙' : '☀️'}</span>
      </div>
    </div>
  );
};

export default ThemeToggle;