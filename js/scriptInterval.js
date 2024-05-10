'use strict';
let eventos = [];
let count1 = 0;
let laSection;
let muestraEnIntervalos;
const btnMuestraHistorial = document.getElementById('mostrarHistoriaZelda'); 
const mainContent = document.getElementById('mainContent');
const btnShowForm = document.getElementById('showForm');
const btnHideForm = document.getElementById('hideForm');
const nuevoEventoForm = document.getElementById('nuevoEventoZelda');
const veloBlanco = document.getElementById('whiteVeil');
const backToTopButton = document.getElementById('backToTop');
const intervalo = 750;
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
}

const escondeForm = () => {
  btnShowForm.classList.add('manifiestate');
  nuevoEventoForm.classList.remove('manifiestate');
  veloBlanco.classList.remove('manifiestate');
  backToTopButton.classList.remove('rightHidden');
  btnHideForm.classList.add('rightHidden');
}

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


// MUESTRA los <article> on Scroll

let allArticles;
// console.log(allArticles);
window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY + 750;
  // console.log('=================> ' + window.scrollY);

  allArticles.forEach(article => {
      if (scrollPosition >= article.offsetTop) {
        article.classList.add('scaleToOne');
      }
  });
});

// window.addEventListener('load', () => {
//   let scrollPosition = window.scrollY + 750;
//   // console.log('=================> ' + window.scrollY);

//   allArticles.forEach(article => {
//       if (scrollPosition >= article.offsetTop) {
//         article.classList.add('scaleToOne');
//       }
//   });
// });
  



// APUNTES (esto es solo para tener funciones a mano. Se borra en la versión definitiva):
// -------
// https://stackoverflow.com/questions/64546023/run-javascript-function-if-page-load-scroll-and-resize
// https://jonathanjernigan.com/add-a-class-based-on-scroll-position-with-javascript/
// https://gist.github.com/ohiosveryown/93015ccc1f43437db6169dbfb18196fa
// https://timoanttila.com/blog/change-class-with-javascript-based-on-vertical-scroll <<=======
// https://gist.github.com/ohiosveryown/93015ccc1f43437db6169dbfb18196fa
// https://frontendmasters.com/blog/what-you-need-to-know-about-modern-css-spring-2024-edition/
// https://i.blogs.es/337686/060317-zeldawiiu-review/1366_2000.jpg
// js forzar scroll down a la que van surgiendo elementos en la página
// eventos.reverse();
// document.querySelector('#contenedorDeTareas>ul').insertAdjacentHTML('beforeend', newLi);
// Librerías css
// https://www.freecodecamp.org/news/back-to-top-button-and-page-progressbar-with-html-css-and-js/
// append, toogle, prepend


