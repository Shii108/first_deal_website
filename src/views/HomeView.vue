<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, TrendingUp, Shield, Target, BarChart3, Zap, Users, Globe, Search, Handshake } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const headlineRef = ref(null)
const copyRef = ref(null)
const buttonsRef = ref(null)
const networkRef = ref(null)
const trustRef = ref(null)
const ctaRef = ref(null)
const particleCanvas = ref(null)

const bigNumbers = ref({ deals: 0, sectors: 0, investors: 0, irr: 0 })
const pipelineStages = [
  {
    num: '01',
    tag: 'Scout',
    title: 'Source & discover',
    desc: 'We tap into operator networks, sector insiders, and local sponsors to find high-potential deals before they hit the open market.',
    icon: Search,
    iconBg: 'bg-brand-blue/10 group-hover:bg-brand-blue/20',
    iconColor: 'text-brand-blue',
    tagColor: 'text-brand-blue',
    ghostColor: 'text-brand-blue/[0.04]',
    accentBg: 'bg-gradient-to-r from-brand-blue/60 to-brand-blue/0',
    connectorGrad: 'from-transparent to-brand-blue/30',
  },
  {
    num: '02',
    tag: 'Structure',
    title: 'Build the thesis',
    desc: 'We stress-test financials, shape the narrative, assemble data rooms, and architect capital structures that survive diligence.',
    icon: BarChart3,
    iconBg: 'bg-brand-blue/10 group-hover:bg-brand-blue/20',
    iconColor: 'text-brand-blue',
    tagColor: 'text-brand-blue',
    ghostColor: 'text-brand-blue/[0.04]',
    accentBg: 'bg-gradient-to-r from-brand-blue/60 to-brand-green/40',
    connectorGrad: 'from-brand-blue/20 to-brand-blue/30',
  },
  {
    num: '03',
    tag: 'Match',
    title: 'Precision placement',
    desc: 'Introductions are shaped by thesis fit, ticket size, hold period, and risk appetite — so conversations start in the right room.',
    icon: Target,
    iconBg: 'bg-brand-green/10 group-hover:bg-brand-green/20',
    iconColor: 'text-brand-green',
    tagColor: 'text-brand-green',
    ghostColor: 'text-brand-green/[0.04]',
    accentBg: 'bg-gradient-to-r from-brand-green/40 to-brand-green/60',
    connectorGrad: 'from-brand-blue/30 to-brand-green/30',
  },
  {
    num: '04',
    tag: 'Close',
    title: 'Capital meets conviction',
    desc: 'We stay through term sheets, negotiations, and final execution — making sure the deal closes on terms that hold.',
    icon: Handshake,
    iconBg: 'bg-brand-green/10 group-hover:bg-brand-green/20',
    iconColor: 'text-brand-green',
    tagColor: 'text-brand-green',
    ghostColor: 'text-brand-green/[0.04]',
    accentBg: 'bg-gradient-to-r from-brand-green/60 to-brand-green/0',
    connectorGrad: 'from-brand-green/20 to-brand-green/30',
  },
]

const slateMetrics = [
  {
    key: 'deals',
    label: 'Live mandates',
    tone: 'text-brand-blue',
  },
  {
    key: 'sectors',
    label: 'Core sectors',
    tone: 'text-brand-green',
  },
  {
    key: 'investors',
    label: 'Investor relationships',
    tone: 'text-brand-blue',
  },
  {
    key: 'irr',
    label: 'Target IRR',
    tone: 'text-brand-green',
  },
]

let ctx = null
let animFrame = null

