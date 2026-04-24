const form = document.getElementById('form-tareas');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');
const contadorCompletadas = document.getElementById('contador-completadas');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const texto = input.value.trim();

    if (texto === '') return;

    agregarTarea(texto);
    input.value = '';
});
function agregarTarea(texto) {
    const li = document.createElement('li');
    li.textContent = texto;

    li.addEventListener('click', function() {
        li.classList.toggle('completada');
        botonEliminar.disabled = li.classList.contains('completada');
        actualizarContador();
    });

    const botonCompletar = document.createElement('button');
    botonCompletar.textContent = 'Completar';
    botonCompletar.classList.add('btn-completar');
    botonCompletar.addEventListener('click', function(e) {
    e.stopPropagation();
    li.classList.toggle('completada');
    botonEliminar.disabled = li.classList.contains('completada');
    actualizarContador();
});

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        actualizarContador();
    });

    const acciones = document.createElement('div');
    acciones.classList.add('acciones');
    acciones.appendChild(botonCompletar);
    acciones.appendChild(botonEliminar);
    li.appendChild(acciones);
    lista.appendChild(li)

    actualizarContador();
}
function actualizarContador() {
    const pendientes = lista.querySelectorAll('li:not(.completada)').length;
    const completadas = lista.querySelectorAll('li.completada').length;
    contador.textContent = 'Tareas pendientes: ' + pendientes;
    contadorCompletadas.textContent = 'Tareas completadas: ' + completadas;
}