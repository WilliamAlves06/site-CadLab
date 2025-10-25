// Sidebar toggle functionality
const sidebarToggle = document.getElementById("sidebarToggle")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const closeMobileBtn = document.getElementById("closeMobileBtn")
const sidebar = document.getElementById("sidebar")
const mainWrapper = document.getElementById("mainWrapper")
const mobileOverlay = document.getElementById("mobileOverlay")

// Desktop sidebar toggle
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("hidden")
    mainWrapper.classList.toggle("sidebar-open")
  })
}

// Mobile menu toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.add("mobile-open")
    mobileOverlay.classList.add("active")
  })
}

// Close mobile menu
if (closeMobileBtn) {
  closeMobileBtn.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open")
    mobileOverlay.classList.remove("active")
  })
}

// Close mobile menu when clicking overlay
if (mobileOverlay) {
  mobileOverlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open")
    mobileOverlay.classList.remove("active")
  })
}

// Initialize sidebar state on desktop
if (window.innerWidth >= 768) {
  mainWrapper.classList.add("sidebar-open")
}

// Expandable navigation items
const expandableItems = document.querySelectorAll(".nav-item.expandable")

expandableItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-expandable")
    const subitems = document.getElementById(`${targetId}-subitems`)

    item.classList.toggle("expanded")
    subitems.classList.toggle("expanded")
  })
})

// Tab switching
const tabButtons = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab")

    // Remove active class from all tabs and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked tab and corresponding content
    button.classList.add("active")
    document.getElementById(`${targetTab}-tab`).classList.add("active")
  })
})

// Modal functionality
const modalCadastrar = document.getElementById("modalCadastrar")
const modalAgendar = document.getElementById("modalAgendar")
const btnCadastrar = document.getElementById("btnCadastrar")
const btnAgendar = document.getElementById("btnAgendar")
const btnAgendarApps = document.getElementById("btnAgendarApps")
const closeCadastrar = document.getElementById("closeCadastrar")
const closeAgendar = document.getElementById("closeAgendar")
const cancelCadastrar = document.getElementById("cancelCadastrar")
const cancelAgendar = document.getElementById("cancelAgendar")

// Open modals
if (btnCadastrar) {
  btnCadastrar.addEventListener("click", () => {
    modalCadastrar.classList.add("active")
  })
}

if (btnAgendar) {
  btnAgendar.addEventListener("click", () => {
    modalAgendar.classList.add("active")
  })
}

if (btnAgendarApps) {
  btnAgendarApps.addEventListener("click", () => {
    modalAgendar.classList.add("active")
  })
}

// Close modals
function closeModal(modal) {
  modal.classList.remove("active")
}

if (closeCadastrar) {
  closeCadastrar.addEventListener("click", () => closeModal(modalCadastrar))
}

if (closeAgendar) {
  closeAgendar.addEventListener("click", () => closeModal(modalAgendar))
}

if (cancelCadastrar) {
  cancelCadastrar.addEventListener("click", () => closeModal(modalCadastrar))
}

if (cancelAgendar) {
  cancelAgendar.addEventListener("click", () => closeModal(modalAgendar))
}

// Close modal when clicking outside
modalCadastrar?.addEventListener("click", (e) => {
  if (e.target === modalCadastrar) {
    closeModal(modalCadastrar)
  }
})

modalAgendar?.addEventListener("click", (e) => {
  if (e.target === modalAgendar) {
    closeModal(modalAgendar)
  }
})

// Form submissions
const formCadastrar = document.getElementById("formCadastrar")
const formAgendar = document.getElementById("formAgendar")

