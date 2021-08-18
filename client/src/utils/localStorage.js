export const addToLocalStorage = (reservation) => {
  const reservations = localStorage.getItem("reservations");

  if (!reservations) {
    localStorage.setItem("reservations", JSON.stringify([reservation]));
  } else {
    const reservationsFromLocalStorage = JSON.parse(
      localStorage.getItem("reservations")
    );
    localStorage.setItem(
      "reservations",
      JSON.stringify([...reservationsFromLocalStorage, reservation])
    );
  }
};

export const removeFromLocalStorage = (id) => {
  const reservations = JSON.parse(localStorage.getItem("reservations"));
  if (reservations) {
    localStorage.setItem(
      "reservations",
      JSON.stringify(reservations.filter((item) => item.id !== id))
    );
  }

  const updatedReservations = JSON.parse(localStorage.getItem("reservations"));
  const noReservations = updatedReservations.length === 0;
  if (noReservations) {
    localStorage.removeItem("reservations");
  }
};
