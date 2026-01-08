const form = document.getElementById('searchForm')
const resultDiv = document.getElementById('result')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value.trim()
  resultDiv.innerHTML = 'Buscando...'

  try {
    const res = await fetch(`http://localhost:3000/character/${name}`)
    const data = await res.json()

    if (data.error) {
      resultDiv.innerHTML = data.error
      return
    }

    resultDiv.innerHTML = `
  <div class="card">
    <h3>${data.name}</h3>
    <img src="${data.image}" alt="${data.name}">
    <p><strong>Estado:</strong> ${data.status}</p>
    <p><strong>Especie:</strong> ${data.species}</p>
    <p><strong>Género:</strong> ${data.gender}</p>
    <p><strong>Origen:</strong> ${data.origin.name}</p>
  </div>
`

  } catch {
    resultDiv.innerHTML = 'Personaje no encontrado'
  }
})