function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `
  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.classList.add("hide")
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 300)
  }, 3000)
}

if (formCadastrar) {
  formCadastrar.addEventListener("submit", (e) => {
    e.preventDefault()

    const nomeSala = document.getElementById("nomeSala").value
    const enderecoSala = document.getElementById("enderecoSala").value
    const cidadeSala = document.getElementById("cidadeSala").value
    const capacidadeSala = document.getElementById("capacidadeSala").value

    console.log("[v0] Cadastrando sala:", {
      nome: nomeSala,
      endereco: enderecoSala,
      cidade: cidadeSala,
      capacidade: capacidadeSala,
    })

    // Add new card to the grid
    const salasGrid = document.getElementById("salasGrid")
    const newCard = document.createElement("div")
    newCard.className = "card app-card"
    newCard.setAttribute("data-nome", nomeSala)
    newCard.setAttribute("data-endereco", enderecoSala)
    newCard.setAttribute("data-cidade", cidadeSala)
    newCard.innerHTML = `
      <div class="card-header">
        <div class="app-icon violet">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${nomeSala}</h3>
        <p class="card-description">${enderecoSala}</p>
        <p class="card-description">${cidadeSala}</p>
      </div>
      <div class="card-footer">
        <p class="card-description">${capacidadeSala} pessoas</p>
      </div>
    `
    salasGrid.appendChild(newCard)

    // Add to select in agendar modal
    const salaSelect = document.getElementById("salaSelect")
    const newOption = document.createElement("option")
    newOption.value = nomeSala
    newOption.textContent = `${nomeSala} - ${cidadeSala}`
    salaSelect.appendChild(newOption)

    showSuccessMessage("Sala cadastrada com sucesso!")
    formCadastrar.reset()
    closeModal(modalCadastrar)
  })
}

const agendamentos = []

function renderAgendamentos() {
  const agendamentosList = document.getElementById("agendamentosList")
  const agendamentosListApps = document.getElementById("agendamentosListApps")
  const agendamentosSection = document.getElementById("agendamentosSection")
  const agendamentosSectionApps = document.getElementById("agendamentosSectionApps")

  if (agendamentos.length === 0) {
    agendamentosSection.style.display = "none"
    agendamentosSectionApps.style.display = "none"
    return
  }

  agendamentosSection.style.display = "block"
  agendamentosSectionApps.style.display = "block"

  const agendamentosHTML = agendamentos
    .map(
      (agendamento, index) => `
    <div class="agendamento-card">
      <div class="agendamento-header">
        <div class="agendamento-sala">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          ${agendamento.sala}
        </div>
        <span class="agendamento-status">Confirmado</span>
      </div>
      <div class="agendamento-info">
        <div class="agendamento-detail">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          ${formatarData(agendamento.data)}
        </div>
        <div class="agendamento-detail">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${agendamento.horaInicio} - ${agendamento.horaFim}
        </div>
      </div>
      <div class="agendamento-responsavel">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <strong>Responsável:</strong> ${agendamento.responsavel}
      </div>
    </div>
  `,
    )
    .join("")

  agendamentosList.innerHTML = agendamentosHTML
  agendamentosListApps.innerHTML = agendamentosHTML
}

function formatarData(dataString) {
  const data = new Date(dataString + "T00:00:00")
  const dia = String(data.getDate()).padStart(2, "0")
  const mes = String(data.getMonth() + 1).padStart(2, "0")
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

if (formAgendar) {
  formAgendar.addEventListener("submit", (e) => {
    e.preventDefault()

    const sala = document.getElementById("salaSelect").value
    const data = document.getElementById("dataAgendamento").value
    const horaInicio = document.getElementById("horaInicio").value
    const horaFim = document.getElementById("horaFim").value
    const responsavel = document.getElementById("responsavel").value

    const novoAgendamento = {
      sala,
      data,
      horaInicio,
      horaFim,
      responsavel,
    }

    agendamentos.push(novoAgendamento)
    renderAgendamentos()

    console.log("Agendando sala:", novoAgendamento)

    showSuccessMessage(`Sala "${sala}" agendada para ${formatarData(data)}!`)
    formAgendar.reset()
    closeModal(modalAgendar)
  })
}

// Search functionality
const searchSalas = document.getElementById("searchSalas")

if (searchSalas) {
  searchSalas.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const cards = document.querySelectorAll("#salasGrid .app-card")

    console.log("[v0] Pesquisando por:", searchTerm)

    cards.forEach((card) => {
      const nome = card.getAttribute("data-nome").toLowerCase()
      const endereco = card.getAttribute("data-endereco").toLowerCase()
      const cidade = card.getAttribute("data-cidade").toLowerCase()

      const matches = nome.includes(searchTerm) || endereco.includes(searchTerm) || cidade.includes(searchTerm)

      if (matches) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    sidebar.classList.remove("mobile-open")
    mobileOverlay.classList.remove("active")

    // Re-enable desktop sidebar if it was open
    if (!sidebar.classList.contains("hidden")) {
      mainWrapper.classList.add("sidebar-open")
    }
  } else {
    mainWrapper.classList.remove("sidebar-open")
  }
})
