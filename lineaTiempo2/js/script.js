'use strict';

async function obtenerYOrdenarEventos() {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json');
    if (!response.ok) {
      throw new Error('Fallo en la importación de la API');
    }
    const eventos = await response.json();
    eventos.sort((a, b) => a.date - b.date);
    return eventos;
  } catch (err) {
    alert(err);
  }
}

let eventos = [];

function crearLineaTiempo() {
  const timeline = document.getElementById('timeline');
  // timeline.innerHTML = '';

  eventos.forEach((evento) => {
    const eventoArticle = document.createElement('article');
    eventoArticle.innerHTML = `
                  <div>
                    <img src="${evento.image}" alt="${evento.title}">
                  </div>
                  <div>
                    <h3>${evento.title}</h3>
                    <h4>${evento.date}</h4>
                    
                    <p>${evento.text}</p>
                  </div>
                
            `;
    timeline.appendChild(eventoArticle);
  });
}

obtenerYOrdenarEventos()
  .then((eventosObtenidos) => {
    eventos = eventosObtenidos;
    crearLineaTiempo();
  })
  .catch((error) => {
    alert(error);
  });

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
