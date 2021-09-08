const getItem = (key) => JSON.parse(localStorage.getItem(key));
const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const addToLocalStorage = (reservation) => {
  // Get existing reservatios (if any) and update list
  const reservations = getItem("reservations");
  setItem("reservations", !reservations ?
          [reservation] : [...reservations, reservation]);
};

export const removeFromLocalStorage = (id) => {
  // Update reservations field with the remaining ones. If none are left, wipe
  // the key from storage.
  const reservations = getItem("reservations");
  if (reservations) {
    const reservationsLeft = reservations.filter((item) => item.id !== id);
    if (reservationsLeft.length) {
      setItem("reservations", reservationsLeft);
    } else {
      localStorage.removeItem("reservations");
    }
  }

};
