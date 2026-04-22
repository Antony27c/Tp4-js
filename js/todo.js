const form = document.getElementById('form-tareas');
const input = document.getElementById('inputTarea');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const texto = input.value.trim();

    if (texto === '') return;

    agregarTarea(texto);
    input.value = '';
});