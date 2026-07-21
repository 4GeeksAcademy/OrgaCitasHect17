import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { HeroScroll } from "../components/HeroScroll";
import { HistoryScroll } from "../components/HistoryScroll";
import { LoginModal } from "../components/LoginModal";
import { AppointmentModal } from "../components/AppointmentModal";

export const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <HeroScroll />

     
      <div className="d-flex justify-content-center my-4">
        <div 
          className="w-100 w-lg-35 p-4 rounded-3 shadow-sm bg-primary text-white text-center d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: '220px' }}
        >
          <h3 className="fw-bold mb-2 h4">¿Necesitas consultar a un médico?</h3>
          <p className="mb-3 text-white-50 small">
            Reserva tu consulta en menos de 2 minutos de forma fácil y rápida.
          </p>
          <button 
            className="btn btn-light btn-lg fw-bold text-primary px-4 shadow-sm w-100"
            onClick={() => setIsAppointmentOpen(true)}
          >
            📅 Pide tu cita
          </button>
        </div>
      </div>

     
      <style>{`
        @media (min-width: 992px) {
          .w-lg-35 {
            width: 35% !important;
          }
        }
      `}</style>

      <HistoryScroll />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </div>
  );
};