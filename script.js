alert("Bienvenido a Cash Master💵");

do {
  menu = parseInt(
    prompt(
      "Que deseas hacer hoy: \n\n1. Iniciar sesión \n2. Registrarme \n0. Salir"
    )
  );

  switch (menu) {
    case 1:
      break;

    case 2:
      break;

    case 0:
      alert("Saliendo del programa...");
      break;

    default:
      alert("❗Selecciona una opción valida");
      break;
  }
} while (menu != 0);
