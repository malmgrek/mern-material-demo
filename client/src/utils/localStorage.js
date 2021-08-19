const getItem = (key) => JSON.parse(localStorage.getItem(key));
const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const addToLocalStorage = (reservation) => {
  const reservations = getItem("reservations");

  if (!reservations) {
    setItem("reservations", [reservation]);
  } else {
    setItem("reservations", [...reservations, reservation]);
  }
};

export const removeFromLocalStorage = (id) => {
  const reservations = getItem("reservations");

  if (reservations) {
    const filtered = reservations.filter((item) => item.id !== id);
    setItem("reservations", filtered);
  }

  const reservationsLeft = getItem("reservations").length;
  if (!reservationsLeft) {
    localStorage.removeItem("reservations");
  }
};
