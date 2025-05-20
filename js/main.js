fetch('../db/data.json')
    .then(response => response.json())
    .then(data => {
        const contenedorMenu = document.getElementById('contenedor_menu');
        data.forEach((producto) => {
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
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        function agregarAlCarrito() {
            const btnAgregarAlCarrito = document.querySelectorAll('.btn_agregar');
            btnAgregarAlCarrito.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    const idProducto = e.currentTarget.id;
                    const productoSeleccionado = data.find(producto => producto.id == idProducto);
                    productoSeleccionado.cantidad ++;
                    carrito.push(productoSeleccionado);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    Toastify({
                        text: `Agregado al carrito! Cantidad: ${productoSeleccionado.cantidad}`,
                        duration: 2000,
                        gravity: 'top',
                        position: 'left',
                        style: {
                            background: 'linear-gradient(to right, #e67e22, #d35400)',
                        },
                    }).showToast();
                });
            });   
        }
    })
    
//mostrar el menu en el html
//function imprimirMenu(productos) {
    
//}
//imprimirMenu(menuObjetos);


//funcion al boton agregar

