import React from 'react';

export const AppointmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Cita solicitada con éxito! (Aquí conectarás con el backend)");
    onClose();
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-3">
          
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">📅 Pide tu Cita Médica</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              
              <div className="mb-3">
                <label className="form-label font-weight-bold">Especialidad</label>
                <select className="form-select" required>
                  <option value="">Selecciona una especialidad...</option>
                  <option value="medicina-general">Medicina General</option>
                  <option value="pediatria">Pediatría</option>
                  <option value="cardiologia">Cardiología</option>
                  <option value="dermatologia">Dermatología</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label font-weight-bold">Fecha preferida</label>
                <input type="date" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label font-weight-bold">Nombre del Paciente</label>
                <input type="text" className="form-control" placeholder="Ej. Juan Pérez" required />
              </div>

            </div>

            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-4 fw-bold">
                Confirmar Cita
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
