let balance = 0;
let arregloMovimientosGrafica = [0];
let arregloFechasMovimientosGrafica = [""];
let nuevoIngreso;
let ingresosTotales = []; // Inicializamos el array de ingresos
let indexIngresos = 0; // contador
let nuevoGasto;
let gastosTotales = []; // Inicializamos el array de gastos
let objetoUsuario = {};
let indexGastos = 0; // contador


//este es el bloque de la estadistica
const options = {
    chart: {
        height: "100%",
        maxHeight: "215px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#7125cbbd",
            gradientToColors: ["#7125cbbd"],
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 6,
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: 0,
        },
    },
    series: [
        {
            name: "Movimientos",
            data: arregloMovimientosGrafica,
            color: "#7125cbbd",
        },
    ],
    xaxis: {
        categories: arregloFechasMovimientosGrafica,
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
};

let chart;

if (
    document.getElementById("area-chart") &&
    typeof ApexCharts !== "undefined"
) {
    chart = new ApexCharts(document.getElementById("area-chart"), options);
    chart.render();
}
//final de la estadistica

function actualizarMensajeTabla(tbody) {

    // Si el tbody no tiene filas (tr), agrega el mensaje vacío
    if (tbody.children.length === 0) {
        const trConMensajeVacio = document.createElement("tr");
        trConMensajeVacio.classList.add("mensaje-vacio");

        trConMensajeVacio.innerHTML = `
            <td colspan="4" class="text-center text-gray-500 py-[100px]">
                No hay registros disponibles
            </td>
        `;
        tbody.appendChild(trConMensajeVacio);
    } else if (tbody.querySelector("tr.mensaje-vacio")) {
        tbody.innerHTML = "";
    }
}

actualizarMensajeTabla(document.querySelector("#tablaIngresos tbody"));
actualizarMensajeTabla(document.querySelector("#tablaGastos tbody"));

function htmlModalIngreso() {
    return `
        <form action="">
            <label for="montoIngreso">Monto Ingreso:</label>
            <input class="swal2-input" type="number" id="montoIngreso" name="montoIngreso" placeholder="$100.000" />
            <label for="fechaIngreso">Fecha Ingreso:</label>
            <input class="swal2-input" type="date" id="fechaIngreso" name="fechaIngreso" />
            <label for="frecuencia">Frecuencia:</label>
            <select class="swal2-input" name="frecuencia" id="frecuencia" style="margin-bottom: 25px !important; border: 1px solid hsl(0, 0%, 85%); border-radius: .1875em;">
                <option value="" disabled selected>Selecciona una frecuencia</option>
                <option value="Diaria">Diaria</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Anual">Anual</option>
                <option value="Otro...">Otro...</option>
            </select>
            <label for="categoria">Categoría:</label>
            <select class="swal2-input" name="categoria" id="categoria" style="margin-bottom: 25px !important;border: 1px solid hsl(0, 0%, 85%); border-radius: .1875em;">
                <option value="" disabled selected>Selecciona una categoría</option>
                <option value="Salario">Salario</option>
                <option value="Ahorros">Ahorros</option>
                <option value="Inversiones">Inversiones</option>
                <option value="Subsidio">Subsidio</option>
                <option value="Otro...">Otro...</option>
            </select>
        </form>
    `;
}

function validarFormularioIngreso() {
    // Obtenemos los valores de los campos del formulario
    const montoIngreso = document.getElementById("montoIngreso").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const frecuencia = document.getElementById("frecuencia").value;
    const categoria = document.getElementById("categoria").value;

    // Verifica que los valores no estén vacíos
    if (!montoIngreso || !fechaIngreso || !frecuencia || !categoria) {

        // Muestra un mensaje de error si hay campos vacíos y no guarda el ingreso
        Swal.showValidationMessage("Por favor completa todos los campos");
        return false;
    }

    // Retorna un objeto con los valores del formulario si todo está correcto
    return {
        montoIngreso,
        fechaIngreso,
        frecuencia,
        categoria,
    };
}

