const productosContenedor = document.getElementById("productosContenedor")
const tbodyCarrito = document.getElementById("tbodyCarrito")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const vaciarCarrito = document.getElementById("vaciarCarrito")

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
            agregarAlCarrito(e.target.parentNode.id.substring(9))//substring quita tantos elementos como le pase por parametro
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
        const {title, thumbnail, price, id} = productos.find(producto => producto.id === idSeleccionado)
        carrito.push({ title, price, id, thumbnail, cantidad: 1 })
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
    return carrito.reduce((acc, prod) => acc + (prod.price * prod.cantidad), 0)
}

async function getMELI(){
    try{
        const data =await fetch("https://api.mercadolibre.com/sites/MLA/search?q=notebooks")
        const {results: products}=await  data.json()
        console.log(products)
        productos=[...products]
        mostrarProductos(products)
    }
    catch(err) { console.log(err)}
}

mostrarCarrito()
vaciarCarrito.addEventListener("click", ()=>{
    localStorage.clear()
    carrito=[]
    mostrarCarrito()
})
getMELI()