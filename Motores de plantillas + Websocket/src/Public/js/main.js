
const socket = io()

const formProduct = document.getElementById("formProducto") 

formProduct.addEventListener('submit', (e) => {
    e.preventDefault()
    const prodsIteretor = new FormData(e.target)
    const prod = Object.fromEntries(prodsIteretor)
console.log (prod)
socket.emit("nuevoProducto", {prod})
})



