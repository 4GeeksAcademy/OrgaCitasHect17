import React, { useState } from 'react';

export const DoctorDashboard = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');


  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Carlos Mendoza", date: "2026-07-23", time: "09:00 AM", service: "Medicina General", status: "Confirmada", phone: "+34 612 345 678" },
    { id: 2, patient: "Ana Gómez", date: "2026-07-23", time: "10:30 AM", service: "Revisión de Control", status: "Pendiente", phone: "+34 699 876 543" },
    { id: 3, patient: "Luisa Pérez", date: "2026-07-23", time: "11:45 AM", service: "Consulta Cardiológica", status: "Completada", phone: "+34 655 112 233" }
  ]);

  const [filter, setFilter] = useState("Todas");


  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(tomorrowFormatted);
  const [slotDuration, setSlotDuration] = useState("30");

  const [availabilityByDate, setAvailabilityByDate] = useState({
    [tomorrowFormatted]: [
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
  });

  const currentSlots = availabilityByDate[selectedDate] || [
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
  ];


  const handleLoginChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');


    if (credentials.email === "doctor@medcitas.com" && credentials.password === "123456") {
      setIsAuthenticated(true);
    } else {
      setLoginError('Correo o contraseña incorrectos. (Usa: doctor@medcitas.com / 123456)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ email: '', password: '' });
  };

  const toggleSlotStatus = (slotId) => {
    setAvailabilityByDate(prev => {
      const daySlots = prev[selectedDate] || currentSlots;
      const updatedSlots = daySlots.map(slot => {
        if (slot.id === slotId) {
          if (slot.booked) {
            alert("Este turno ya está reservado por un paciente.");
            return slot;
          }
          return { ...slot, active: !slot.active };
        }
        return slot;
      });
      return { ...prev, [selectedDate]: updatedSlots };
    });
  };

  const filteredAppointments = appointments.filter(app => {
    const matchDate = app.date === selectedDate;
    const matchStatus = filter === "Todas" || app.status === filter;
    return matchDate && matchStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
  };


  if (!isAuthenticated) {
    return (
      <div className="container py-5" style={{ marginTop: '90px', maxWidth: '450px' }}>
        <div className="card border-0 shadow-lg rounded-3">
          <div className="card-header bg-primary text-white text-center py-4">
            <h4 className="fw-bold mb-1">👨‍⚕️ Acceso Profesional</h4>
            <p className="mb-0 text-white-50 small">Ingresa tus credenciales médicas</p>
          </div>
          <div className="card-body p-4">

            {loginError && (
              <div className="alert alert-danger small py-2 text-center mb-3">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="doctor@medcitas.com"
                  value={credentials.email}
                  onChange={handleLoginChange}
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
                  value={credentials.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary fw-bold py-2">
                  Iniciar Sesión
                </button>
              </div>
            </form>

            <div className="mt-3 text-center">
              <span className="text-muted small">
                💡 Credenciales de prueba:<br />
                <strong>Email:</strong> doctor@medcitas.com<br />
                <strong>Password:</strong> 123456
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container py-4" style={{ marginTop: '70px', maxWidth: '1200px' }}>


      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-1">👨‍⚕️ Panel del Médico</h2>
          <p className="text-muted mb-0">Bienvenido, Dr. Alejandro Silva</p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
          <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm">
            📅 Vista activa: {selectedDate}
          </span>
          <button
            className="btn btn-outline-danger btn-sm fw-bold px-3"
            onClick={handleLogout}
          >
            🔒 Cerrar Sesión
          </button>
        </div>
      </div>


      <div className="card border-0 shadow-sm rounded-3 mb-4 bg-light">
        <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h5 className="fw-bold text-dark mb-1">🎯 Selecciona el Día a Configurar</h5>
            <p className="text-muted small mb-0">Elige qué fecha deseas personalizar para habilitar o restringir horas a los pacientes.</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label className="fw-bold text-secondary small text-nowrap">Fecha:</label>
            <input
              type="date"
              className="form-control fw-bold border-primary shadow-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>


      <div className="card border-0 shadow-sm rounded-3 mb-4">
        <div className="card-header bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <div>
            <h5 className="fw-bold mb-1 text-dark">⚙️ Horas Disponibles para el {selectedDate}</h5>
            <p className="text-muted small mb-0">Haz clic en un cuadro horario para bloquearlo (rojo) o liberarlo (verde).</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label className="small text-muted fw-bold text-nowrap">Duración:</label>
            <select
              className="form-select form-select-sm fw-bold border-primary"
              value={slotDuration}
              onChange={(e) => setSlotDuration(e.target.value)}
              style={{ width: '110px' }}
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
            </select>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row g-2">
            {currentSlots.map(slot => (
              <div key={slot.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <button
                  type="button"
                  className={`btn w-100 py-2 d-flex flex-column align-items-center justify-content-center rounded-3 position-relative ${slot.booked
                    ? 'btn-secondary text-white'
                    : slot.active
                      ? 'btn-outline-success active fw-bold'
                      : 'btn-outline-danger'
                    }`}
                  onClick={() => toggleSlotStatus(slot.id)}
                >
                  <span className="fs-6">{slot.time}</span>
                  <span className="badge mt-1" style={{ fontSize: '0.7rem' }}>
                    {slot.booked ? '🔒 Ocupada' : slot.active ? '✅ Disponible' : '🚫 Bloqueada'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-header bg-white py-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
          <h5 className="fw-bold mb-0 text-dark">📋 Pacientes Citados el {selectedDate}</h5>

          <div className="btn-group btn-group-sm" role="group">
            {["Todas", "Confirmada", "Pendiente", "Completada"].map((status) => (
              <button
                key={status}
                type="button"
                className={`btn ${filter === status ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-3">Hora</th>
                  <th>Paciente</th>
                  <th>Motivo / Especialidad</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th className="text-end px-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((app) => (
                    <tr key={app.id}>
                      <td className="px-3 fw-bold text-primary">{app.time}</td>
                      <td className="fw-bold text-dark">{app.patient}</td>
                      <td className="text-muted">{app.service}</td>
                      <td className="text-muted">{app.phone}</td>
                      <td>
                        <span className={`badge rounded-pill ${app.status === 'Confirmada' ? 'bg-success' :
                          app.status === 'Pendiente' ? 'bg-warning text-dark' :
                            'bg-info text-dark'
                          }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="text-end px-3">
                        <div className="btn-group btn-group-sm">
                          {app.status !== 'Completada' && (
                            <button
                              className="btn btn-outline-success"
                              onClick={() => handleStatusChange(app.id, 'Completada')}
                            >
                              ✓ Completar
                            </button>
                          )}
                          {app.status === 'Pendiente' && (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleStatusChange(app.id, 'Confirmada')}
                            >
                              Confirmar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No hay citas registradas para la fecha {selectedDate}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};