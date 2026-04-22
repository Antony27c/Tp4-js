const contenedor = document.getElementById('contenedor-pokemon');
const estado = document.getElementById('estado');
const inputBusqueda = document.getElementById('inputBusqueda');

async function obtenerPokemon(busqueda = '') {
    try {
        estado.textContent = 'Cargando...';

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();

        estado.textContent = '';

        const filtrados = busqueda
            ? data.results.filter(p => p.name.includes(busqueda))
            : data.results;

        if (filtrados.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        contenedor.innerHTML = filtrados.map(p => {
            const id = p.url.split('/').filter(Boolean).pop();
            return `
                <div class="tarjeta">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${p.name}">
                    <h3>${p.name}</h3>
                </div>
            `;
        }).join('');

    } catch (error) {
        estado.textContent = 'Ocurrió un error: ' + error.message;
        estado.style.color = 'red';
    }
}

inputBusqueda.addEventListener('input', function() {
    const busqueda = inputBusqueda.value.toLowerCase();

    if (busqueda.length < 3) {
        estado.textContent = busqueda.length > 0 ? 'Escribí al menos 3 caracteres...' : '';
        obtenerPokemon();
        return;
    }

    estado.textContent = 'Buscando...';
    obtenerPokemon(busqueda);
});

obtenerPokemon();