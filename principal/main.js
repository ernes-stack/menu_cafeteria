//menu de objetos
let menuObjetos = [
    {id: 1,
    nombre: 'Café con Leche',
    precio: 3400,
    img: '../imagenes/cafe.jpg',
    cantidad: 0
    },
    {id: 2,
    nombre: 'Té',
    precio: 1300,
    img: '../imagenes/te.jpg',
    cantidad: 0
    },
    {id: 3,
    nombre: 'Medialuna',
    precio: 1300,
    img: '../imagenes/medialuna.jpg',
    cantidad: 0
    },
    {id: 4,
    nombre: 'Porción de Torta',
    precio: 5000,
    img: '../imagenes/torta.jpg',
    cantidad: 0
    },
    {id: 5,
    nombre: 'Jugo de Naranja',
    precio: 3500,
    img: '../imagenes/jugo.jpg',
    cantidad: 0
    },
    {id: 6,
    nombre: 'Licuado',
    precio: 3700,
    img: '../imagenes/licuado.jpg',
    cantidad: 0
    },
    {id: 7,
    nombre: 'Cookies de Limón',
    precio: 3500,
    img: '../imagenes/cookies.jpg',
    cantidad: 0
    },
    {id: 8,
    nombre: 'Budín de Chocolate',
    precio: 3400,
    img: '../imagenes/budin.jpg',
    cantidad: 0
    }
]

//mostrar el menu en el html
function imprimirMenu(productos) {
    const contenedorMenu = document.getElementById('contenedor_menu');
    productos.forEach((producto) => {
        const card = document.createElement('div');
        card.setAttribute('class','producto_menu');//clase para css
        card.innerHTML = `<img class='producto_img' src='${producto.img}' alt='${producto.nombre}'></img>
                          <div class='producto_info'>
                            <h1>${producto.nombre}</h1>
                            <p>$${producto.precio}</p>
                          </div>
                          <button class='btn_agregar' id='${producto.id}'>Agregar al carrito</button>`;
        contenedorMenu.appendChild(card);
    });
    agregarAlCarrito();
}
imprimirMenu(menuObjetos);

const carrito = [];
//funcion al boton agregar
function agregarAlCarrito() {
    const btnAgregarAlCarrito = document.querySelectorAll('.btn_agregar');
    btnAgregarAlCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idProducto = e.currentTarget.id;
            const productoSeleccionado = menuObjetos.find(producto => producto.id == idProducto);
            // Buscar si ya está en el carrito
            productoSeleccionado.cantidad ++;
            carrito.push(productoSeleccionado);
            localStorage.setItem('carrito', JSON.stringify(carrito));
        });
    });    
}
