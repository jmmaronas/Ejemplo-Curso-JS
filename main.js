const productosContenedor = document.getElementById("productosContenedor")
const tbodyCarrito = document.getElementById("tbodyCarrito")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const vaciarCarrito = document.getElementById("vaciarCarrito")

function mostrarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement("div")
        div.className = "card p-2"
        div.id = `producto_${producto.id}`
        div.style = "width: 18rem;"
        div.innerHTML = `
                <img src="${producto.urlImagen}" class="card-img-top m-auto" alt="...">
                <div class="card-body d-flex flex-column justify-content-center align-items-center flex-wrap">
                    <h5 class="card-title">${producto.titulo}</h5>
                    <h4 class="card-title">$ ${producto.precio}</h4>
                    <p class="card-text">${producto.detalle}</p>
                </div>
                <btn class="btn btn-primary btn-agregar">Agregar</btn>
        `
        productosContenedor.append(div)
    })
    capturarBtnAgregar()
}
function mostrarCarrito() {
    tbodyCarrito.innerHTML = "" //limpio el html por las dudas
    carrito.forEach(producto => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${producto.cantidad}</td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad * producto.precio}</td>
            <td><button class="btn btn-danger btnBorrarPod" value="${producto.id}" >X</button></td>
        `
        tbodyCarrito.append(tr)
    })
    document.getElementById("totalCarrito").innerText = calcularTotalesCarrito()
    capturarBtnBorrarPod()
}
function capturarBtnAgregar() {
    const botones = document.getElementsByClassName("btn-agregar")
    for (let boton of botones) {
        boton.addEventListener("click", (e) => {
            console.log(e.target.parentNode.id)
            agregarAlCarrito(parseInt(e.target.parentNode.id.substring(9)))//substring quita tantos elementos como le pase por parametro
        })
    }
}

function capturarBtnBorrarPod(){
    const btnBorrarPod = document.getElementsByClassName("btnBorrarPod")
    for( let btn of btnBorrarPod){
        btn.addEventListener("click", (e)=>{
            eliminarDelCarrito(e.target.value)
        })
    }
}

function agregarAlCarrito(idSeleccionado) {
    const indice = carrito.findIndex(producto => producto.id === idSeleccionado)
    if (indice != -1) {
        carrito[indice].cantidad++
    } else {
        const productoSeleccionado = productos.find(producto => producto.id === idSeleccionado)
        carrito.push({ ...productoSeleccionado, cantidad: 1 })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

function eliminarDelCarrito(idSeleccionado){
    carrito = carrito.filter(producto => producto.id != idSeleccionado)    
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

function calcularTotalesCarrito() {
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)
}


mostrarProductos(productos)
mostrarCarrito()
vaciarCarrito.addEventListener("click", ()=>{
    localStorage.clear()
    carrito=[]
    mostrarCarrito()
})