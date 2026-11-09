import './style.css';

// PASO 1: Crear el arreglo de productos
const productos = [
  { nombre: 'Laptop HP', precio: 650, categoria: 'Tecnología' },
  { nombre: 'Mouse Logitech', precio: 25, categoria: 'Tecnología' },
  { nombre: 'Teclado Mecánico', precio: 75, categoria: 'Tecnología' },
  { nombre: 'Camisa Casual', precio: 20, categoria: 'Ropa' },
  { nombre: 'Pantalón Jeans', precio: 35, categoria: 'Ropa' },
  { nombre: 'Zapatos Deportivos', precio: 55, categoria: 'Calzado' },
  { nombre: 'Sandalias', precio: 15, categoria: 'Calzado' },
  { nombre: 'Audífonos', precio: 40, categoria: 'Tecnología' }
];

// Variables para almacenar los filtros seleccionados
let categoriaSeleccionada = 'Todas';
let precioMaximo = Infinity;

// Crear la estructura HTML
document.querySelector('#app').innerHTML = `
  <main class="contenedor">
    <header>
      <h1>Catálogo de Productos</h1>
      <p>Encuentra los productos que necesitas.</p>
    </header>
    <section class="filtros">
      <h3>Filtrar por categoría</h3>
      <div class="categorias">
        <button class="btn-categoria activo" data-categoria="Todas">Todas</button>
        <button class="btn-categoria" data-categoria="Tecnología">Tecnología</button>
        <button class="btn-categoria" data-categoria="Ropa">Ropa</button>
        <button class="btn-categoria" data-categoria="Calzado">Calzado</button>
      </div>
      <h3>Filtrar por precio máximo</h3>
      <div class="filtro-precio">
        <input type="number" id="precioMaximo" placeholder="Ingrese precio máximo" min="0">
        <button id="btnPrecio">Filtrar precio</button>
        <button id="btnLimpiar">Limpiar filtros</button>
      </div>
    </section>
    <section>
      <h2>Productos disponibles</h2>
      <p id="contador"></p>
      <div id="listaProductos" class="productos"></div>
    </section>
  </main>
`;

// Función para mostrar los productos
function mostrarProductos(lista) {
  const contenedor = document.querySelector('#listaProductos');
  // Utilizamos map() para generar el HTML dinámicamente
  const html = lista.map(producto => `
    <article class="tarjeta">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toFixed(2)}</p>
      <span>${producto.categoria}</span>
    </article>
  `).join('');

  contenedor.innerHTML = html;

  document.querySelector('#contador').textContent =
    `Se encontraron ${lista.length} productos.`;

  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron productos.</p>';
  }
}

// Filtrar por categoría y precio
function aplicarFiltros() {
  // Utilizamos filter() para filtrar los productos
  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = categoriaSeleccionada === 'Todas' || producto.categoria === categoriaSeleccionada;
    const coincidePrecio = producto.precio <= precioMaximo;

    return coincideCategoria && coincidePrecio;
  });

  mostrarProductos(productosFiltrados);
}

// Eventos de los botones de categoría
const botonesCategoria = document.querySelectorAll('.btn-categoria');

botonesCategoria.forEach(boton => {
  boton.addEventListener('click', () => {
    categoriaSeleccionada = boton.dataset.categoria;
    // Actualizar botón activo
    botonesCategoria.forEach(btn => btn.classList.remove('activo'));
    boton.classList.add('activo');

    aplicarFiltros();
  });
});

// Evento para filtrar por precio
document.querySelector('#btnPrecio').addEventListener('click', () => {
  const valor = document.querySelector('#precioMaximo').value;

  if (valor === '' || Number(valor) < 0) {
    alert('Ingrese un precio máximo válido.');
    return;
  }

  precioMaximo = Number(valor);

  aplicarFiltros();
});

// Limpiar filtros
document.querySelector('#btnLimpiar').addEventListener('click', () => {
  categoriaSeleccionada = 'Todas';
  precioMaximo = Infinity;

  document.querySelector('#precioMaximo').value = '';

  botonesCategoria.forEach(btn => btn.classList.remove('activo'));

  document.querySelector('[data-categoria="Todas"]').classList.add('activo');

  aplicarFiltros();
});

// Mostrar todos los productos al cargar la página
mostrarProductos(productos);