// ============================================================
// Preencha seus links de contato aqui. Um botão só aparece
// se o "href" não estiver vazio.
// ============================================================
const socialLinks = [
  { label: 'WhatsApp', href: '' },   // ex: 'https://wa.me/55XXXXXXXXXXX'
  { label: 'E-mail', href: '' },     // ex: 'mailto:seuemail@exemplo.com'
  { label: 'GitHub', href: '' },     // ex: 'https://github.com/seu-usuario'
  { label: 'Instagram', href: '' },  // ex: 'https://instagram.com/seu-usuario'
]

// Formulário de orçamento: monta a mensagem e abre o WhatsApp
const leadForm = document.getElementById('leadForm')
leadForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(leadForm).entries())

  const linhas = [
    `Olá, meu nome é ${data.nome}.`,
    `Contato: ${data.contato}`,
    `Tipo de projeto: ${data.tipoProjeto}`,
    `Orçamento previsto: ${data.orcamentoFaixa}`,
    `Prazo desejado: ${data.prazo}`,
    `Decisão: ${data.decisor}`,
    `Sobre o projeto: ${data.mensagem}`,
  ]
  const mensagem = encodeURIComponent(linhas.join('\n'))

  const whatsapp = socialLinks.find((l) => l.label === 'WhatsApp')
  if (whatsapp && whatsapp.href) {
    const numero = whatsapp.href.replace(/\D/g, '')
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank')
  } else {
    alert(
      'Configure seu número de WhatsApp em socialLinks (script.js) para este botão funcionar.',
    )
  }
})

// Navbar: fundo ao rolar + menu mobile
const header = document.getElementById('header')
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 24)
}
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open')
  hamburger.setAttribute('aria-expanded', String(isOpen))
})
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
  }),
)

// Hero: entrada única ao carregar
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('heroInner').classList.add('mounted')
  }, 80)
})

// Reveal ao rolar
const revealEls = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 },
)
revealEls.forEach((el) => observer.observe(el))

// Links de contato (renderizados a partir do array acima)
const contactLinksEl = document.getElementById('contactLinks')
const activeLinks = socialLinks.filter((l) => l.href)
activeLinks.forEach((link) => {
  const a = document.createElement('a')
  a.href = link.href
  a.textContent = link.label
  if (link.label !== 'E-mail') {
    a.target = '_blank'
    a.rel = 'noreferrer'
  }
  contactLinksEl.appendChild(a)
})
document.querySelector('.contact-empty').style.display = activeLinks.length ? 'none' : 'block'

// Rodapé: ano atual
document.getElementById('footCopy').textContent =
  '© ' + new Date().getFullYear() + ' André Simões Peixoto'
