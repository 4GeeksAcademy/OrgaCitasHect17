
import React from 'react';

export const Navbar = ({ onLoginClick }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MedCitas</div>
      <div style={styles.buttons}>
        <button style={styles.btnSecondary}>Registrarse</button>
        <button style={styles.btnPrimary} onClick={onLoginClick}>Iniciar Sesión</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexWrap: 'wrap',
    gap: '1rem'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff'
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem'
  },
  btnPrimary: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  btnSecondary: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};