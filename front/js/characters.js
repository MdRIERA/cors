let page = 1

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('characters')
  const btnPrev = document.getElementById('prev')
  const btnNext = document.getElementById('next')

  async function loadCharacters() {
    container.innerHTML = 'Cargando...'

    try {
      const res = await fetch(`http://localhost:3000/characters?page=${page}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()

      container.innerHTML = '' // ✅ borra anteriores

      data.results.forEach(character => {
        const div = document.createElement('div')
        div.innerHTML = `
          <h3>${character.name}</h3>
          <img src="${character.image}" width="150">
        `
        container.appendChild(div)
      })

      // ✅ desactivar botones cuando toque
      btnPrev.disabled = page === 1
      btnNext.disabled = !data.info?.next
    } catch (err) {
      console.error(err)
      container.innerHTML = 'Error cargando personajes (mira la consola)'
    }
  }

  btnNext.addEventListener('click', () => {
    page++
    loadCharacters()
  })

  btnPrev.addEventListener('click', () => {
    if (page > 1) page--
    loadCharacters()
  })

  loadCharacters()
})
