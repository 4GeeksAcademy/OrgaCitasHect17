import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top px-4">
      <div className="container-fluid max-width-1200">
        
        {/* Logo / Nombre de la App */}
        <Link to="/" className="navbar-brand fw-bold text-primary fs-4">
          🩺 MedCitas
        </Link>

        {/* Selector de Rol y Accesos Rápidos */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Menú/Selector de Rol (Simulación) */}
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle btn-sm fw-bold px-3"
              type="button"
              id="roleSelectorDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🎭 Vista: {location.pathname === "/doctor" ? "Médico" : "Paciente"}
            </button>
            
            <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="roleSelectorDropdown">
              <li>
                <span className="dropdown-header text-muted small">Cambiar Rol</span>
              </li>
              <li>
                <Link 
                  to="/" 
                  className={`dropdown-item d-flex align-items-center gap-2 ${location.pathname === "/" ? "active fw-bold" : ""}`}
                >
                  👤 Modo Paciente
                </Link>
              </li>
              <li>
                <Link 
                  to="/doctor" 
                  className={`dropdown-item d-flex align-items-center gap-2 ${location.pathname === "/doctor" ? "active fw-bold" : ""}`}
                >
                  👨‍⚕️ Modo Médico
                </Link>
              </li>
            </ul>
          </div>

          {/* Botón directo si se prefiere un clic rápido */}
          {location.pathname === "/doctor" ? (
            <Link to="/" className="btn btn-primary btn-sm fw-bold d-none d-sm-inline-block">
              Ir a Inicio (Paciente)
            </Link>
          ) : (
            <Link to="/doctor" className="btn btn-outline-secondary btn-sm fw-bold d-none d-sm-inline-block">
              Acceso Médico
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};