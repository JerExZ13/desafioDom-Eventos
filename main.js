// variables globales

let productos = []
let carrito = []
const contador = document.getElementById('cartCounter')

// seteo cantidad pretermindad ...
if (!localStorage.getItem('cantidad')) {
    localStorage.setItem('cantidad', 0)
}
if (!localStorage.getItem('total')) {
    localStorage.setItem('total', 0)
}



class Producto {
    constructor(id, nombre, precio, img, desc = '') {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.img = img
        this.desc = desc
    }
    desplegarProductos() {
        const card = `
            <div class="card">
                <p>${this.nombre}</p>
                <div>
                    <img class='imgProducto' src='./img/${this.img}' alt="foto del producto"/>
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

        container ? container.innerHTML += card : null
    }
    agregarEvento() {
        const btnAgregar = document.getElementById(this.id)
        // console.log(btnAgregar)
        const productoEncontrado = productos.find(product => product.id == this.id)
        btnAgregar.addEventListener('click', () => agregarAlCarrito(productoEncontrado))
    }
}

let prod1 = new Producto('001', 'Moka', 3000, 'Postre1.jpg')
let prod2 = new Producto('002', 'Muffin', 150, 'Postre2.jpg')
let prod3 = new Producto('003', 'Chocotorta', 2500, 'Postre3.jpg')
let prod4 = new Producto('004', 'Tarta de frutos rojos', 3200, 'Postre4.jpg')
let prod5 = new Producto('005', 'Torta Musse', 4150, 'Postre5.jpg')
let prod6 = new Producto('006', 'Tarta de chocolate', 3200, 'Postre6.jpg')

productos.push(prod1, prod2, prod3, prod4, prod5, prod6)

if (document.title === 'Pasteleria Deppen - Home') {
    productos.forEach(e => {
        e.desplegarProductos()
    })
    productos.forEach(e => {
        e.agregarEvento()
    })
}

function agregarAlCarrito(producto) {

    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]))
    }

    let carritoLS = JSON.parse(localStorage.getItem('carrito'))

    const enCarrito = carritoLS.find(prod => prod.id == producto.id)

    if (!enCarrito) {
        carritoLS.push({ ...producto, cantidad: 1 })
    } else {
        const carritoFiltrado = carritoLS.filter(prod => prod.id != producto.id)
        carritoLS = [...carritoFiltrado, { ...enCarrito, cantidad: enCarrito.cantidad + 1 }]
    }

    localStorage.setItem('cantidad', carritoLS.reduce((acc, prod) => acc + prod.cantidad, 0))
    localStorage.setItem('carrito', JSON.stringify(carritoLS))

    contador.innerHTML = localStorage.getItem('cantidad');

}

function eliminarDelCarrito(e) {
    if (e.target.classList.contains("eliminar")) {
        let carritoLS = JSON.parse(localStorage.getItem('carrito'))
        let index = carritoLS.findIndex(el => el.id === e.target.id)
        carritoLS.splice(index, 1)
        localStorage.setItem("carrito", JSON.stringify(carritoLS))
        localStorage.setItem('cantidad', carritoLS.reduce((acc, prod) => acc + prod.cantidad, 0))
        contador.innerHTML = localStorage.getItem('cantidad');
        let total = 0
        carritoLS.forEach(producto => {
            total = total + (producto.precio * producto.cantidad)
        })
        localStorage.setItem('total', total)
        document.getElementById('total').textContent = localStorage.getItem('total')
        imprimirCarrito(JSON.parse(localStorage.getItem('carrito')))
    }
}

function imprimirCarrito(arr) {
    const containerProducts = document.getElementById('tableBody')
    containerProducts.innerHTML = ''
    const alert = document.getElementById('cartAlerta')
    let total = 0
    if ((arr != null)) {
        alert.style.display = 'none'
        arr?.forEach(elemento => {
            containerProducts.innerHTML += `
                    <tr>
                        <td><img src='../img/${elemento.img}' class="img-producto-cart"></td>
                        <td>${elemento.nombre}</td>
                        <td>${elemento.cantidad}</td>
                        <td>${elemento.precio}</td>
                        <td>${elemento.precio * elemento.cantidad}</td>
                        <td><button id='${elemento.id}' class="eliminar">ELIMINAR</button></td>
                    </tr>
            `
            total = total + (elemento.precio * elemento.cantidad)

            localStorage.setItem('total', total)

            document.getElementById('total').textContent = localStorage.getItem('total')
        })
    }

    if (JSON.parse(localStorage.getItem('carrito'))) {
        if (JSON.parse(localStorage.getItem('carrito')).length === 0) {
            alert.style.display = 'block'
        }
    }

}

contador.innerHTML = localStorage.getItem('cantidad');

if (document.title === 'Pasteleria Deppen - Carrito') {
    
    imprimirCarrito(JSON.parse(localStorage.getItem('carrito')))

    document.getElementById('total').textContent = localStorage.getItem('total') || 0
    document.getElementById('tableBody').addEventListener('click', eliminarDelCarrito)

    document.getElementById('comprar').addEventListener('click', () => {
        if (localStorage.getItem('total') != 0) {
            alert(`Gracias por su compra, el total es $${localStorage.getItem('total')}`)
        } else {
            alert('Debe agregar productos al carrito')
        }
    })

}