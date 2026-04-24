const contenedor = document.getElementById('contenedor-pokemon');
const estado = document.getElementById('estado');
const inputBusqueda = document.getElementById('inputBusqueda');

async function obtenerPokemon(busqueda = '') {
    try {
        estado.textContent = 'Cargando...';

        if (busqueda) {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();

            const filtrados = data.results.filter(p => {
                const id = p.url.split('/').filter(Boolean).pop();
                return p.name.includes(busqueda) || id === busqueda;
            });

            estado.textContent = '';

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

        } else {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            estado.textContent = '';

            contenedor.innerHTML = data.results.map(p => {
                const id = p.url.split('/').filter(Boolean).pop();
                return `
                    <div class="tarjeta">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${p.name}">
                        <h3>${p.name}</h3>
                    </div>
                `;
            }).join('');
        }

    } catch (error) {
        estado.textContent = 'Ocurrió un error: ' + error.message;
        estado.style.color = 'red';
    }
}

inputBusqueda.addEventListener('input', function() {
    const busqueda = inputBusqueda.value.toLowerCase().trim();

    if (busqueda.length < 1) {
        contenedor.innerHTML = '';
        estado.textContent = busqueda.length > 0 ? 'Escribí al menos 1 caracteres...' : '';
        obtenerPokemon();
        return;
    }

    obtenerPokemon(busqueda);
});

obtenerPokemon();