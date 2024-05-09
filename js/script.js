'use strict';
let eventos;
let count1 = 0;
const backToTopButton = document.getElementById('backToTop');
const intervalo = 1000;
const sortEventosPorFecha = lista => {
  lista.sort((a, b) => a.date - b.date);
};

async function obtenerYOrdenarEventos() {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json');
    if (!response.ok) {
      throw new Error('Fallo en la importación de la API');
    }
    eventos = await response.json();
    //---
    sortEventosPorFecha(eventos);    
    setTimeout(despliegaLineaTemporal,intervalo);
    return eventos;
    
  } catch (err) {
    alert(err);
  }
}
obtenerYOrdenarEventos();

const despliegaLineaTemporal = () => {
  const mainContent = document.getElementById('mainContent');
  const laSection = document.createElement("section");
  laSection.setAttribute('id', 'contenedorLineatemporal');
  laSection.setAttribute('class', 'contenedorLineatemporal flex flex-column');
  mainContent.appendChild(laSection);

  for (const item of eventos) {
    laSection.insertAdjacentHTML('beforeend', `
      <article class="flex eventArticle">
        <div>
          <img src="${item.image}" alt="${item.title}" title="${item.title}">
        </div>
        <div>
          <h3>Título: ${item.title} </h3>
          <p class="fechaEvento">Fecha: ${item.date} </p>        
          <p>${item.text}</p>
        </div>        
      </article>
  `);
  }
};

// SCROLL BACK TO TOP

const showOnPx = 100;
const scrollContainer = () => {
  return document.documentElement || document.body;
};

const goBackToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
};

backToTopButton.addEventListener("click", goBackToTop);

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("rightHidden");    
  } else {
    backToTopButton.classList.add("rightHidden");    
  }
});


// -------

document.getElementById('nuevoEventoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nuevoEvento = {
    date: document.getElementById('fecha').value,
    title: document.getElementById('titulo').value,
    image: document.getElementById('imagen').value,
    text: document.getElementById('texto').value,
  };

  eventos.push(nuevoEvento);

  eventos.sort((a, b) => a.date - b.date);

  crearLineaTiempo();

  event.target.reset();

});


// APUNTES (esto es solo para tener funciones a mano. Se borra en la versión definitiva):
// -------
// href="#!"
// eventos.reverse();
// document.querySelector('#contenedorDeTareas>ul').insertAdjacentHTML('beforeend', newLi);
// Librerías css
// https://www.freecodecamp.org/news/back-to-top-button-and-page-progressbar-with-html-css-and-js/
// append, toogle, prepend


