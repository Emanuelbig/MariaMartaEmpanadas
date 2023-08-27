// Primero que todo recomiendo siempre leer esta documentacion https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/JavaScript_basics

// Validacion de Formulario
// Este document.addEvent.... espera a que todo el contenido de la página se haya cargado antes de ejecutar el código
// aca lo q hacemos es llamar a un objeto que esta en html con document y con addEventListener le asignamos un evento
//a una funcion especifica, aca el document el testigo de la situacion, el evento lo crearemos mediante una funcion
// el DOMContentLoaded lo usamos para esperar a q se cargue la pagina 1ero, antes de que nuestran funcion funcione.
document.addEventListener('DOMContentLoaded', function () {
  // tenes que obtener una referencia al formulario usando el ID, por eso declaras esta variable
  //getElementById se usa para llamar los objetos del html
  const form = document.getElementById('formulario-contacto');
   // Agrega un evento para cuando el formulario se envíe
  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Usando este evento evitas que el formulario se envíe por defecto
      // Declaras las variables para luego hacer la validacion
      // Usamos form.querySelector porque estamos identificando objetos dentro del form pero como son ids podriamos usar tambien getElementById
      //.value es por que queremos obtener el valor del elemento que estamos convocando
      const nombre = form.querySelector('#nombre').value;
      const email = form.querySelector('#email').value;
      const telefono = form.querySelector('#telefono').value;
      const mensaje = form.querySelector('#mensaje').value;
      
      // Validación básica: de esta manera se verifica si alguno de los campos está vacío
      // vamos a usar una funcion condicional que se llama if si esto es verdad va a ser "x" cosa y si es mentira va a hacer "y" cosa
      if (nombre === '' || email === '' || telefono === '' || mensaje === '') {
        // Pones un alert por si no se cumple esto
          alert('Por favor, completa todos los campos.');
          return; // Con return salis de la funcion ya que no se completaron los campos
      }
      
      // Si creamos otro alert podemos simular el envío de datos a un servidor
      alert(`Mensaje enviado:\nNombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\nMensaje: ${mensaje}`);
      // Esta es una cadena string aca hay texto + las variables que queremos que nos muestre el alert cuando se simule el envio 
      
      // Reseteamos el formulario después de la simulacion del envío, si no nos quedamos ahi trabados
      form.reset();
  });
});

// Animacion cuando hago scroll
// Vamos a lograr un efecto de que a medida que vamos scrolleando van apareciendo las secciones
// Vamos a declarar una variable que va a llamar a todos los html que tengan la clase 'carga-animacion'
const animacionesDeCarga = document.querySelectorAll('.carga-animacion');
// Aca ejecutamos una funcion debounce(rebote), es como un regulador de velocidad para ejecutar funciones
//Evita que una función se ejecute rápidamente muchas veces seguidas.
/* a mi me gusta particularmente usar una libreria para este tipo de animaciones, la libreria es esta https://michalsnik.github.io/aos/ 
Si lo queres hacer con javascript puro como en este ejemplo te invito a ver estas paginas https://webdesign.tutsplus.com/es/animate-on-scroll-with-javascript--cms-36671t y https://www.espai.es/blog/2022/09/animar-elementos-html-al-hacer-scroll/*/
function debounce(func, wait = 20) {
  // Declaramos una variable para almacenar el temporizador dentro de la funcion debounce
    let timeout;
    // Devuelve una función que envuelve a la función original
    return function() {
        // Almacena la referencia al "this" y a los argumentos pasados a esta función envuelta
        const context = this, args = arguments;
        // Con clearTimeout limpiamos el temporizador anterior, reiniciando el contador de tiempo
        clearTimeout(timeout);
        // Configuramos un nuevo temporizador que ejecutará la función después de un cierto tiempo (wait) (lo que pusimos al inicion de la funcion debounce)
        timeout = setTimeout(() => {
          // El temporizador vuelve a cero con null
            timeout = null;
            // Arranca la función original (func) con el contexto y los argumentos adecuados
            func.apply(context, args);
        }, wait);
    };
}
/*Funcion checkAnimation: Esta funcion se llama cada vez que ocurre un evento de scroll, y se encarga de comprobar si las etiquetas con la clase carga-animacion deben activarse o desactivarse según su posición en la ventana.*/
function checkAnimation() {
  // Itera sobre cada elemento con la clase 'carga-animacion'
    animacionesDeCarga.forEach(animacion => {
      // Llamamos las variables y se calcula la posición en la que el elemento debería aparecer en la ventana
        const apareceEn = (window.scrollY + window.innerHeight) - animacion.clientHeight / 9;
        const parteInferior = animacion.offsetTop + animacion.clientHeight;
        const estaEnMedioDePantalla = apareceEn > animacion.offsetTop;
        const noHaPasado = window.scrollY < parteInferior;
        // Si el elemento está en el medio de la pantalla y no ha pasado, agrega la clase 'activa'
        if (estaEnMedioDePantalla && noHaPasado) {
            setTimeout(() => {
                animacion.classList.add('activa');
            }, 100); // Retraso de 0.1 segundos
        } else {
          // Si no se cumple la condicion, la clase 'activa' se saca
            animacion.classList.remove('activa');
        }
    });
}
// evento de scroll a la ventana del navegador y utilizando la función debounce para controlar cuándo se ejecuta la función checkAnimation en respuesta al evento de scroll
window.addEventListener('scroll', debounce(checkAnimation));

