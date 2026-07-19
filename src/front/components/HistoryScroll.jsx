import React from 'react';

export const HistoryScroll = () => {
  const reviews = [
    { id: 1, user: "Carlos Mendoza", text: "Excelente atención, agendé mi cita con el cardiólogo en menos de dos minutos.", rating: 5 },
    { id: 2, user: "Ana Gómez", text: "Muy intuitiva. Me recordó la cita por correo y el doctor fue muy puntual.", rating: 4 },
    { id: 3, user: "Luisa Pérez", text: "Me encanta poder ver el historial de mis consultas anteriores sin papeleo.", rating: 5 }
  ];

  return (
    <div style={styles.section}>
      <h3>Opiniones de nuestros usuarios</h3>
      <div style={styles.scroll}>
        {reviews.map(review => (
          <div key={review.id} style={styles.card}>
            <h4>{review.user}</h4>
            <p>"{review.text}"</p>
            <div style={styles.stars}>
              {"⭐".repeat(review.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  section: { padding: '1rem 0' },
  scroll: { display: 'flex', overflowX: 'auto', gap: '1rem', padding: '0.5rem 0' },
  card: { flex: '0 0 280px', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  stars: { marginTop: '0.5rem' }
};