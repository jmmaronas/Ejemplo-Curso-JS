class Producto {
    constructor(id, titulo, detalle, precio, urlImagen) {
        this.id = id
        this.titulo = titulo
        this.detalle = detalle
        this.precio = precio
        this.urlImagen = urlImagen
    }
}

const product1 = new Producto(1, "PC", "Pc Gamer", 120000, "./img/pc.jpg")
const product2 = new Producto(1, "Note", "Notebook Gamer", 180000, "./img/note.jpg")
const product3 = new Producto(1, "Tablet", "Tablet 7´", 50000, "./img/tablet.jpg")
const product4 = new Producto(1, "All in One", "All in One Gamer", 250000, "./img/all_in_one.jpg")

const productos = [product1, product2, product3, product4]
/*
***OBJETOS LITERALES

const productos=[
    {
        id: 1,
        titulo: "PC",
        detalle: "Pc Gamer",
        precio: 120000,
        urlImg: "./img/pc.jpg"
    },
    {
        id: 1,
        titulo: "Note",
        detalle: "Notebook Gamer",
        precio: 120000,
        urlImg: "./img/note.jpg"
    },
    {
        id: 1,
        titulo: "Tablet",
        detalle: "Tablet 7´",
        precio: 120000,
        urlImg: "./img/tablet.jpg"
    },
    {
        id: 1,
        titulo: "All in One",
        detalle: "All in One Gamer",
        precio: 120000,
        urlImg: "./img/all_in_one.jpg"
    }
]
*/
