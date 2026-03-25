<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { Zap, Mountain, Leaf, Building2 } from 'lucide-vue-next'

const sectionRef = ref(null)
const headerRef = ref(null)
let ctx = null

const sectors = [
  {
    num: '01',
    title: 'Hydropower',
    desc: 'Nepal holds 83,000 MW of hydropower potential — less than 3% developed. We focus on micro and run-of-river projects.',
    range: '$500K–5M',
    irr: '14–22% IRR',
    icon: Zap,
    accentBg: 'bg-brand-blue/10',
    accentBorder: 'group-hover:border-brand-blue/25',
    accentText: 'group-hover:text-brand-blue',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-brand-blue-light',
  },
  {
    num: '02',
    title: 'Hospitality',
    desc: 'Global demand for authentic Himalayan experiences is surging. Connecting boutique eco-lodges & retreats.',
    range: '$200K–2M',
    irr: '12–18% IRR',
    icon: Mountain,
    accentBg: 'bg-brand-green/10',
    accentBorder: 'group-hover:border-brand-green/25',
    accentText: 'group-hover:text-brand-green',
    accentColor: 'text-brand-green',
    gradient: 'from-brand-green to-brand-green-light',
  },
  {
    num: '03',
    title: 'Food & Agri',
    desc: 'Himalayan herbs, tea, and superfoods. Originating deals around agri-processing and export infrastructure.',
    range: '$100K–1.5M',
    irr: '16–28% IRR',
    icon: Leaf,
    accentBg: 'bg-rust/10',
    accentBorder: 'group-hover:border-rust/25',
    accentText: 'group-hover:text-rust',
    accentColor: 'text-rust',
    gradient: 'from-rust to-amber-400',
  },
  {
    num: '04',
    title: 'Real Estate',
    desc: 'Mid-scale commercial developments. Introducing structured debt tools absent from Nepal\'s market today.',
    range: '$300K–3M',
    irr: '10–16% IRR',
    icon: Building2,
    accentBg: 'bg-brand-blue/10',
    accentBorder: 'group-hover:border-brand-blue/25',
    accentText: 'group-hover:text-brand-blue',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-cyan',
  },
]

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Header animation
    if (headerRef.value) {
      tl.fromTo(headerRef.value.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.04 }
      )
    }

    // Sector cards stagger
    if (sectionRef.value) {
      tl.fromTo(sectionRef.value.querySelectorAll('.sector-card'),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.04 },
        "-=0.2"
      )
    }
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div class="bg-base pt-28 min-h-screen">
    <section class="py-20 md:py-28 px-6 md:px-10 relative">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-brand-green/[0.03] rounded-full blur-[100px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10" ref="sectionRef">
        <div ref="headerRef">
          <div class="section-label mb-6">
            <Zap :size="12" />
            Focus Areas
          </div>
          <h2 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-4">
            Four sectors.
          </h2>
          <h2 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight gradient-text mb-16">
            Extraordinary opportunity.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="sector in sectors" :key="sector.num"
            :class="[
              'sector-card glass-card p-7 flex flex-col justify-between min-h-[380px] group cursor-pointer relative overflow-hidden hover:-translate-y-2 transition-all duration-400',
              sector.accentBorder
            ]">
            <div :class="['absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500', sector.gradient]"></div>

            <div>
              <div class="text-[11px] font-bold tracking-[0.15em] uppercase text-mist mb-6">{{ sector.num }} — Sector</div>
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-border-color transition-colors', sector.accentBg]">
                <component :is="sector.icon" :size="20" :class="sector.accentColor" />
              </div>
              <div :class="['text-xl font-bold text-ink mb-3 transition-colors leading-snug', sector.accentText]">{{ sector.title }}</div>
              <p class="text-[13px] text-mist leading-relaxed">{{ sector.desc }}</p>
            </div>

            <div :class="['text-[12px] font-bold text-mist pt-5 border-t border-border-color flex justify-between items-center transition-colors', sector.accentText]">
              <span>{{ sector.range }}</span>
              <span>{{ sector.irr }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
