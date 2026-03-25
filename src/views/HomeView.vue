<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, TrendingUp, Shield, Target, BarChart3, Zap, Users, Globe, Workflow, CheckCircle, Layers, ArrowUpRight, ChevronRight, Mountain, Leaf, Building2 } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const headlineRef = ref(null)
const copyRef = ref(null)
const buttonsRef = ref(null)
const statsRef = ref(null)
const networkRef = ref(null)
const whyRef = ref(null)
const sectorsRef = ref(null)
const processRef = ref(null)
const numbersRef = ref(null)
const ctaRef = ref(null)
const particleCanvas = ref(null)

const counters = ref({ sectors: 0, diligence: 0, coverage: 0 })
const bigNumbers = ref({ deals: 0, sectors: 0, investors: 0, irr: 0 })
let ctx = null
let animFrame = null

// Particle system
function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const c = canvas.getContext('2d')
  let w, h
  const particles = []

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth
    h = canvas.height = canvas.parentElement.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < 45; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? 'rgba(42,114,184,' : 'rgba(76,175,80,',
    })
  }

  function draw() {
    c.clearRect(0, 0, w, h)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          c.beginPath()
          c.moveTo(particles[i].x, particles[i].y)
          c.lineTo(particles[j].x, particles[j].y)
          c.strokeStyle = `rgba(42,114,184,${(1 - dist / 140) * 0.1})`
          c.lineWidth = 0.5
          c.stroke()
        }
      }
    }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
      c.beginPath()
      c.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      c.fillStyle = p.color + '0.25)'
      c.fill()
    }
    animFrame = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(async () => {
  await nextTick()
  initParticles()

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Hero animations (fast)
    if (headlineRef.value) {
      const badge = headlineRef.value.querySelector('.hero-badge')
      if (badge) tl.fromTo(badge, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 })
      const lines = headlineRef.value.querySelectorAll('.hero-line')
      tl.fromTo(lines, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.07 }, "-=0.1")
    }
    if (copyRef.value) {
      tl.fromTo(copyRef.value.children, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "-=0.2")
    }
    if (buttonsRef.value) {
      tl.fromTo(buttonsRef.value.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, stagger: 0.05 }, "-=0.15")
    }
    if (networkRef.value) {
      tl.fromTo(networkRef.value, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.2")
      const nodes = networkRef.value.querySelectorAll('.net-node')
      tl.fromTo(nodes, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.03, ease: 'back.out(1.5)' }, "-=0.2")
      const netLines = networkRef.value.querySelectorAll('.net-line')
      netLines.forEach(line => {
        const len = line.getTotalLength()
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      })
      tl.to(netLines, { strokeDashoffset: 0, duration: 0.5, stagger: 0.02, ease: 'power2.inOut' }, "-=0.15")
    }
    if (statsRef.value) {
      tl.fromTo(statsRef.value.children, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, stagger: 0.04 }, "-=0.2")
      const cObj = { s: 0, d: 0, c: 0 }
      gsap.to(cObj, { s: 4, d: 3, c: 360, duration: 1, ease: 'power2.out', snap: { s: 1, d: 1, c: 1 },
        onUpdate: () => { counters.value = { sectors: cObj.s, diligence: cObj.d, coverage: cObj.c } }
      })
    }

    // Scroll-triggered sections
    if (whyRef.value) {
      gsap.fromTo(whyRef.value.querySelectorAll('.why-card'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: { trigger: whyRef.value, start: 'top 85%' }
        })
    }
    if (sectorsRef.value) {
      gsap.fromTo(sectorsRef.value.querySelectorAll('.sector-preview'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: { trigger: sectorsRef.value, start: 'top 85%' }
        })
    }
    if (processRef.value) {
      gsap.fromTo(processRef.value.querySelectorAll('.process-step'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: { trigger: processRef.value, start: 'top 85%' }
        })
    }
    if (numbersRef.value) {
      gsap.fromTo(numbersRef.value.querySelectorAll('.number-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: {
            trigger: numbersRef.value, start: 'top 85%',
            onEnter: () => {
              const n = { d: 0, s: 0, i: 0, r: 0 }
              gsap.to(n, { d: 15, s: 4, i: 50, r: 18.4, duration: 1.5, ease: 'power2.out',
                snap: { d: 1, s: 1, i: 1 },
                onUpdate: () => { bigNumbers.value = { deals: n.d, sectors: n.s, investors: n.i, irr: n.r } }
              })
            }
          }
        })
    }
    if (ctaRef.value) {
      gsap.fromTo(ctaRef.value.querySelectorAll('.cta-el'),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: { trigger: ctaRef.value, start: 'top 85%' }
        })
    }
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
  if (animFrame) cancelAnimationFrame(animFrame)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="bg-base">
    <!-- ═══════════════════ HERO ═══════════════════ -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;"></canvas>
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-brand-blue/[0.06] rounded-full blur-[140px] animate-float-slow"></div>
      <div class="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-brand-green/[0.05] rounded-full blur-[120px] animate-float" style="animation-delay: 2s;"></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div class="lg:col-span-6 flex flex-col justify-center">
            <div ref="headlineRef">
              <div class="hero-badge inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-brand-blue/15 bg-brand-blue/[0.06]">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                </span>
                <span class="text-[11px] font-bold tracking-[0.12em] uppercase text-ink-muted">Nepal's Deal Intelligence Platform</span>
              </div>
              <h1 class="text-[clamp(44px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-8">
                <div class="hero-line block text-ink">We originate.</div>
                <div class="hero-line block gradient-text">We structure.</div>
                <div class="hero-line block text-ink">We close.</div>
              </h1>
            </div>
            <div ref="copyRef">
              <p class="text-lg md:text-xl font-medium text-ink-muted leading-relaxed mb-3 max-w-[520px]">
                Not a broker. Not an agent.<br>A <span class="text-ink font-semibold">deal architect</span> for Nepal.
              </p>
              <p class="text-[15px] text-mist leading-relaxed max-w-[540px] mb-10">
                We identify high-potential projects, structure investment-ready deals, and connect them with the right capital — from diaspora investors to PE/VC funds.
              </p>
            </div>
            <div ref="buttonsRef" class="flex flex-wrap gap-4 items-center mb-14">
              <router-link class="btn-primary inline-flex items-center gap-2 text-[14px] no-underline" to="/process">
                See Our Process <ArrowRight :size="16" />
              </router-link>
              <router-link class="btn-ghost inline-flex items-center gap-2 text-[14px] no-underline" to="/sectors">
                Explore Sectors
              </router-link>
            </div>
            <div ref="statsRef" class="flex gap-10 md:gap-14 pt-8 border-t border-border-color">
              <div>
                <div class="text-3xl md:text-4xl font-extrabold text-ink mb-1 tabular-nums">{{ counters.sectors }}<span class="text-brand-green">+</span></div>
                <div class="text-[11px] font-bold uppercase tracking-[0.12em] text-mist">Focus Sectors</div>
              </div>
              <div>
                <div class="text-3xl md:text-4xl font-extrabold text-ink mb-1 tabular-nums">{{ counters.diligence }}<span class="text-brand-blue">×</span></div>
                <div class="text-[11px] font-bold uppercase tracking-[0.12em] text-mist">Diligence Steps</div>
              </div>
              <div>
                <div class="text-3xl md:text-4xl font-extrabold text-ink mb-1 tabular-nums">{{ counters.coverage }}<span class="text-brand-green">°</span></div>
                <div class="text-[11px] font-bold uppercase tracking-[0.12em] text-mist">Investor Coverage</div>
              </div>
            </div>
          </div>

          <!-- Network Viz -->
          <div class="lg:col-span-6 hidden lg:flex justify-center items-center" ref="networkRef" style="opacity: 0;">
            <div class="relative w-full max-w-[540px] h-[520px]">
              <svg class="w-full h-full" viewBox="0 0 540 520" fill="none">
                <path class="net-line" d="M80,120 Q200,180 270,260" stroke="rgba(42,114,184,0.3)" stroke-width="1.5" />
                <path class="net-line" d="M60,260 Q150,260 270,260" stroke="rgba(42,114,184,0.25)" stroke-width="1.5" />
                <path class="net-line" d="M80,400 Q180,340 270,260" stroke="rgba(42,114,184,0.3)" stroke-width="1.5" />
                <path class="net-line" d="M270,260 Q380,180 460,120" stroke="rgba(76,175,80,0.3)" stroke-width="1.5" />
                <path class="net-line" d="M270,260 Q390,260 480,260" stroke="rgba(76,175,80,0.25)" stroke-width="1.5" />
                <path class="net-line" d="M270,260 Q380,340 460,400" stroke="rgba(76,175,80,0.3)" stroke-width="1.5" />
                <defs>
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#2a72b8" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#2a72b8" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="270" cy="260" r="50" fill="url(#hubGrad)" class="animate-pulse-glow" />
                <circle cx="270" cy="260" r="32" fill="#111b2e" stroke="rgba(42,114,184,0.4)" stroke-width="2" filter="url(#nodeGlow)" class="net-node" />
                <text x="270" y="255" text-anchor="middle" fill="#3a8ad4" font-family="Inter" font-weight="800" font-size="9" letter-spacing="1.5">FIRST</text>
                <text x="270" y="270" text-anchor="middle" fill="#f1f5f9" font-family="Inter" font-weight="800" font-size="9" letter-spacing="1.5">DEAL</text>
              </svg>
              <!-- Project Nodes -->
              <div class="net-node absolute top-[16%] left-[4%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! hover:border-brand-blue/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center"><Zap :size="12" class="text-brand-blue" /></div>
                  <div><div class="text-[8px] font-bold text-brand-blue uppercase tracking-wider">Project</div><div class="text-[12px] font-bold text-ink">Hydropower</div></div>
                </div>
              </div>
              <div class="net-node absolute top-[44%] left-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! hover:border-brand-blue/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center"><BarChart3 :size="12" class="text-brand-blue" /></div>
                  <div><div class="text-[8px] font-bold text-brand-blue uppercase tracking-wider">Project</div><div class="text-[12px] font-bold text-ink">Agri Export</div></div>
                </div>
              </div>
              <div class="net-node absolute top-[71%] left-[4%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! hover:border-brand-blue/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center"><Target :size="12" class="text-brand-blue" /></div>
                  <div><div class="text-[8px] font-bold text-brand-blue uppercase tracking-wider">Project</div><div class="text-[12px] font-bold text-ink">Eco Resort</div></div>
                </div>
              </div>
              <!-- Investor Nodes -->
              <div class="net-node absolute top-[16%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! hover:border-brand-green/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-green/15 flex items-center justify-center"><Globe :size="12" class="text-brand-green" /></div>
                  <div><div class="text-[8px] font-bold text-brand-green uppercase tracking-wider">Investor</div><div class="text-[12px] font-bold text-ink">Diaspora</div></div>
                </div>
              </div>
              <div class="net-node absolute top-[44%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! hover:border-brand-green/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-green/15 flex items-center justify-center"><Users :size="12" class="text-brand-green" /></div>
                  <div><div class="text-[8px] font-bold text-brand-green uppercase tracking-wider">Investor</div><div class="text-[12px] font-bold text-ink">Family Office</div></div>
                </div>
              </div>
              <div class="net-node absolute top-[71%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! hover:border-brand-green/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-green/15 flex items-center justify-center"><TrendingUp :size="12" class="text-brand-green" /></div>
                  <div><div class="text-[8px] font-bold text-brand-green uppercase tracking-wider">Investor</div><div class="text-[12px] font-bold text-ink">PE / VC Fund</div></div>
                </div>
              </div>
              <div class="absolute top-[2%] left-[8%] text-[10px] font-bold text-brand-blue/50 uppercase tracking-[0.15em]">Projects</div>
              <div class="absolute top-[2%] right-[8%] text-[10px] font-bold text-brand-green/50 uppercase tracking-[0.15em]">Capital</div>
              <div class="absolute top-[58%] left-1/2 -translate-x-1/2 text-center">
                <div class="text-[9px] font-bold text-mist uppercase tracking-[0.15em]">Deal Architecture</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ WHY FIRST DEAL ═══════════════════ -->
    <section ref="whyRef" class="py-24 md:py-32 px-6 md:px-10 relative border-t border-border-color">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-[120px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="section-label mx-auto mb-5">
            <Shield :size="12" />
            Why First Deal
          </div>
          <h2 class="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-4">
            We don't pass leads.<br>
            <span class="gradient-text">We architect deals.</span>
          </h2>
          <p class="text-[15px] text-mist max-w-[560px] mx-auto leading-relaxed">
            Most firms act as middlemen. We go deeper — originating, vetting, structuring, and closing investment opportunities end-to-end.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="(card, i) in [
            { icon: Layers, title: 'End-to-End Structuring', desc: 'From discovery through financial modeling, legal packaging, to investor matching — we handle the entire deal lifecycle, not just introductions.', accent: 'brand-blue' },
            { icon: Shield, title: 'Institutional Diligence', desc: 'Every project passes a 3-stage verification process. Financial viability, legal compliance, and operational assessment before any investor sees it.', accent: 'brand-green' },
            { icon: Target, title: 'Precision Capital Match', desc: 'We don\'t blast deals to a list. Each opportunity is matched to investors whose mandate, ticket size, and risk appetite specifically align.', accent: 'brand-blue' }
          ]" :key="i"
            class="why-card glass-card p-8 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div :class="['absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500', card.accent === 'brand-blue' ? 'from-brand-blue to-brand-blue-light' : 'from-brand-green to-brand-green-light']"></div>
            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-border-color', card.accent === 'brand-blue' ? 'bg-brand-blue/10' : 'bg-brand-green/10']">
              <component :is="card.icon" :size="20" :class="card.accent === 'brand-blue' ? 'text-brand-blue' : 'text-brand-green'" />
            </div>
            <h3 :class="['text-xl font-bold text-ink mb-3 transition-colors', card.accent === 'brand-blue' ? 'group-hover:text-brand-blue' : 'group-hover:text-brand-green']">{{ card.title }}</h3>
            <p class="text-[14px] text-mist leading-relaxed">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ SECTOR SHOWCASE ═══════════════════ -->
    <section ref="sectorsRef" class="py-24 md:py-32 px-6 md:px-10 relative bg-surface/30 border-y border-border-color">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div class="section-label mb-5">
              <Zap :size="12" />
              Investment Sectors
            </div>
            <h2 class="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.1] tracking-tight text-ink">
              Where we see<br><span class="gradient-text">extraordinary returns.</span>
            </h2>
          </div>
          <router-link to="/sectors" class="inline-flex items-center gap-2 text-[13px] font-bold text-brand-blue hover:text-brand-blue-light transition-colors no-underline group">
            View all sectors
            <ArrowRight :size="14" class="group-hover:translate-x-1 transition-transform" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link v-for="(sector, i) in [
            { title: 'Hydropower', stat: '83,000 MW potential', irr: '14–22%', icon: Zap, color: 'brand-blue' },
            { title: 'Hospitality', stat: 'Eco-tourism boom', irr: '12–18%', icon: Mountain, color: 'brand-green' },
            { title: 'Food & Agri', stat: 'Export infrastructure', irr: '16–28%', icon: Leaf, color: 'rust' },
            { title: 'Real Estate', stat: 'Structured debt', irr: '10–16%', icon: Building2, color: 'brand-blue' }
          ]" :key="i"
            to="/sectors"
            class="sector-preview glass-card p-6 group hover:-translate-y-1 transition-all duration-300 no-underline relative overflow-hidden cursor-pointer"
          >
            <div :class="['absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500', sector.color === 'brand-blue' ? 'bg-brand-blue' : sector.color === 'brand-green' ? 'bg-brand-green' : 'bg-rust']"></div>
            <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-5 border border-border-color', sector.color === 'brand-blue' ? 'bg-brand-blue/10' : sector.color === 'brand-green' ? 'bg-brand-green/10' : 'bg-rust/10']">
              <component :is="sector.icon" :size="17" :class="sector.color === 'brand-blue' ? 'text-brand-blue' : sector.color === 'brand-green' ? 'text-brand-green' : 'text-rust'" />
            </div>
            <div class="text-lg font-bold text-ink mb-2 group-hover:text-brand-blue transition-colors">{{ sector.title }}</div>
            <div class="text-[12px] text-mist mb-4">{{ sector.stat }}</div>
            <div class="flex items-center justify-between pt-4 border-t border-border-color">
              <span class="text-[13px] font-bold text-brand-green">{{ sector.irr }} IRR</span>
              <ChevronRight :size="14" class="text-mist group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ HOW IT WORKS ═══════════════════ -->
    <section ref="processRef" class="py-24 md:py-32 px-6 md:px-10 relative">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/[0.03] rounded-full blur-[120px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="section-label mx-auto mb-5">
            <Workflow :size="12" />
            How It Works
          </div>
          <h2 class="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-4">
            From discovery to close.<br><span class="gradient-text">Five precise stages.</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div v-for="(step, i) in [
            { num: '01', title: 'Discover', desc: 'Identify high-potential projects across sectors', icon: Globe },
            { num: '02', title: 'Score', desc: 'Financial, legal & operational due diligence', icon: CheckCircle },
            { num: '03', title: 'Package', desc: 'Structure the deal with investment collateral', icon: Layers },
            { num: '04', title: 'Match', desc: 'Connect with mandate-aligned investors', icon: Target },
            { num: '05', title: 'Close', desc: 'Execute and monitor the transaction', icon: TrendingUp }
          ]" :key="i"
            class="process-step glass-card p-5 text-center group hover:-translate-y-1 transition-all duration-300 relative"
          >
            <div class="text-[10px] font-bold text-brand-blue/50 tracking-[0.15em] uppercase mb-4">Step {{ step.num }}</div>
            <div :class="['w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center border border-border-color group-hover:border-brand-blue/25 transition-colors', i % 2 === 0 ? 'bg-brand-blue/10' : 'bg-brand-green/10']">
              <component :is="step.icon" :size="17" :class="i % 2 === 0 ? 'text-brand-blue' : 'text-brand-green'" />
            </div>
            <div class="text-[15px] font-bold text-ink mb-2 group-hover:text-brand-blue transition-colors">{{ step.title }}</div>
            <div class="text-[12px] text-mist leading-relaxed">{{ step.desc }}</div>
            <!-- Connector arrow -->
            <div v-if="i !== 4" class="hidden md:flex absolute -right-[10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-surface-raised border border-border-color rounded-full items-center justify-center z-10 text-mist">
              <ArrowRight :size="10" />
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/process" class="inline-flex items-center gap-2 text-[13px] font-bold text-brand-blue hover:text-brand-blue-light transition-colors no-underline group">
            Explore our full process
            <ArrowRight :size="14" class="group-hover:translate-x-1 transition-transform" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ BIG NUMBERS ═══════════════════ -->
    <section ref="numbersRef" class="py-24 md:py-32 px-6 md:px-10 relative bg-surface/30 border-y border-border-color overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/[0.04] rounded-full blur-[150px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="text-center mb-5">
          <div class="section-label mx-auto mb-5">
            <BarChart3 :size="12" />
            The Numbers
          </div>
          <h2 class="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.1] tracking-tight text-ink">
            Built for <span class="gradient-text">scale.</span>
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
          <div v-for="(item, i) in [
            { value: bigNumbers.deals + '+', label: 'Deals in Pipeline', sub: 'Active opportunities' },
            { value: bigNumbers.sectors, label: 'Focus Sectors', sub: 'Hydropower to Real Estate' },
            { value: bigNumbers.investors + '+', label: 'Investor Connections', sub: 'Across 6 categories' },
            { value: bigNumbers.irr.toFixed(1) + '%', label: 'Avg Target IRR', sub: 'Projected returns' }
          ]" :key="i"
            class="number-item text-center p-6 glass-card group hover:-translate-y-1 transition-all duration-300"
          >
            <div :class="['text-[clamp(36px,4vw,56px)] font-extrabold tabular-nums mb-2 leading-none', i % 2 === 0 ? 'text-brand-blue' : 'text-brand-green']">
              {{ item.value }}
            </div>
            <div class="text-[14px] font-bold text-ink mb-1">{{ item.label }}</div>
            <div class="text-[11px] text-mist">{{ item.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ CTA ═══════════════════ -->
    <section ref="ctaRef" class="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/[0.04] rounded-full blur-[140px]"></div>

      <div class="max-w-[900px] mx-auto relative z-10 text-center">
        <div class="cta-el section-label mx-auto mb-6">
          <Zap :size="12" />
          Get Started
        </div>
        <h2 class="cta-el text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-6">
          Ready to make<br><span class="gradient-text">your first deal?</span>
        </h2>
        <p class="cta-el text-[16px] text-mist leading-relaxed mb-10 max-w-[500px] mx-auto">
          Whether you have a project seeking capital or capital seeking Nepal's best opportunities — the conversation starts here.
        </p>
        <div class="cta-el flex flex-wrap justify-center gap-4 mb-16">
          <a class="btn-primary inline-flex items-center gap-2 text-[14px] no-underline" href="mailto:hello@firstdealnepal.com">
            Start a Conversation <ArrowRight :size="16" />
          </a>
          <router-link class="btn-ghost inline-flex items-center gap-2 text-[14px] no-underline" to="/investors">
            View Investor Network
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="(item, idx) in [
            { title: 'Submit a Project', desc: 'Share your deal for review', icon: BarChart3 },
            { title: 'Register as Investor', desc: 'Access curated opportunities', icon: Users },
            { title: 'Advisory Services', desc: 'Strategic deal structuring', icon: Shield },
          ]" :key="idx"
            class="cta-el glass-card rounded-2xl! p-5 flex items-center gap-4 text-left cursor-pointer group hover:-translate-y-1 transition-all duration-300"
          >
            <div class="w-11 h-11 rounded-xl bg-surface-overlay border border-border-color flex items-center justify-center shrink-0 group-hover:bg-brand-blue/10 group-hover:border-brand-blue/25 transition-all">
              <component :is="item.icon" :size="17" class="text-mist group-hover:text-brand-blue transition-colors" />
            </div>
            <div>
              <div class="text-[14px] font-bold text-ink group-hover:text-brand-blue transition-colors">{{ item.title }}</div>
              <div class="text-[11px] text-mist mt-0.5">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
