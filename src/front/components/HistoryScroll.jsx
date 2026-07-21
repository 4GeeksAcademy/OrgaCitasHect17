import React from 'react';

export const HistoryScroll = () => {
  const reviews = [
    { id: 1, user: "Carlos Mendoza", text: "Excelente atención, agendé mi cita con el cardiólogo en menos de dos minutos.", rating: 5 },
    { id: 2, user: "Ana Gómez", text: "Muy intuitiva. El doctor fue muy puntual.", rating: 4 },
    { id: 3, user: "Luisa Pérez", text: "Me encanta poder ver el historial de mis consultas anteriores sin papeleo.", rating: 5 }
  ];

  return (
    <section className="container my-5">
      <h3 className="h4 font-weight-bold mb-4 text-dark">
        Opiniones de nuestros usuarios
      </h3>


      <div className="d-flex flex-column flex-md-row flex-md-nowrap overflow-auto gap-3 pb-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="card shadow-sm border-0 rounded-3 flex-shrink-0"
            style={{ minWidth: '280px' }}
          >
            <div className="card-body p-4">
              <h5 className="card-title text-primary h6 fw-bold mb-2">
                {review.user}
              </h5>
              <p className="card-text text-muted small mb-3">
                "{review.text}"
              </p>
              <div className="text-warning small">
                {"⭐".repeat(review.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};