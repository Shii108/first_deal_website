<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { Globe, Landmark, TrendingUp } from 'lucide-vue-next'

const sectionRef = ref(null)
const headerRef = ref(null)
let ctx = null

const investors = [
  {
    num: '01',
    label: 'Diaspora Capital',
    title: 'Nepali Abroad',
    desc: '3M+ Nepalis in the Gulf, US, UK, and Australia. They want home-country exposure but need a trusted entry point.',
    range: '$25K – $250K',
    icon: Globe,
    accentBg: 'bg-brand-blue/10',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-brand-blue-light',
    borderHover: 'group-hover:border-brand-blue/20',
  },
  {
    num: '02',
    label: 'Domestic HNI',
    title: 'Nepal Family Offices',
    desc: 'Business families diversifying beyond trading and real estate. We bring structured alternative assets.',
    range: '$100K – $1M',
    icon: Landmark,
    accentBg: 'bg-brand-green/10',
    accentColor: 'text-brand-green',
    gradient: 'from-brand-green to-brand-green-light',
    borderHover: 'group-hover:border-brand-green/20',
  },
  {
    num: '03',
    label: 'Foreign PE / VC',
    title: 'South Asia Funds',
    desc: "Funds seeking frontier exposure. Nepal's risk-return profile is compelling when properly structured.",
    range: '$500K – $5M',
    icon: TrendingUp,
    accentBg: 'bg-brand-blue/10',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-cyan',
    borderHover: 'group-hover:border-brand-blue/20',
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

    // Investor cards stagger
    if (sectionRef.value) {
      tl.fromTo(sectionRef.value.querySelectorAll('.investor-card'),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
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
      <div class="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[20%] right-[30%] w-[350px] h-[350px] bg-brand-green/[0.03] rounded-full blur-[100px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div ref="headerRef" class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end mb-16">
          <div>
            <div class="section-label mb-6">
              <Globe :size="12" />
              Capital Sources
            </div>
            <h2 class="text-[clamp(28px,3vw,44px)] font-extrabold leading-[1.1] tracking-tight text-ink">
              A <span class="gradient-text-gold">curated</span><br>investor network
            </h2>
          </div>
          <p class="text-[15px] text-mist leading-relaxed">
            We maintain active relationships across six investor categories. Each deal is matched only to investors whose mandate, ticket size, and risk appetite align. This precision is why our deals close.
          </p>
        </div>

        <div ref="sectionRef" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="inv in investors" :key="inv.num"
            :class="[
              'investor-card glass-card p-8 relative overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-400',
              inv.borderHover
            ]">
            <div :class="['absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500', inv.gradient]"></div>
            
            <div class="flex items-center gap-2 mb-6">
              <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', inv.accentBg]">
                <component :is="inv.icon" :size="14" :class="inv.accentColor" />
              </div>
              <span :class="['text-[11px] font-bold tracking-[0.12em] uppercase', inv.accentColor]">{{ inv.num }} — {{ inv.label }}</span>
            </div>

            <div :class="['text-2xl font-bold text-ink mb-4 leading-snug transition-colors', 'group-hover:' + inv.accentColor]">{{ inv.title }}</div>
            <p class="text-[14px] text-mist leading-relaxed mb-8">{{ inv.desc }}</p>

            <div :class="['text-[15px] font-bold text-ink border-t border-border-color pt-5 transition-colors', 'group-hover:' + inv.accentColor]">
              {{ inv.range }}
              <span class="text-[11px] font-semibold text-mist uppercase tracking-wide ml-1">per deal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
