const productosContenedor = document.getElementById("productosContenedor")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const tbodyCarrito = document.getElementById("tbodyCarrito")
const vaciarCarrito = document.getElementById("vaciarCarrito")
const cart = document.getElementById("cart")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []


function mostrarProductos(productos) {
    productos.forEach(producto => {
        const div = document.createElement("div")
        div.className = "card p-2 col-4"
        div.id = `producto_${producto.id}`
        div.style = "width: 13rem;"
        div.innerHTML = `
                <img src="${producto.thumbnail}" class="card-img-top m-auto" alt="...">
                <div class="card-body d-flex flex-column justify-content-center align-items-center flex-wrap">
                    <h5 class="card-title">${producto.title.substring(0, 14)}</h5>
                    <h4 class="card-title">$ ${producto.price}</h4>
                    <p class="card-text">${producto.title}</p>
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
            <td>${producto.title.substring(0, 10)}</td>
            <td>${producto.price}</td>
            <td>${producto.cantidad * producto.price}</td>
            <td><button class="d-flex btn btn-danger btnBorrarPod" value="${producto.id}" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
          </svg></button></td>
        `
        tbodyCarrito.append(tr)
    })
    document.getElementById("totalCarrito").innerText = `$ ${calcularTotalesCarrito()}`
    capturarBtnBorrarPod()
}
function capturarBtnAgregar() {
    const botones = document.getElementsByClassName("btn-agregar")
    for (let boton of botones) {
        boton.addEventListener("click", (e) => {
            console.log(e.target.parentNode.id)
            agregarAlCarrito(e.target.parentNode.id.substring(9))//substring quita tantos elementos como le pase por parametro
        })
    }
}

function capturarBtnBorrarPod() {
    const btnBorrarPod = document.getElementsByClassName("btnBorrarPod")
    for (let btn of btnBorrarPod) {
        btn.addEventListener("click", (e) => {
            eliminarDelCarrito(e.target.value)
        })
    }
}

function agregarAlCarrito(idSeleccionado) {
    const indice = carrito.findIndex(producto => producto.id === idSeleccionado)
    if (indice != -1) {
        carrito[indice].cantidad++
    } else {
        const { title, thumbnail, price, id } = productos.find(producto => producto.id === idSeleccionado)
        carrito.push({ title, price, id, thumbnail, cantidad: 1 })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

function eliminarDelCarrito(idSeleccionado) {
    carrito = carrito.filter(producto => producto.id != idSeleccionado)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

function calcularTotalesCarrito() {
    return carrito.reduce((acc, prod) => acc + (prod.price * prod.cantidad), 0)
}

async function getMELI() {
    try {
        const data = await fetch("https://api.mercadolibre.com/sites/MLA/search?q=notebooks")
        const { results: products } = await data.json()
        console.log(products)
        productos = [...products]
        mostrarProductos(products)
    }
    catch (err) { console.log(err) }
}

cart.addEventListener("click", (e) => {
    console.log(e.target.classList.contains("close"))
    if (e.target.classList.contains("close")) {
        e.target.className = "btn btn-outline-success"
        e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20"
        height="20" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
        <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>`
    } else {
        e.target.className = "btn btn-outline-danger close"
        e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z"/>
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>`
    }
    contenedorCarrito.classList.toggle("d-none")
})

mostrarCarrito()
vaciarCarrito.addEventListener("click", () => {
    localStorage.clear()
    carrito = []
    mostrarCarrito()
})
getMELI()