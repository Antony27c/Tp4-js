const form = document.getElementById('form-tareas');
const input = document.getElementById('inputTarea');
const lista = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');

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
        actualizarContador();
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        actualizarContador();
    });

    li.appendChild(botonEliminar);
    lista.appendChild(li);

    actualizarContador();
}
function actualizarContador() {
    const pendientes = lista.querySelectorAll('li:not(.completada').length;
    contador.textContent = 'Tareas pendientes: ' + pendientes;
}