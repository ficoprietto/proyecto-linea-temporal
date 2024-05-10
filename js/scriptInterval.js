'use strict';
let eventos = [];
let count1 = 0;
let laSection;
let muestraEnIntervalos;
let allArticles;
const btnMuestraHistorial = document.getElementById('mostrarHistoriaZelda'); 
const mainContent = document.getElementById('mainContent');
const btnShowForm = document.getElementById('showForm');
const btnHideForm = document.getElementById('hideForm');
const nuevoEventoForm = document.getElementById('nuevoEventoZelda');
const veloBlanco = document.getElementById('whiteVeil');
const backToTopButton = document.getElementById('backToTop');
const htmlTag = document.querySelector("html");
const intervalo = 400;
const anioActual = new Date().getFullYear();
const sortEventosPorFecha = lista => {
  lista.sort((a, b) => a.date - b.date);
};

const addSection  = () => {
    laSection = document.createElement("section");
    laSection.setAttribute('id', 'contenedorLineatemporal');
    laSection.setAttribute('class', 'contenedorLineatemporal flex flex-column');
    mainContent.appendChild(laSection);
}
addSection();

// -------

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
    console.log('CUANTOS ITEMS en "eventos" ----->> ' + eventos.length);
    return eventos;

  } catch (err) {
    alert(err);
  }
}
obtenerYOrdenarEventos();

// -------

function despliegaLineaTemporalEnIntervalo() {
  btnMuestraHistorial.style.display="none";
  if (count1 < eventos.length) {
    laSection.insertAdjacentHTML('beforeend', `
        <article class="flex cardStyle eventArticle">
            <div>
                <img src="${eventos[count1].image}" alt="${eventos[count1].title}" title="${eventos[count1].title}">
            </div>
            <div>
                <h3>Título: ${eventos[count1].title} </h3>
                <p class="fechaEvento">Fecha: ${eventos[count1].date} </p>        
                <p>${eventos[count1].text}</p>
            </div>          
        </article>
    `);
    allArticles = document.querySelectorAll("article");
    allArticles[count1].classList.add('scaleToOne');
    count1++;      
  } else {
    btnShowForm.classList.add('manifiestate'); 
    btnShowForm.addEventListener('click', muestraForm);
    btnHideForm.addEventListener('click', escondeForm);
    clearInterval(muestraEnIntervalos);   
    count1 = 0;         
  }  
}

function showHistory() {
  muestraEnIntervalos = setInterval(despliegaLineaTemporalEnIntervalo, intervalo);
  return muestraEnIntervalos;
}
btnMuestraHistorial.addEventListener('click', showHistory);

// -------

const muestraForm = () => {
  btnShowForm.classList.remove('manifiestate');
  nuevoEventoForm.classList.add('manifiestate');
  veloBlanco.classList.add('manifiestate');
  backToTopButton.classList.add('rightHidden');
  btnHideForm.classList.remove('rightHidden');
  htmlTag.style.overflow = "hidden";
}

const escondeForm = () => {
  nuevoEventoForm.classList.remove('manifiestate');
  veloBlanco.classList.remove('manifiestate');
  backToTopButton.classList.remove('rightHidden');
  btnHideForm.classList.add('rightHidden');
  btnShowForm.classList.add('manifiestate');
  htmlTag.style.overflow = "auto";
}

// -------

document.getElementById('nuevoEventoZelda').addEventListener('submit', function (event) {
  event.preventDefault();
  const fechaForm = document.getElementById('nuevafecha');
  const alertError = document.getElementById('alertError');

  if (fechaForm.value > 1979 && fechaForm.value <= anioActual) {
    const nuevoEvento = {
      title: document.getElementById('nuevoTitulo').value,
      date: document.getElementById('nuevafecha').value,
      image: document.getElementById('nuevaImagen').value,
      text: document.getElementById('nuevaDescripcion').value,
    };
    alertError.removeAttribute('style');
    eventos.push(nuevoEvento);  
    sortEventosPorFecha(eventos); 
    
    document.getElementById('contenedorLineatemporal');
    laSection.innerHTML = '';
  
    escondeForm();
    showHistory();
    event.target.reset(); // vacía los campos del form
  } else {
    alertError.style.display = 'block';
  }
});

// -------

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