function guardarIngreso(result) {
    // Obtenemos los valores del formulario
    const montoIngreso = result.value.montoIngreso;
    const fechaIngreso = result.value.fechaIngreso;
    const frecuencia = result.value.frecuencia;
    const categoria = result.value.categoria;

    // Incrementar contador de ingresos
    indexIngresos++;

    // Crear objeto de ingreso
    const objetoIngreso = {
        idIngreso:indexIngresos,
        montoIngreso,
        fechaIngreso,
        frecuencia,
        categoria,
    };

    // Guardar el objeto en el arreglo simulando una base de datos
    ingresosTotales.push(objetoIngreso);


    actualizarMensajeTabla(document.querySelector("#tablaIngresos tbody"));

    const tbody = document.querySelector("#tablaIngresos tbody");

    // Crear una nueva fila
    const newRow = document.createElement("tr");

    // Agregar celdas a la fila
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${indexIngresos}</td>
        <td class="px-6 py-4 whitespace-nowrap">${montoIngreso}</td>
        <td class="px-6 py-4 whitespace-nowrap">${fechaIngreso}</td>
        <td class="px-6 py-4 whitespace-nowrap">${frecuencia}</td>
        <td class="px-6 py-4 whitespace-nowrap">${categoria}</td>
    `;

    // Agregar la fila al tbody
    tbody.appendChild(newRow);

    // Mostrar mensaje de éxito
    Swal.fire({ title: "Ingreso Registrado", icon: "success", });

    balance += parseInt(montoIngreso);
    const formatoDePesoColombiano = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(balance);

    arregloMovimientosGrafica.push(balance);
    console.log(fechaIngreso);
    arregloFechasMovimientosGrafica.push(fechaIngreso);
    document.querySelector("#saldo").innerHTML = formatoDePesoColombiano;
    document.getElementById("area-chart").innerHTML = "";
    chart.render();
}

function abrirModalIngreso() {
    return Swal.fire({
        title: "Nuevo Ingreso",
        html: htmlModalIngreso(),
        focusConfirm: false,
        confirmButtonText: "Registrar Ingreso",
        preConfirm: validarFormularioIngreso,
    }).then((result) => {
        if (result.isConfirmed) {
            guardarIngreso(result);
        }
    });
}

document.querySelector("#btnNuevoIngreso").addEventListener("click", () => {
    abrirModalIngreso();
});

function htmlModalGasto() {
    return `
        <form action="">
            <label for="montoGasto">Monto Gasto:</label>
            <input class="swal2-input" type="number" id="montoGasto" name="montoGasto" placeholder="$500.000" />
            <label for="fechaGasto">Fecha Gasto:</label>
            <input class="swal2-input" type="date" id="fechaGasto" name="fechaGasto" />
            <label for="categoria">Categoría:</label>
            <select class="swal2-input" name="categoria" id="categoria" style="margin-bottom: 25px !important;border: 1px solid hsl(0, 0%, 85%); border-radius: .1875em;">
                <option value="" disabled selected>Selecciona una categoría</option>
                <option value="Arriendo">Arriendo</option>
                <option value="Alimentacion">Alimentacion</option>
                <option value="Transporte">Transporte</option>
                <option value="Gymnasio">Gymnasio</option>
                <option value="Otro...">Otro...</option>
            </select>
        </form>
    `;
}

function validarFormularioGasto() {
    const montoGasto = document.getElementById("montoGasto").value;
    const fechaGasto = document.getElementById("fechaGasto").value;
    const categoria = document.getElementById("categoria").value;


    if (!montoGasto || !fechaGasto || !categoria) {
        Swal.showValidationMessage("Por favor completa todos los campos");
        return false;
    }

    return {
        montoGasto,
        fechaGasto,
        categoria,
    };
}

function guardarGasto(result) {

    const montoGasto = result.value.montoGasto;
    const fechaGasto = result.value.fechaGasto;
    const categoria = result.value.categoria;
     
    // Incrementar contador de gastos
     indexGastos++;

    // Crear objeto de gasto
    const objetoGasto = {
        idGasto: indexGastos,
        montoGasto,
        fechaGasto,
        categoria,
    };

    // Guardar el objeto en el arreglo simulando una base de datos
    gastosTotales.push(objetoGasto);

    actualizarMensajeTabla(document.querySelector("#tablaGastos tbody"));

    const tbody = document.querySelector("#tablaGastos tbody");

    // Crear una nueva fila
    const newRow = document.createElement("tr");

    // Agregar celdas a la fila
    newRow.innerHTML = `
<td class="px-6 py-4 whitespace-nowrap">${indexGastos}</td>
<td class="flex items-center">
<div class="px-6 py-4 whitespace-nowrap">${montoGasto}</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">${fechaGasto}</td>
<td class="px-6 py-4 whitespace-nowrap">${categoria}</td>
`;

    // Agregar la fila al tbody
    tbody.appendChild(newRow);

    Swal.fire({
        title: "Gasto Registrado",
        icon: "success",
    });

    balance -= parseInt(montoGasto);
    const formatoDePesoColombiano = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(balance);

    arregloMovimientosGrafica.push(balance);
    arregloFechasMovimientosGrafica.push(fechaGasto);
    document.querySelector("#saldo").innerHTML = formatoDePesoColombiano;
    document.getElementById("area-chart").innerHTML = "";
    chart.render();
}

document.querySelector("#btnNuevoGasto").addEventListener("click", () => {
    Swal.fire({
        title: "Nuevo Gasto",
        html: htmlModalGasto(),
        focusConfirm: false,
        confirmButtonText: "Registrar Gasto",
        preConfirm: validarFormularioGasto,
    }).then((result) => { // Despues
        if (result.isConfirmed) {
            guardarGasto(result);
        }
    });
});

// Se crea ventana emergente
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

// evento de clic al botón de reporte
document.getElementById("btnGenerarReporte").addEventListener("click", () => {
    // Mostrar el Toast
    Toast.fire({
        icon: "success",
        title: "Preparando Reporte",
    });

    // abrir el Swal de "Balance Mensual"
    setTimeout(() => {
        let totalGastos = 0;
        let totalIngresos = 0;
        gastosTotales.forEach((gasto) =>
            totalGastos += parseFloat(gasto.montoGasto));
        ingresosTotales.forEach((ingreso) =>
            totalIngresos += parseFloat(ingreso.montoIngreso));

        Swal.fire({
            title: "Balance Mensual",
            html:
                '<div id="modalContent">' +
                "<p>Tus ingresos mensuales totales son: </p>" + totalIngresos +
                "<p>Tus gastos mensuales totales son: </p>" + totalGastos +
                "<p>Tu balance mensual es: </p>" + balance +
                "<p>¡Tus finanzas están muy bien! ¡FELICIDADES!</p>" +
                "</div>" +
                '<button id="btnDescargarPDF" class="swal2-confirm swal2-styled">Descargar PDF</button>' + // Botón para descargar PDF
                '<button id="btnAtras" class="swal2-cancel swal2-styled" style="margin-left: 10px;">Atrás</button>',
            showConfirmButton: false, // Deshabilitar el botón de confirmación
            didOpen: () => {
                // Agregar el evento de clic para descargar el PDF
                document
                    .getElementById("btnDescargarPDF")
                    .addEventListener("click", () => {
                        // Seleccionar el contenido que se convertirá en PDF
                        const modalContent = document.getElementById("modalContent");

                        // Usar html2pdf para generar el PDF
                        html2pdf().from(modalContent).save("Balance_Mensual.pdf");
                    });

                // Agregar el evento de clic para el botón "Atrás" que cerrará el modal
                document.getElementById("btnAtras").addEventListener("click", () => {
                    Swal.close(); // Cerrar la alerta de SweetAlert2
                });
            },
        });
    }, 3000); // Mismo tiempo que el timer del Toast
});
