const DOMAIN_URL = "http://127.0.0.1:8000/api"; 

const estudiantesList = document.getElementById('estudiantes-list');
const notasList = document.getElementById('notas-list');
const resumenEstudiantes = {
    aprobados: document.getElementById('est-aprobados'),
    reprobados: document.getElementById('est-reprobados'),
    sinNotas: document.getElementById('est-sin-notas'),
};
const resumenNotas = {
    menores3: document.getElementById('notas-menores-3'),
    mayores3: document.getElementById('notas-mayores-3'),
};

async function obtenerEstudiantes() {
    const response = await fetch(`${DOMAIN_URL}/app/estudiantes`);
    const data = await response.json();
    actualizarListadoEstudiantes(data);
}

async function registrarEstudiante(codigo, nombre, email) {
    const response = await fetch(`${DOMAIN_URL}/app/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo, nombre, email }),
    });

    if (response.ok) {
        await obtenerEstudiantes();
    } else {
        alert('Error al registrar el estudiante.');
    }
}

async function eliminarEstudiante(codigo) {
    const response = await fetch(`${DOMAIN_URL}/app/estudiantes/${codigo}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        await obtenerEstudiantes();
    } else {
        alert('Error al eliminar el estudiante.');
    }
}

async function obtenerNotas(codigo) {
    const response = await fetch(`${DOMAIN_URL}/app/notas/${codigo}`);
    const data = await response.json();
    actualizarListadoNotas(data);
}

async function registrarNota(codigo, actividad, valor) {
    const response = await fetch(`${DOMAIN_URL}/app/notas/${codigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actividad, valor }),
    });

    if (response.ok) {
        await obtenerNotas(codigo);
    } else {
        alert('Error al registrar la nota.');
    }
}

function actualizarListadoEstudiantes(estudiantes) {
    estudiantesList.innerHTML = '';
    let aprobados = 0, reprobados = 0, sinNotas = 0;

    estudiantes.forEach(est => {
        const { codigo, nombre, email, promedio, estado } = est;

        if (estado === 'Aprobado') aprobados++;
        if (estado === 'Reprobado') reprobados++;
        if (estado === 'Sin nota') sinNotas++;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${codigo}</td>
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${promedio !== null ? promedio.toFixed(2) : 'No hay nota'}</td>
            <td>${estado}</td>
            <td>
                <button class="ver-notas" data-codigo="${codigo}">Ver Notas</button>
                <button class="eliminar-estudiante" data-codigo="${codigo}">Eliminar</button>
            </td>
        `;
        estudiantesList.appendChild(row);
    });

    resumenEstudiantes.aprobados.textContent = aprobados;
    resumenEstudiantes.reprobados.textContent = reprobados;
    resumenEstudiantes.sinNotas.textContent = sinNotas;
}

function actualizarListadoNotas(notas) {
    notasList.innerHTML = '';
    let menores3 = 0, mayores3 = 0;

    notas.forEach(nota => {
        if (nota.valor < 3) menores3++;
        if (nota.valor >= 3) mayores3++;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nota.actividad}</td>
            <td class="nota">${nota.valor.toFixed(2)}</td>
            <td>
                <button class="modificar-nota" data-actividad="${nota.actividad}">Modificar</button>
                <button class="eliminar-nota" data-actividad="${nota.actividad}">Eliminar</button>
            </td>
        `;
        notasList.appendChild(row);
    });

    resumenNotas.menores3.textContent = menores3;
    resumenNotas.mayores3.textContent = mayores3;
}

document.getElementById('btn-add-estudiante').addEventListener('click', () => {
    const codigo = prompt('Código del estudiante:');
    const nombre = prompt('Nombre del estudiante:');
    const email = prompt('Email del estudiante:');
    registrarEstudiante(codigo, nombre, email);
});

document.getElementById('btn-add-nota').addEventListener('click', () => {
    const codigo = prompt('Código del estudiante:');
    const actividad = prompt('Actividad:');
    const valor = parseFloat(prompt('Nota (0-5):'));
    registrarNota(codigo, actividad, valor);
});

estudiantesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-estudiante')) {
        const codigo = e.target.dataset.codigo;
        if (confirm('¿Estás seguro de eliminar este estudiante?')) {
            eliminarEstudiante(codigo);
        }
    } else if (e.target.classList.contains('ver-notas')) {
        const codigo = e.target.dataset.codigo;
        obtenerNotas(codigo);
    }
});

obtenerEstudiantes();
