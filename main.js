document.addEventListener('DOMContentLoaded', function () {
    // Cargar productos desde el archivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.getElementById('productos');
            data.forEach(producto => {
                const productoHTML = `
                    <article class="producto">
                        <img src="images/${producto.imagen}" alt="${producto.nombre}">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p class="precio">$${producto.precio.toFixed(2)}</p>
                        <button class="agregar-carrito" data-id="${producto.id}"> Agregar al carrito</button>
                    </article>
                `;
                productosContainer.innerHTML += productoHTML;
            });

            
            const botonesAgregar = document.querySelectorAll('.agregar-carrito');
            botonesAgregar.forEach(boton => {
                boton.addEventListener('click', agregarProductoAlCarrito);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });


    let carrito = [];
    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(event) {
        const boton = event.target;
        const idProducto = boton.dataset.id;
        
        const productoSeleccionado = obtenerProductoPorId(idProducto);

        const productoEnCarrito = carrito.find(item => item.id === idProducto);

        if (productoEnCarrito) {
            
            productoEnCarrito.cantidad++;
        } else {
          
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }

        
        actualizarCarrito();
    }


    // Función para obtener un producto por su ID
    function obtenerProductoPorId(id) {
        // Cargar los datos del archivo JSON
        return new Promise((resolve, reject) => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                
                const productoEncontrado = data.find(producto => producto.id === id);

                if (productoEncontrado) {
                    return productoEncontrado;
                } else {
                    console.error(`Producto con ID ${id} no encontrado.`);
                    return null; 
                }
            })
            .catch(error => {
                console.error('Error al cargar los datos JSON:', error);
                return null; 
            });
        });
    } 
    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        const carritoContainer = document.getElementById('lista-carrito');
        carritoContainer.innerHTML = ''; 

        carrito.forEach(producto => {
        const productoHTML = `
            <li>
                ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)}
            </li>
        `;
        carritoContainer.innerHTML += productoHTML;
        });

    
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    // Actualizar la visualización del total
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito(); 
        
    }

    // Agregar evento de clic al botón "Vaciar Carrito"
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
    
    // Abrir modal al hacer clic en el botón "Mostrar Carrito"
    const botonMostrarCarrito = document.getElementById('mostrar-carrito');
        botonMostrarCarrito.addEventListener('click', () => {
            const modal = document.getElementById('carrito-modal');
            modal.style.display = 'block';
            actualizarCarritoModal(); // Actualizar el contenido del modal
        });

    // Cerrar modal al hacer clic en el botón "Cerrar" (X)
    const botonCerrarCarrito = document.getElementById('cerrar-carrito');
    botonCerrarCarrito.addEventListener('click', () => {
        const modal = document.getElementById('carrito-modal');
        modal.style.display = 'none';
    });

    // Función para actualizar el contenido del modal con el estado del carrito
    function actualizarCarritoModal() {
        const carritoModal = document.getElementById('lista-carrito-modal');
        carritoModal.innerHTML = ''; // Limpiar contenido actual del modal

        // Iterar sobre los productos en el carrito y mostrarlos en el modal
        carrito.forEach(producto => {
            const productoHTML = document.createElement('li');
            productoHTML.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${(producto.precio * producto.cantidad).toFixed(2)}`;
            carritoModal.appendChild(productoHTML);
        });

        // Calcular el total y mostrarlo en el modal
        const totalModal = document.getElementById('total-carrito-modal');
        const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        totalModal.textContent = `Total: $${total.toFixed(2)}`;
    }
    

});