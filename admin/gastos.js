
//este es el bloque de la estadistica


const options = {
  chart: {
    height: "100%",
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
      name: "New users",
      data: [3000000, 1500000, 2000000],
      color: "#7125cbbd",
    },
  ],
  xaxis: {
    categories: ["2024-10-11", "2024-10-05", "2024-10-04"],
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

if (
  document.getElementById("area-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(document.getElementById("area-chart"), options);
  chart.render();
}

let nuevoGasto;
let gastosTotales = []; // Inicializamos el array de gastos

let objetoUsuario = {};
let indexGastos = 0; // contador


function actualizarMensajeTabla() {
  const tbody = document.querySelector("#tablaGastos tbody");

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

actualizarMensajeTabla();

document.querySelector("#btnNuevoGasto").addEventListener("click", () => {
  Swal.fire({
    title: "Nuevo Gasto",
    html:
      '<form action="">' +
      '<label for="idGasto">ID Gasto:</label>' +
      '<input class="swal2-input"' +
      'type="text"' +
      'id="idGasto"' +
      'name="idGasto"' +
      '<label for="montoGasto">Monto Gasto:</label>' +
      '<input class="swal2-input"' +
      'type="number"' +
      'id="montoGasto"' +
      'name="montoGasto"' +
      'placeholder="500000"' +
      "/>" +
      '<label for="fechaGasto">Fecha Gasto:</label>' +
      '<input class="swal2-input"' +
      'type="date"' +
      'id="fechaGasto"' +
      'name="fechaGasto"' +
      "/>" +
      '<label for="categoria">Categoría:</label>' +
      '<input class="swal2-input"' +
      'type="text"' +
      'id="categoria"' +
      'name="ategoria"' +
      "</form>",

    focusConfirm: false,
    confirmButtonText: "Registrar Gasto",
    preConfirm: () => {
      const idGasto = document.getElementById("idGasto").value;
      const montoGasto = document.getElementById("montoGasto").value;
      const fechaGasto = document.getElementById("fechaGasto").value;
      const categoria = document.getElementById("categoria").value;

     
      if (!idGasto || !montoGasto || !fechaGasto || !categoria) {
        Swal.showValidationMessage("Por favor completa todos los campos");
        return false;
      }

      return {
        idGasto,
        montoGasto,
        fechaGasto,
        categoria,
      };
    },
  }).then((result) => { // Despues
    if (result.isConfirmed) {
      const idGasto = result.value.idGasto;
      const montoGasto = result.value.montoGasto;
      const fechaGasto = result.value.fechaGasto;
      const categoria = result.value.categoria;

      // Crear objeto de gasto
      const objetoGasto = {
        idGasto,
        montoGasto,
        fechaGasto,
        categoria,
      };

      // Guardar el objeto en el arreglo simulando una base de datos
      gastosTotales.push(objetoGasto);

      // Mostrar el contenido en la consola para verificar
      console.log("Gastos Totales:", gastosTotales);

      // Incrementar contador de gastos
      indexGastos++;

      actualizarMensajeTabla();

      const tbody = document.querySelector("#tablaGastos tbody");

      // Crear una nueva fila
      const newRow = document.createElement("tr");

      // Agregar celdas a la fila
      newRow.innerHTML = `
  <td class="px-6 py-4 whitespace-nowrap">${idGasto}</td>
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
    gastosTotales.forEach((gasto) => 
    totalGastos += parseFloat(gasto.montoGasto));
    
    Swal.fire({
      title: "Balance Mensual",
      html:
        '<div id="modalContent">' +
        "<p>Tus ingresos mensuales totales son: </p>" +
        "<p>Tus gastos mensuales totales son: </p>" + totalGastos + 
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


