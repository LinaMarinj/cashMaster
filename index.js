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

function htmlModalLogin() {
  return `
    <form action="">
      <label for="correo">Correo electrónico:</label>
      <input class="swal2-input" type="text" id="correo" name="correo" placeholder="tucorreo@gmail.com" />
      <label for="contrasena">Contraseña:</label>
      <input class="swal2-input" type="password" id="contrasena" name="contrasena" placeholder="**********" />
      <a href="#" onClick="abrirModalOlvidoContrasena();" >¿Olvidaste tu contraseña?</a>
      <a href="#" onClick="abrirModalRegistro();">Registrarme</a>
    </form>
  `;
}

function validarFormularioLogin() {
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
}

function realizarLogin(result) {
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
    Swal.fire({
      title: "Inicio de sesión exitoso",
      icon: "success",
      preConfirm: () => {
        window.location.href = "admin/dashboard.html";
      },
    });
  } else {
    Swal.fire({
      title: "El correo y/o la contraseña son incorrectos",
      icon: "error",
    });
  }
}

document.querySelectorAll(".btnLogin").forEach((boton) => {
  boton.addEventListener("click", () => {
    Swal.fire({
      title: "Iniciar sesión",
      html: htmlModalLogin(),
      focusConfirm: false,
      confirmButtonText: "Ingresar",
      preConfirm: validarFormularioLogin,
    }).then((result) => {
      if (result.isConfirmed) {
        realizarLogin(result);
      }
    });
  });
});

function htmlModalRegistro() {
  return `
    <form action="">
      <label for="nombre">Nombre:</label>
      <input class="swal2-input" type="text" id="nombre" name="nombre" placeholder="Camila" />
      <label for="apellido">Apellido:</label>
      <input class="swal2-input" type="apellido" id="apellido" name="apellido" placeholder="Perez" />
      <label for="correo">Correo electrónico:</label>
      <input class="swal2-input" type="text" id="correo" name="correo" placeholder="tucorreo@gmail.com" />
      <label for="contrasena">Contraseña:</label>
      <input class="swal2-input" type="password" id="contrasena" name="contrasena" placeholder="********" />
    </form>
  `;
}

function validarFormularioRegistro() {
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
}

function realizarRegistro(result) {
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

  Swal.fire({
    title: "Usuario registrado",
    icon: "success",
  });
}

function abrirModalRegistro() {
  Swal.fire({
    title: "Registrarme",
    html: htmlModalRegistro(),
    focusConfirm: false,
    confirmButtonText: "Registrarme",
    preConfirm: validarFormularioRegistro,
  }).then((result) => {
    if (result.isConfirmed) {
      realizarRegistro(result);
    }
  });
}

document.querySelectorAll(".btnRegistrarme").forEach((boton) => {
  boton.addEventListener("click", () => {
    abrirModalRegistro();
  });
});

async function abrirModalOlvidoContrasena() {
  const { value: accept } = await Swal.fire({
    title: "Recuperar contraseña",
    input: "email",
    inputLabel: "Ingrese el correo de recuperación",
    inputPlaceholder: "tucorreo@gmail.com",
    confirmButtonText: `Continue&nbsp;<i class="fa fa-arrow-right"></i>`,
    inputValidator: (value) => {
      if (!value) {
        return "Ingresa un correo de recuperación";
      }
    },
  });

  if (accept) {
    Swal.fire("Hemos enviado un código de verificación a tu correo.");
  }
}
