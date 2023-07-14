const socket = io();

const formProduct = document.getElementById("formProducto");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const prodsIteretor = new FormData(e.target);
  const prod = Object.fromEntries(prodsIteretor);
  socket.emit("nuevoProducto", { prod });
  // Limpiar el formulario
  formProduct.reset();
});




