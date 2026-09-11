// ============================================================
// Canais de contato reais. O formulário de orçamento usa o
// WhatsApp abaixo para montar a mensagem.
// ============================================================
const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/5561999556715' },
  { label: 'E-mail', href: 'mailto:andresimoes2002@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/AndreSimoesPeixoto' },
]

// Marca que o JS está ativo (as animações de entrada só valem com .js)
document.documentElement.classList.add('js')

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
  hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu')
})
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
    hamburger.setAttribute('aria-label', 'Abrir menu')
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
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0, rootMargin: '0px 0px -12% 0px' },
  )
  revealEls.forEach((el) => observer.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add('visible'))
}

// Navegação: destaque da seção visível
const navLinks = Array.from(document.querySelectorAll('.nav-links a'))
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean)

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const id = entry.target.id
        navLinks.forEach((link) =>
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`),
        )
      })
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  sections.forEach((section) => spy.observe(section))
}

// Rodapé: ano atual
document.getElementById('footCopy').textContent =
  '© ' + new Date().getFullYear() + ' André Simões Peixoto'
