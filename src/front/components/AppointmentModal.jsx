import React, { useState } from 'react';

export const AppointmentModal = ({ isOpen, onClose }) => {

  const [step, setStep] = useState(1);


  const [authMode, setAuthMode] = useState('login');


  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const [appointmentForm, setAppointmentForm] = useState({
    specialty: '',
    date: '',
    time: ''
  });


  const doctorAvailabilityMock = {

    defaultSlots: [
      { id: "08:00", time: "08:00 AM", active: true, booked: false },
      { id: "08:30", time: "08:30 AM", active: true, booked: false },
      { id: "09:00", time: "09:00 AM", active: true, booked: true },
      { id: "09:30", time: "09:30 AM", active: true, booked: false },
      { id: "10:00", time: "10:00 AM", active: true, booked: false },
      { id: "10:30", time: "10:30 AM", active: true, booked: true },
      { id: "11:00", time: "11:00 AM", active: false, booked: false },
      { id: "11:30", time: "11:30 AM", active: true, booked: false },
      { id: "12:00", time: "12:00 PM", active: true, booked: false },
      { id: "16:00", time: "04:00 PM", active: true, booked: false },
      { id: "16:30", time: "04:30 PM", active: true, booked: false },
      { id: "17:00", time: "05:00 PM", active: false, booked: false },
      { id: "17:30", time: "05:30 PM", active: false, booked: false },
      { id: "18:00", time: "06:00 PM", active: false, booked: false },
      { id: "18:30", time: "06:30 PM", active: false, booked: false },
      { id: "19:30", time: "07:30 PM", active: false, booked: false },
      { id: "20:00", time: "08:00 PM", active: false, booked: false },
      { id: "20:30", time: "08:30 PM", active: false, booked: false },
      { id: "21:00", time: "09:00 PM", active: false, booked: false },

    ]
  };


  const availableTimesForPatient = doctorAvailabilityMock.defaultSlots.filter(
    slot => slot.active && !slot.booked
  );

  if (!isOpen) return null;

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;


    if (name === "date") {
      setAppointmentForm({ ...appointmentForm, date: value, time: '' });
    } else {
      setAppointmentForm({ ...appointmentForm, [name]: value });
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'register' && userForm.password !== userForm.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    alert(`¡Cita solicitada con éxito!\n\nUsuario: ${userForm.email}\nEspecialidad: ${appointmentForm.specialty}\nFecha: ${appointmentForm.date}\nHora: ${appointmentForm.time}`);

    setStep(1);
    setAppointmentForm({ specialty: '', date: '', time: '' });
    onClose();
  };

  const handleCloseModal = () => {
    setStep(1);
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
            <h5 className="modal-title fw-bold">
              {step === 1
                ? (authMode === 'login' ? '🔑 Iniciar Sesión para Pedir Cita' : '📝 Registrarse para Pedir Cita')
                : '📅 Selección de Cita Médica'}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCloseModal}
            ></button>
          </div>

          <div className="modal-body p-4">


            {step === 1 && (
              <>
                <div className="btn-group w-100 mb-4" role="group">
                  <button
                    type="button"
                    className={`btn ${authMode === 'login' ? 'btn-primary fw-bold' : 'btn-outline-primary'}`}
                    onClick={() => setAuthMode('login')}
                  >
                    Ya soy usuario
                  </button>
                  <button
                    type="button"
                    className={`btn ${authMode === 'register' ? 'btn-primary fw-bold' : 'btn-outline-primary'}`}
                    onClick={() => setAuthMode('register')}
                  >
                    Soy nuevo usuario
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit}>
                  {authMode === 'register' && (
                    <div className="mb-3">
                      <label className="form-label fw-bold small">Nombre y Apellidos</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Ej. Juan Pérez"
                        value={userForm.name}
                        onChange={handleUserChange}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-bold small">Correo Electrónico (Login)</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="correo@ejemplo.com"
                      value={userForm.email}
                      onChange={handleUserChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={userForm.password}
                      onChange={handleUserChange}
                      required
                    />
                  </div>

                  {authMode === 'register' && (
                    <div className="mb-3">
                      <label className="form-label fw-bold small">Confirmar Contraseña</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="••••••••"
                        value={userForm.confirmPassword}
                        onChange={handleUserChange}
                        required
                      />
                    </div>
                  )}

                  <div className="d-grid gap-2 mt-4">
                    <button type="submit" className="btn btn-primary fw-bold">
                      {authMode === 'login' ? 'Ingresar y Continuar ➔' : 'Crear Cuenta y Continuar ➔'}
                    </button>
                  </div>
                </form>
              </>
            )}


            {step === 2 && (
              <form onSubmit={handleFinalSubmit}>
                <div className="alert alert-info py-2 small mb-3">
                  👤 Paciente: <strong>{userForm.email}</strong>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">Especialidad</label>
                  <select
                    name="specialty"
                    className="form-select"
                    value={appointmentForm.specialty}
                    onChange={handleAppointmentChange}
                    required
                  >
                    <option value="">Selecciona una especialidad...</option>
                    <option value="Medicina General">Medicina General</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Dermatología">Dermatología</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">Fecha deseada</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={appointmentForm.date}
                    onChange={handleAppointmentChange}
                    required
                  />
                </div>


                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Hora disponible {appointmentForm.date && `para el ${appointmentForm.date}`}
                  </label>

                  {availableTimesForPatient.length > 0 ? (
                    <select
                      name="time"
                      className="form-select border-success fw-bold text-dark"
                      value={appointmentForm.time}
                      onChange={handleAppointmentChange}
                      required
                    >
                      <option value="">-- Selecciona una hora disponible --</option>
                      {availableTimesForPatient.map(slot => (
                        <option key={slot.id} value={slot.time}>
                          🟢 {slot.time} (Disponible)
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="alert alert-warning py-2 small mb-0">
                      ⚠️ El médico no tiene horas disponibles asignadas para esta fecha.
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setStep(1)}
                  >
                    ← Volver
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success fw-bold px-4"
                    disabled={availableTimesForPatient.length === 0}
                  >
                    Confirmar Cita
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};