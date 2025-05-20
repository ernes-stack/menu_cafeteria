let carrito = localStorage.getItem('carrito');
carrito = JSON.parse(carrito);

//reduccion al array por productos repetidos
const carritoFiltrado = carrito.reduce((acc, producto) => {
    const existente = acc.find(p => p.id === producto.id);
    if (!existente) {
        acc.push(producto);
    } else if (producto.cantidad > existente.cantidad) {
        acc = acc.map(p => p.id === producto.id ? producto : p);
    }
    return acc;
}, []);

//mostrar el carrito en html
function imprimirCarrito() {
    const contenedorCarrito = document.getElementById('contenedor_carrito');
    
    carritoFiltrado.forEach(producto => {
        const card = document.createElement('div');
        card.setAttribute('class', 'producto_carrito');
        card.innerHTML = `<img class='carrito_img'src='${producto.img}' alt='${producto.nombre}'></img>
                          <div class='carrito_info'>
                            <h1>${producto.nombre}</h1>
                            <p>$${producto.precio}</p>
                          </div>
                          <div class='carrito_cantidad'>
                            <button class='btn_restar'>-</button>
                            <input class='input_cantidad' readonly type='number' value=${producto.cantidad}></input>
                            <button class='btn_agregar'>+</button>
                          </div>
                          <button class='btn_eliminar' id='${producto.id}'><img src='../img/basura.png' alt='Eliminar'></img></button>`;
        contenedorCarrito.appendChild(card);
    })
    const contenedorMensaje = document.getElementById('contenedor_mensaje');
    
    if(carritoFiltrado.length === 0) {
        mostarMensajeVacio();
    }
    
    agregarYRestarUnidad();
    eliminarProducto();
    actualizarTotal();
    vaciarCarrito();
}
imprimirCarrito();

//funcion para los botones + -
function agregarYRestarUnidad() {
    const contenedores = document.querySelectorAll('.producto_carrito');

    contenedores.forEach((contenedor, indice) => {
        const btnAgregar = contenedor.querySelector('.btn_agregar');
        const btnRestar = contenedor.querySelector('.btn_restar');
        const inputCantidad = contenedor.querySelector('.input_cantidad');

        btnAgregar.addEventListener('click', () => {
            carritoFiltrado[indice].cantidad ++;
            inputCantidad.value = carritoFiltrado[indice].cantidad;
            localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
            actualizarTotal();
        })
        btnRestar.addEventListener('click', () => {
            if(carritoFiltrado[indice].cantidad > 1) {
                carritoFiltrado[indice].cantidad --;
                inputCantidad.value = carritoFiltrado[indice].cantidad;
                localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
                actualizarTotal();
            }
        })
    })
}

//funcion al boton eliminar
function eliminarProducto() {
    const contenedores = document.querySelectorAll('.producto_carrito');

    contenedores.forEach((contenedor) => {
        const btnEliminar = contenedor.querySelector('.btn_eliminar');

        btnEliminar.addEventListener('click', () => {
            const indiceProducto = carritoFiltrado.findIndex(p => p.id === btnEliminar.id);
            carritoFiltrado.splice(indiceProducto, 1);
            localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
            contenedor.remove();
            actualizarTotal(); 

            if(carritoFiltrado.length === 0){
                mostarMensajeVacio();
            }
        })
    })
}

//funcion para actualizar el total
function actualizarTotal() {
    const total = carritoFiltrado.reduce((acc, producto) => {
        return acc + producto.precio * producto.cantidad;
    }, 0);
    
    const totalActualizado = document.getElementById('total_carrito');
    totalActualizado.innerText = `Subtotal: $${total}`;
}

//funcion al boton vaciar carrito
function vaciarCarrito() {
    const btnVaciarCarrito = document.getElementById('btn_vaciar_carrito');

    btnVaciarCarrito.addEventListener('click', () => {
        if(carritoFiltrado.length !== 0){
            Swal.fire({
                text: 'Carrito Vaciado!',
                icon: 'success',
            });            
        }
        carritoFiltrado.length = 0;
        const contenedorCarrito = document.getElementById('contenedor_carrito');
        contenedorCarrito.remove();
        localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
        actualizarTotal();
        mostarMensajeVacio();
    });
}

//funcion para mostrar un mensaje si el carrito esta vacio
function mostarMensajeVacio() {
    const contenedorMensaje = document.getElementById('contenedor_mensaje');
    const mensajeCarritoVacio = document.createElement('h2');
    contenedorMensaje.innerHTML = '';
    mensajeCarritoVacio.textContent = 'No hay productos en el Carrito!';
    contenedorMensaje.appendChild(mensajeCarritoVacio);
}
