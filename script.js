//alert("Bienvenido a Cash Master💵");

//Variables globales o a nivel de archivo//

let menu;
let usuariosResgistrados = [];

let objetoUsuario = {};
usuariosResgistrados[0] = {
  nombre: "Admin",
  apellido: "lopez",
  correo: "admin@gmail.com",
  contrasena: "admin123",
};
let index = 1;
/*
do {
  menu = parseInt(
    prompt(
      "Que deseas hacer hoy: \n\n1. Iniciar sesión \n2. Registrarme \n0. Salir"
    )
  );

  if (!menu) {
    alert("Saliendo del programa...");
    break;
  }

  switch (menu) {
    
    case 2:
      let user = prompt("👤 Registro \n\n Ingrese su correo: ");
      let password = prompt("Ingrese una contraseña: ");
      alert("Usuario registrado ✔");

      objetoUsuario = new Usuario(user, password);
      usuariosResgistrados[index] = objetoUsuario;
      index++;
      break;

    case 0:
      alert("Saliendo del programa...");
      break;

    default:
      alert("❗Selecciona una opción valida");
      break;
  }
} while (menu != 0);
 */

document.querySelector("#btnLogin").addEventListener("click", () => {
  Swal.fire({
    title: "Iniciar sesión",
    html:
      '<form action="">' +
      '<label for="correo">Correo electronico:</label>' +
      '<input class="swal2-input"' +
      'type="text"' +
      'id="correo"' +
      'name="correo"' +
      'placeholder="tucorreo@gmail.com"' +
      "/>" +
      '<label for="contrasena">Contraseña:</label>' +
      '<input class="swal2-input"' +
      'type="password"' +
      'id="contrasena"' +
      'name="contrasena"' +
      'placeholder="***"' +
      "/>" +
      "</form>",
    focusConfirm: false,
    confirmButtonText: "Ingresar",
    preConfirm: () => {
      const correo = document.getElementById("correo").value;
      const contrasena = document.getElementById("contrasena").value;

      // Verifica que los valores no estén vacíos
      if (!correo || !contrasena) {
        Swal.showValidationMessage("Por favor, ingresa ambos campos");
        return false;
      }

      return {
        correo: correo,
        contrasena: contrasena,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      let correo = result.value.correo;
      let pass = result.value.contrasena;

      let hizoLogin = false;

      for (let index = 0; index < usuariosResgistrados.length; index++) {
        //para index igual a 0 recorrer hasta que deje de ser menor
        let usuario = usuariosResgistrados[index];
        if (usuario.correo === correo && usuario.contrasena === pass) {
          hizoLogin = true;
          break;
        }
      }

      if (hizoLogin) {
        Swal.fire("Inicio de sesión exitoso ✔");
      } else {
        Swal.fire("El correo y/o la contraseña son incorrectos ❌ ");
      }
    }
  });
});

document.querySelector("#btnRegistrarme").addEventListener("click", () => {
  Swal.fire({
    title: "Registrarme",
    html:
      '<form action="">' +
      '<label for="nombre">Nombre:</label>' +
      '<input class="swal2-input"' +
      'type="text"' +
      'id="nombre"' +
      'name="nombre"' +
      'placeholder="Camila"' +
      "/>" +
      '<label for="apellido">Apellido:</label>' +
      '<input class="swal2-input"' +
      'type="apellido"' +
      'id="apellido"' +
      'name="apellido"' +
      'placeholder="Perez"' +
      "/>" +
      '<label for="correo">Correo electronico:</label>' +
      '<input class="swal2-input"' +
      'type="text"' +
      'id="correo"' +
      'name="correo"' +
      'placeholder="tucorreo@gmail.com"' +
      "/>" +
      '<label for="contrasena">Contraseña:</label>' +
      '<input class="swal2-input"' +
      'type="password"' +
      'id="contrasena"' +
      'name="contrasena"' +
      'placeholder="***"' +
      "/>" +
      "</form>",
    focusConfirm: false,
    confirmButtonText: "Registrarme",
    preConfirm: () => {
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const correo = document.getElementById("correo").value;
      const contrasena = document.getElementById("contrasena").value;

      // Verifica que los valores no estén vacíos
      if (!nombre || !apellido || !correo || !contrasena) {
        Swal.showValidationMessage("Por favor, ingresa todos campos");
        return false;
      }

      return {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      let nombre = result.value.nombre;
      let apellido = result.value.apellido;
      let correo = result.value.correo;
      let contrasena = result.value.contrasena;

      objetoUsuario = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena,
      };
      usuariosResgistrados[index] = objetoUsuario;
      index++;

      Swal.fire("Usuario registrado ✔");
    }
  });
});
