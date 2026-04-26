// Esperar a que cargue TODO el DOM (clave en GitHub Pages)
document.addEventListener("DOMContentLoaded", () => {

  // Elementos del DOM
  const input = document.getElementById("searchInput");
  const btnBuscar = document.getElementById("btnBuscar");
  const contenedor = document.getElementById("resultados");
  const btnBorrar = document.getElementById("btnBorrar");

  // Validación por si algún elemento no existe
  if (!input || !btnBuscar || !contenedor || !btnBorrar) {
    console.error("❌ Error: No se encontraron elementos del DOM");
    return;
  }

  // Ocultar botón borrar al inicio
  btnBorrar.style.display = "none";

  // 🔍 FUNCIÓN PARA BUSCAR CANCIONES
  async function buscarCanciones() {
    const termino = input.value.trim();

    if (termino === "") {
      alert("Escribe algo para buscar 😅");
      return;
    }

    try {
      const respuesta = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&entity=musicTrack&limit=20`
      );

      if (!respuesta.ok) {
        throw new Error("Error en la API");
      }

      const data = await respuesta.json();

      mostrarResultados(data.results);
    } catch (error) {
      console.error("❌ Error:", error);
      contenedor.innerHTML = "<p>Error al buscar 😢</p>";
    }
  }

  // 🎵 MOSTRAR RESULTADOS
  function mostrarResultados(canciones) {
    contenedor.innerHTML = "";

    const termino = input.value.toLowerCase();

    const filtradas = canciones.filter(cancion =>
      cancion.artistName.toLowerCase().includes(termino) ||
      cancion.trackName.toLowerCase().includes(termino)
    );

    if (filtradas.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron resultados 😢</p>";
      btnBorrar.style.display = "inline-block";
      return;
    }

    filtradas.forEach(cancion => {
      const div = document.createElement("div");
      div.classList.add("cancion");

      div.innerHTML = `
        <img src="${cancion.artworkUrl100}" alt="cover">
        <h3>${cancion.trackName}</h3>
        <p>${cancion.artistName}</p>
      `;

      contenedor.appendChild(div);

      // Animación
      setTimeout(() => {
        div.classList.add("mostrar");
      }, 100);
    });

    btnBorrar.style.display = "inline-block";
  }

  // 🗑️ BORRAR RESULTADOS
  btnBorrar.addEventListener("click", () => {
    contenedor.innerHTML = "";
    input.value = "";
    btnBorrar.style.display = "none";
  });

  // 🔘 BOTÓN BUSCAR
  btnBuscar.addEventListener("click", buscarCanciones);

  // ⌨️ BUSCAR CON ENTER
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      buscarCanciones();
    }
  });

});