function getSlateValue(key) {
  if (key === 'deals') return `${bigNumbers.value.deals}+`
  if (key === 'sectors') return `${bigNumbers.value.sectors}`
  if (key === 'investors') return `${bigNumbers.value.investors}+`
  if (key === 'irr') return `${bigNumbers.value.irr.toFixed(1)}%`
  return ''
}

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
      opacity: 0.5,
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
          c.strokeStyle = `rgba(42,114,184,${(1 - dist / 140) * 0.15})`
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
      c.fillStyle = p.color + '0.4)'
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

    // Hero animations
    if (headlineRef.value) {
      const lines = headlineRef.value.querySelectorAll('.hero-line')
      tl.fromTo(lines, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.07 })
    }
    if (copyRef.value) {
      tl.fromTo(copyRef.value.children, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "-=0.2")
    }
    if (buttonsRef.value) {
      tl.fromTo(buttonsRef.value.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, stagger: 0.05 }, "-=0.15")
    }
    if (networkRef.value) {
      tl.fromTo(networkRef.value, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.22 }, "-=0.1")
      const nodes = networkRef.value.querySelectorAll('.net-node')
      tl.fromTo(nodes, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1, stagger: 0.008, ease: 'power2.out' }, "-=0.04")
      const cards = networkRef.value.querySelectorAll('.net-card')
      const netLines = networkRef.value.querySelectorAll('.net-line')
      netLines.forEach(line => {
        const len = line.getTotalLength()
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      })
      const lineGroups = [
        [netLines[1], netLines[4]],
        [netLines[2], netLines[3]],
        [netLines[0], netLines[5]],
      ]
      lineGroups.forEach((group, index) => {
        tl.to(group.filter(Boolean), {
          strokeDashoffset: 0,
          duration: 0.34,
          ease: 'power2.inOut',
        }, index === 0 ? "-=0.08" : "-=0.14")
      })
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -5 : 5,
          x: index < 3 ? 2 : -2,
          duration: 2 + index * 0.12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.12 + index * 0.03,
        })
      })
    }

    // Trust section scroll-triggered
    if (trustRef.value) {
      gsap.fromTo(trustRef.value.querySelectorAll('.trust-el'),
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: {
            trigger: trustRef.value, start: 'top 85%',
            onEnter: () => {
              const n = { d: 0, s: 0, i: 0, r: 0 }
              gsap.to(n, {
                d: 15, s: 4, i: 50, r: 18.4, duration: 1.5, ease: 'power2.out',
                snap: { d: 1, s: 1, i: 1 },
                onUpdate: () => { bigNumbers.value = { deals: n.d, sectors: n.s, investors: n.i, irr: n.r } }
              })
            }
          }
        })
    }

    // CTA scroll-triggered
    if (ctaRef.value) {
      gsap.fromTo(ctaRef.value.querySelectorAll('.cta-el'),
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.06,
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
      <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full pointer-events-none"
        style="z-index: 1;"></canvas>
      <div class="absolute inset-0 grid-pattern" style="z-index: 0;"></div>
      <div class="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-brand-blue/[0.04] rounded-full blur-[120px]">
      </div>
      <div class="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-brand-green/[0.04] rounded-full blur-[100px]">
      </div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div class="lg:col-span-6 flex flex-col justify-center">
            <div ref="headlineRef">
              <h1 class="text-[clamp(44px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-7">
                <div class="hero-line block text-ink">We originate.</div>
                <div class="hero-line block gradient-text">We structure.</div>
                <div class="hero-line block text-ink">We close.</div>
              </h1>
            </div>
            <div ref="copyRef">
              <p class="text-lg md:text-xl font-medium text-ink-muted leading-relaxed mb-3 max-w-[520px]">
                Not a broker. Not an agent.<br>A <span class="text-ink font-semibold">deal architect</span> for Nepal.
              </p>
              <p class="text-[16px] text-mist leading-relaxed max-w-[540px] mb-10">
                We identify high-potential projects, structure investment-ready deals, and connect them with the right
                capital — from diaspora investors to PE/VC funds.
              </p>
            </div>
            <div ref="buttonsRef" class="flex flex-wrap gap-4 items-center">
              <router-link class="btn-primary inline-flex items-center gap-2 text-[15px] no-underline" to="/process">
                See Our Process
                <ArrowRight :size="16" />
              </router-link>
              <router-link class="btn-ghost inline-flex items-center gap-2 text-[15px] no-underline" to="/sectors">
                Explore Sectors
              </router-link>
            </div>
          </div>

          <!-- Network Viz -->
          <div class="lg:col-span-6 hidden lg:flex justify-center items-center" ref="networkRef" style="opacity: 0;">
            <div class="relative w-full max-w-[540px] h-[520px]">
              <svg class="w-full h-full" viewBox="0 0 540 520" fill="none">
                <path class="net-line" d="M80,400 Q180,340 270,260" stroke="rgba(42,114,184,0.3)" stroke-width="1.5" />
                <path class="net-line" d="M60,260 Q150,260 270,260" stroke="rgba(42,114,184,0.25)" stroke-width="1.5" />
                <path class="net-line" d="M80,120 Q200,180 270,260" stroke="rgba(42,114,184,0.3)" stroke-width="1.5" />
                <path class="net-line" d="M270,260 Q380,180 460,120" stroke="rgba(76,175,80,0.3)" stroke-width="1.5" />
                <path class="net-line" d="M270,260 Q390,260 480,260" stroke="rgba(76,175,80,0.25)" stroke-width="1.5" />
                <path class="net-line" d="M270,260 Q380,340 460,400" stroke="rgba(76,175,80,0.3)" stroke-width="1.5" />
                <defs>
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#2a72b8" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#2a72b8" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="270" cy="260" r="50" fill="url(#hubGrad)" class="animate-pulse-glow" />
                <circle cx="270" cy="260" r="32" fill="#f0f2f5" stroke="rgba(42,114,184,0.4)" stroke-width="2"
                  filter="url(#nodeGlow)" class="net-node" />
                <text x="270" y="255" text-anchor="middle" fill="#3a8ad4" font-family="Plus Jakarta Sans"
                  font-weight="800" font-size="9" letter-spacing="1.5">FIRST</text>
                <text x="270" y="270" text-anchor="middle" fill="#1a1f2e" font-family="Plus Jakarta Sans"
                  font-weight="800" font-size="9" letter-spacing="1.5">DEAL</text>
              </svg>
              <!-- Project Nodes -->
              <div
                class="net-node net-card absolute top-[16%] left-[4%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! hover:border-brand-blue/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center">
                    <Zap :size="12" class="text-brand-blue" />
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-brand-blue uppercase tracking-wider">Project</div>
                    <div class="text-[12px] font-bold text-ink">Hydropower</div>
                  </div>
                </div>
              </div>
              <div
                class="net-node net-card absolute top-[44%] left-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! hover:border-brand-blue/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center">
                    <BarChart3 :size="12" class="text-brand-blue" />
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-brand-blue uppercase tracking-wider">Project</div>
                    <div class="text-[12px] font-bold text-ink">Agri Export</div>
                  </div>
                </div>
              </div>
              <div
                class="net-node net-card absolute top-[71%] left-[4%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! hover:border-brand-blue/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-blue/15 flex items-center justify-center">
                    <Target :size="12" class="text-brand-blue" />
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-brand-blue uppercase tracking-wider">Project</div>
                    <div class="text-[12px] font-bold text-ink">Eco Resort</div>
                  </div>
                </div>
              </div>
              <!-- Investor Nodes -->
              <div
                class="net-node net-card absolute top-[16%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! hover:border-brand-green/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-green/15 flex items-center justify-center">
                    <Globe :size="12" class="text-brand-green" />
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-brand-green uppercase tracking-wider">Investor</div>
                    <div class="text-[12px] font-bold text-ink">Diaspora</div>
                  </div>
                </div>
              </div>
              <div
                class="net-node net-card absolute top-[44%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! hover:border-brand-green/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-green/15 flex items-center justify-center">
                    <Users :size="12" class="text-brand-green" />
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-brand-green uppercase tracking-wider">Investor</div>
                    <div class="text-[12px] font-bold text-ink">Family Office</div>
                  </div>
                </div>
              </div>
              <div
                class="net-node net-card absolute top-[71%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! hover:border-brand-green/40! transition-all cursor-default">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-brand-green/15 flex items-center justify-center">
                    <TrendingUp :size="12" class="text-brand-green" />
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-brand-green uppercase tracking-wider">Investor</div>
                    <div class="text-[12px] font-bold text-ink">PE / VC Fund</div>
                  </div>
                </div>
              </div>
              <div
                class="absolute top-[2%] left-[8%] text-[10px] font-bold text-brand-blue/50 uppercase tracking-[0.15em]">
                Projects</div>
              <div
                class="absolute top-[2%] right-[8%] text-[10px] font-bold text-brand-green/50 uppercase tracking-[0.15em]">
                Capital</div>
              <div class="absolute top-[57%] left-1/2 -translate-x-1/2 text-center w-[180px]">
                <div class="text-[11px] font-semibold text-mist leading-snug">We connect projects with capital</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ DEAL PIPELINE ═══════════════════ -->
    <section ref="trustRef" class="py-20 md:py-28 px-6 md:px-10 relative border-t border-border-color overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-brand-blue/[0.04] rounded-full blur-[140px]">
      </div>
      <div
        class="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-brand-green/[0.04] rounded-full blur-[120px]">
      </div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <!-- Section header -->
        <div class="trust-el text-center mb-16 md:mb-20">
          <h2
            class="text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.06] tracking-tight text-ink mb-5 max-w-[680px] mx-auto">
            From raw opportunity to<br><span class="gradient-text">closed capital.</span>
          </h2>
          <p class="text-[15px] md:text-[17px] text-mist leading-relaxed max-w-[560px] mx-auto">
            Every deal passes through four rigorous stages before it reaches an investor. No shortcuts, no noise — only
            structured conviction.
          </p>
        </div>

        <!-- Pipeline stages -->
        <div class="trust-el grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-4 mb-16 md:mb-20">
          <div v-for="(stage, i) in pipelineStages" :key="stage.tag" class="pipeline-stage group relative">
            <!-- Connector line (hidden on first item and mobile) -->
            <div v-if="i > 0"
              class="hidden xl:block absolute -left-[calc(0.5rem+1px)] top-[44px] w-[calc(1rem+2px)] h-px bg-gradient-to-r"
              :class="stage.connectorGrad"></div>

            <div
              class="glass-card rounded-2xl! p-6 h-full border-transparent! hover:border-brand-blue/20! transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
              <!-- Stage number glow -->
              <div class="absolute top-3 right-4 text-[70px] font-black leading-none select-none pointer-events-none"
                :class="stage.ghostColor">
                {{ stage.num }}
              </div>

              <!-- Icon -->
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 relative z-[1]"
                :class="stage.iconBg">
                <component :is="stage.icon" :size="20" :class="stage.iconColor" />
              </div>

              <!-- Tag -->
              <div class="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 relative z-[1]"
                :class="stage.tagColor">{{ stage.tag }}</div>

              <!-- Title -->
              <div class="text-[18px] md:text-[20px] font-bold text-ink leading-tight mb-3 relative z-[1]">{{
                stage.title }}</div>

              <!-- Description -->
              <p class="text-[13px] text-mist leading-relaxed relative z-[1]">{{ stage.desc }}</p>

              <!-- Bottom accent line -->
              <div
                class="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                :class="stage.accentBg"></div>
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div class="trust-el">
          <div class="glass-card rounded-2xl! p-6 md:p-8 border-transparent!">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div v-for="item in slateMetrics" :key="item.key" class="text-center md:text-left">
                <div
                  :class="['text-[clamp(28px,3.5vw,44px)] font-extrabold tabular-nums leading-none tracking-[-0.04em] mb-2', item.tone]">
                  {{ getSlateValue(item.key) }}
                </div>
                <div class="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.14em] text-mist">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ CTA ═══════════════════ -->
    <section ref="ctaRef" class="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-border-color">
      <div class="absolute inset-0 grid-pattern"></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/[0.05] rounded-full blur-[140px]">
      </div>

      <div class="max-w-[900px] mx-auto relative z-10 text-center">
        <h2 class="cta-el text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-6">
          Ready to make<br><span class="gradient-text">your first deal?</span>
        </h2>
        <p class="cta-el text-[17px] text-mist leading-relaxed mb-10 max-w-[500px] mx-auto">
          Whether you have a project seeking capital or capital seeking Nepal's best opportunities — the conversation
          starts here.
        </p>
        <div class="cta-el flex flex-wrap justify-center gap-4 mb-16">
          <a class="btn-primary inline-flex items-center gap-2 text-[15px] no-underline"
            href="https://wa.me/9779851088582?text=Hi%20First%20Deal%20Team%2C%20I%27d%20like%20to%20discuss%20a%20deal." target="_blank" rel="noopener noreferrer">
            Start a Conversation
            <ArrowRight :size="16" />
          </a>
          <router-link class="btn-ghost inline-flex items-center gap-2 text-[15px] no-underline" to="/investors">
            View Investor Network
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="(item, idx) in [
            { title: 'Submit a Project', desc: 'Share your deal for review', icon: BarChart3 },
            { title: 'Register as Investor', desc: 'Access curated opportunities', icon: Users },
            { title: 'Advisory Services', desc: 'Strategic deal structuring', icon: Shield },
          ]" :key="idx"
            class="cta-el glass-card rounded-2xl! p-5 flex items-center gap-4 text-left cursor-pointer group hover:-translate-y-1 transition-all duration-300">
            <div
              class="w-11 h-11 rounded-xl bg-surface-overlay border border-border-color flex items-center justify-center shrink-0 group-hover:bg-brand-blue/10 group-hover:border-brand-blue/25 transition-all">
              <component :is="item.icon" :size="17" class="text-mist group-hover:text-brand-blue transition-colors" />
            </div>
            <div>
              <div class="text-[15px] font-bold text-ink group-hover:text-brand-blue transition-colors">{{ item.title }}
              </div>
              <div class="text-[12px] text-mist mt-0.5">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
