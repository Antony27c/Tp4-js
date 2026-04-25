const productos = [
    {id: 1, nombre: "NoteBook", precio: 900, categoria: "electronica", enStock: true, imagen: "productos/notebook.png"},
    {id: 2, nombre: "Auriculares", precio: 150, categoria: "electronica", enStock: false, imagen: "productos/auriculares.png"},
    {id: 3, nombre: "Remera", precio: 30, categoria: "ropa", enStock: true, imagen: "productos/remera.png"},
    {id: 4, nombre: "Pantalón", precio: 60, categoria: "ropa", enStock: true, imagen: "productos/pantalon.png"},
    {id: 5, nombre: "Lámpara", precio: 80, categoria: "hogar", enStock: false, imagen: "productos/lampara.png"},
    {id: 6, nombre: "Silla", precio: 200, categoria: "hogar", enStock: true, imagen: "productos/silla.png"},
    {id: 7, nombre: "Celular", precio: 700, categoria: "electronica", enStock: true, imagen: "productos/celular.png"},
    {id: 8, nombre: "Almohada", precio: 40, categoria: "hogar", enStock: true, imagen: "productos/almohada.png"}
];

const contenedor = document.getElementById("contenedor");
const selectCategoria = document.getElementById("selectCategoria");
const rangePrecio = document.getElementById("rangePrecio");
const valorPrecio = document.getElementById("valorPrecio");
const checkStock = document.getElementById("checkStock");
const inputBusqueda = document.getElementById("inputBusqueda");

const mostrarProductos = () => {
    const categoria = selectCategoria.value;
    const precioMax = Number(rangePrecio.value);
    const soloStock = checkStock.checked;
    const busqueda = inputBusqueda.value.toLowerCase();

    const filtrados = productos.filter(p => {
        const porCategoria = categoria === "todas" || p.categoria === categoria;
        const porPrecio = p.precio <= precioMax;
        const porStock = !soloStock || p.enStock;
        const porNombre = p.nombre.toLowerCase().includes(busqueda);
        return porCategoria && porPrecio && porStock && porNombre;
    });

    contenedor.innerHTML = filtrados.map(p => `
        <div class="tarjeta ${p.enStock ? "" : "sin-stock"}">
            ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : ''}
            <h3>${p.nombre}</h3>
            <p>Precio: $${p.precio}</p>
            <p>Categoría: ${p.categoria}</p>
            <p>${p.enStock ? "En stock" : "Sin stock"}</p>
        </div>
    `).join("");
};

selectCategoria.addEventListener("change", mostrarProductos);
rangePrecio.addEventListener("input", () => {
    valorPrecio.textContent = rangePrecio.value;
    mostrarProductos();
});
checkStock.addEventListener("change", mostrarProductos);
inputBusqueda.addEventListener("input", mostrarProductos);

mostrarProductos();