// script para votar tu empanada
// Estamos creando un evento aca y declarando 2 variables una de formulario de votacion y otra de resultado
document.addEventListener("DOMContentLoaded", function() {
  const formvotacion = document.getElementById("formulario-votacion");
  const resultado = document.getElementById("resultado");
  // Aca creamos otro evento para cuando el formulario de votación se envíe, basicamente con el submit le estamos diciendo que el form se envia    
  formvotacion.addEventListener("submit", function(event) {
    // Estee event.prevenDefault evita que el formulario se envíe por defecto
  event.preventDefault();
  // Aca creamos otra variable para obtener el elemento seleccionado (input radio) dentro del form
  const votar = document.querySelector('input[name="votar"]:checked');
  if (votar) {
    // Si se ha seleccionado un valor, obtener el valor del elemento
    const votarvalue = votar.value;
    // LLamamos a la variable y con .textContent = , Escribimos lo que queras y mostramos el resultado dentro de "${   }" 
    resultado.textContent = `Votaste "${votarvalue}" en la encuesta.`;
    } else {
    // Aca es lo mismo pero en caso de que apretaron el boton enviar y no votaron.
    resultado.textContent = "Por favor, elige una opción.";
    }
  });
});

// Pop up/Ventana emergente para suscribirse al newsletter
document.addEventListener("DOMContentLoaded", function() {
  const ventanapopupFondo = document.getElementById("ventanapopup-fondo");
  const botonSuscribir = document.getElementById("boton-suscribir");
  const emailInput = document.getElementById("email-input"); // Agregado

  // Mostrar la ventana emergente al cargar la página
  ventanapopupFondo.style.display = "flex";

  // Deshabilitar interacción con el contenido principal
  document.body.style.overflow = "hidden";

  const cerrarPopup = document.getElementById("cerrar-popup");
  // const es para declarar variables, esta durante la ejecucion del programa nunca cambia su valor
  // let si puede cambiar su valor durante la ejecucion del programa
  cerrarPopup.addEventListener("click", function() {
    // Habilitar interacción con el contenido principal
    document.body.style.overflow = "auto";
    ventanapopupFondo.style.display = "none";
  });

  botonSuscribir.addEventListener("click", function() {
    const email = emailInput.value;
    if (validateEmail(email)) {
      // Habilitar interacción con el contenido principal
      document.body.style.overflow = "auto";
      ventanapopupFondo.style.display = "none";

      alert("¡Gracias por suscribirte, no te perderas ninguna de nuestras promos!");
      // Aquí puedes agregar código para enviar el correo electrónico al servidor
    } else {
      alert("Por favor, ingresa un correo electrónico válido.");
    }
  });

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});

// Ventana Emergente del boton "hace tu pedido"
document.addEventListener("DOMContentLoaded", function() {
  const botonHacerPedido = document.querySelector(".boton-hacerpedido");
  const ventanaEmergente = document.querySelector(".ventana-emergente");
  const botonAceptar = document.querySelector(".boton-aceptar");

  botonHacerPedido.addEventListener("click", function(event) {
      event.preventDefault();
      ventanaEmergente.style.display = "block";
  });

  botonAceptar.addEventListener("click", function() {
      ventanaEmergente.style.display = "none";
  });
});




