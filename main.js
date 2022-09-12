let productos = []
let carrito = []

class Producto{
    constructor(id, nombre, precio, img, desc = ''){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.img = img 
        this.desc = desc 
    }
    desplegarProductos(){
        const card = `
            <div class="card">
                <p>${this.nombre}</p>
                <div>
                    <img class='imgProducto' src=${this.img} alt="foto del producto"/>
                </div>
                <div>
                    <p>$${this.precio}</p>
                </div>
                <div class="btn-container">
                    <button id=${this.id} class='btnAgregar'>AGRGEGAR AL CARRITO</button>
                </div>
            </div>
        `
        const container = document.getElementById('container')
        container.innerHTML += card
    }
    agregarEvento(){
        const btnAgregar = document.getElementById(this.id)
        // console.log(btnAgregar)
        const productoEncontrado = productos.find(product => product.id == this.id)
        btnAgregar.addEventListener('click', () => agregarAlCarrito(productoEncontrado))
    }
}

let prod1 = new Producto('001', 'Moka', 3000, './img/Postre1.jpg')
let prod2 = new Producto('002', 'Muffin', 150, './img/Postre2.jpg')
let prod3 = new Producto('003', 'Chocotorta', 2500, './img/Postre3.jpg')
let prod4 = new Producto('004', 'Tarta de frutos rojos', 3200, './img/Postre4.jpg')
let prod5 = new Producto('005', 'Torta Musse', 4150, './img/Postre5.jpg')
let prod6 = new Producto('006', 'Tarta de chocolate', 3200, './img/Postre6.jpg')

productos.push(prod1, prod2, prod3, prod4, prod5, prod6)

console.log(productos)

productos.forEach(e => {
    e.desplegarProductos()
})
productos.forEach(e => {
    e.agregarEvento()
})

function agregarAlCarrito(producto) {
    const enCarrito = carrito.find(prod => prod.id == producto.id)
    console.log(enCarrito)
    if(!enCarrito){
        carrito.push({...producto, cantidad: 1})
    } else {
        const carritoFiltrado = carrito.filter(prod => prod.id != producto.id)
        carrito = [...carritoFiltrado,{ ...enCarrito, cantidad: enCarrito.cantidad + 1}]
        // console.log(carritoFiltrado)
    }

    contador.innerHTML = carrito.reduce((acc,prod) => acc + prod.cantidad, 0)
    // console.log(carrito)
}

const contador = document.getElementById('cartCounter')
contador.innerHTML = carrito.reduce((acc,prod) => acc + prod.cantidad, 0)
