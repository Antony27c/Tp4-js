const calcularPromedio = (notas) => {
    const suma = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    return suma / notas.length;
};

const filtrarAprobados = (alumnos) => {
    return alumnos.filter(alumno => alumno.nota >= 6);
};

const formatearAlumnos = (alumnos) => {
    return alumnos.map(alumno => `Nombre: ${alumno.nombre} - Nota: ${alumno.nota}`);
};

const buscarAlumnos = (alumnos, nombre) => {
    return alumnos.find(alumno => alumno.nombre === nombre);
};

const alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Carlos", nota: 4 },
    { nombre: "Braian", nota: 9 },
    { nombre: "juan", nota: 6 }
];

console.log("Promedio:", calcularPromedio([8, 3, 6, 7]));
console.log("Aprobados:", filtrarAprobados(alumnos));
console.log("Almunos formateados", formatearAlumnos(alumnos));
console.log("Alumno encontrado", buscarAlumnos(alumnos, "Braian"));