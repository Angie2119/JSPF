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
                        <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                    </article>
                `;
                productosContainer.innerHTML += productoHTML;
            });

            // Agregar evento de clic a los botones "Agregar al carrito"
            const botonesAgregar = document.querySelectorAll('.agregar-carrito');
            botonesAgregar.forEach(boton => {
                boton.addEventListener('click', agregarProductoAlCarrito);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(event) {
        const boton = event.target;
        const idProducto = boton.dataset.id;

        // Lógica para agregar el producto al carrito (puedes implementarla aquí)

        // Actualizar la visualización del carrito
        actualizarCarrito();
    }

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        // Lógica para mostrar los productos en el carrito (puedes implementarla aquí)

        // Calcular el total
        calcularTotal();

        // Actualizar la visualización del total
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función para calcular el total del carrito
    function calcularTotal() {
        // Lógica para calcular el total (puedes implementarla aquí)
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        // Lógica para vaciar el carrito (puedes implementarla aquí)

        // Actualizar la visualización del carrito
        actualizarCarrito();
    }

    // Agregar evento de clic al botón "Vaciar Carrito"
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
});
