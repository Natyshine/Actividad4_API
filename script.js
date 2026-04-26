function buscarMusica() {
  const query = document.getElementById("searchInput").value;

  fetch(`https://itunes.apple.com/search?term=${query}&media=music`)
    .then(response => response.json())
    .then(data => {
      mostrarResultados(data.results);
    })
    .catch(error => console.log(error));
}

function mostrarResultados(canciones) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  canciones.forEach((cancion, index) => {
    const div = document.createElement("div");
    div.classList.add("cancion");

    div.innerHTML = `
      <img src="${cancion.artworkUrl100}">
      <h3>${cancion.trackName}</h3>
      <p>${cancion.artistName}</p>
    `;

    contenedor.appendChild(div);

    // Animación con retraso ✨
    setTimeout(() => {
      div.classList.add("mostrar");
    }, index * 100);
  });
}