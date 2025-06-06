
let prediccionesData = null

async function cargarPredicciones() {
  try {
    const response = await fetch("datos.json")
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo de predicciones")
    }
    prediccionesData = await response.json()
  } catch (error) {
    console.error("Error al cargar predicciones:", error)

    prediccionesData = {
      masculino: {
        1: {
          signo: "Signo Místico",
          descripcion: "Los astros tienen un mensaje especial para ti.",
          imagen: "https://placehold.co/300x300",
        },
      },
      femenino: {
        1: {
          signo: "Signo Místico",
          descripcion: "Los astros tienen un mensaje especial para ti.",
          imagen: "https://placehold.co/300x300",
        },
      },
    }
  }
}


function handleLogin(event) {
  event.preventDefault()
  window.location.href = "dashboard.html"
}


async function calculateAstros(event) {
  event.preventDefault()

  if (!prediccionesData) {
    await cargarPredicciones()
  }

  const nombre = document.getElementById("nombre").value.trim()
  const fechaNac = document.getElementById("fechaNac").value
  const sexo = document.querySelector('input[name="sexo"]:checked').value

  if (!nombre || !fechaNac || !sexo) {
    alert("Por favor, completa todos los campos.")
    return
  }

  const prediccion = obtenerPrediccion(fechaNac, sexo)

  mostrarResultado(nombre, prediccion)
}

function obtenerPrediccion(fechaNac, sexo) {
  const fecha = new Date(fechaNac)
  const mes = fecha.getMonth() + 1 // devuelve 0-11, necesitamos 1-12

  if (prediccionesData && prediccionesData[sexo] && prediccionesData[sexo][mes]) {
    return prediccionesData[sexo][mes]
  }

  return {
    signo: "Signo Místico",
    descripcion:
      "Los astros tienen un mensaje especial para ti. Tu energía única trasciende las clasificaciones tradicionales.",
    imagen: "https://placehold.co/300x300",
  }
}


function mostrarResultado(nombre, prediccion) {
  document.getElementById("resultName").textContent = `${nombre} - ${prediccion.signo}`
  document.getElementById("resultDescription").textContent = prediccion.descripcion
  document.getElementById("resultImage").src = prediccion.imagen
  document.getElementById("resultImage").alt = `Predicción astrológica para ${nombre}`

  const resultSection = document.getElementById("resultSection")
  resultSection.style.display = "block"

  resultSection.scrollIntoView({ behavior: "smooth" })
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    cargarPredicciones()
  }
})
