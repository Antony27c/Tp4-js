const contenedor = document.getElementById('contenedor-pokemon');
const estado = document.getElementById('estado');

async function obtenerPokemon() {
    try {
        estado.textContent = 'Cargando...';

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');

        if (!response.ok) {
            throw new Error('Error al obtener los datos')
        }

        const data = await response.json();

        console.log(data);

        estado.textContent = '';

        contenedor.innerHTML = data.results.map(p => `
            <div class="tarjetas">
                <h3>${p.name}</h3>
            </div>
        `).join('');
        contenedor.innerHTML = data.results.map((p, index) => `
            <div class="tarjeta">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="${p.name}">
                <h3>${p.name}</h3>
            </div>
`).join('');
    } catch (error) {
        estado.textContent = 'Ocurrio un error: ' + error.message;
        estado.style.color = 'red';
    }
}

obtenerPokemon();