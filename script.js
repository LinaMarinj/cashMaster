alert("Bienvenido a Cash Master💵");

//Variables globales o a nivel de archivo//

let menu;
let usuariosResgistrados = [];
let index = 0;

class Usuario {
  constructor(correo, contraseña) {
    this.correo = correo;
    this.contraseña = contraseña;
  }

  get getUser() {
    return this.correo;
  }

  get getPassword() {
    return this.contraseña;
  }
}

let objetoUsuario = new Usuario("", "");

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
    case 1:
      let correo = prompt("👤Inicio de sesión \n\n Ingrese su correo: ");
      let pass = prompt("Ingrese una contraseña: ");

      let hizoLogin = false;

      for (let index = 0; index < usuariosResgistrados.length; index++) { //para index igual a 0 recorrer hasta que deje de ser menor
        let usuario = usuariosResgistrados[index];
        if (usuario.getUser == correo && usuario.getPassword == pass) {
          hizoLogin = true;
          break;
        }
      }

      if (hizoLogin) {
        alert("Inicio de sesión exitoso ✔");
      } else {
        alert("El correo y/o la contraseña son incorrectos ❌ ");
      }

      break;

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
