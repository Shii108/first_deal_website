<script setup>
import { Zap, Mountain, Leaf, Building2 } from 'lucide-vue-next'

const sectors = [
  {
    num: '01',
    title: 'Hydropower',
    desc: 'Nepal holds 83,000 MW of hydropower potential — less than 3% developed. We focus on micro and run-of-river projects.',
    range: '500K–5M',
    irr: '14–22%',
    tags: ['Run-of-River', 'Micro Hydro', 'PPA Backed', 'Impact-Eligible'],
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
    range: '200K–2M',
    irr: '12–18%',
    tags: ['Eco-Lodge', 'Wellness', 'Trekking Hubs', 'Boutique'],
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
    range: '100K–1.5M',
    irr: '16–28%',
    tags: ['Superfoods', 'Organic Export', 'Cold Chain', 'F&B Brands'],
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
    range: '300K–3M',
    irr: '10–16%',
    tags: ['Commercial', 'Mixed-Use', 'Structured Debt', 'Co-Investment'],
    icon: Building2,
    accentBg: 'bg-brand-blue/10',
    accentBorder: 'group-hover:border-brand-blue/25',
    accentText: 'group-hover:text-brand-blue',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-cyan',
  },
]
</script>

<template>
  <div class="bg-base pt-24 md:pt-28 min-h-screen">
    <section class="py-16 md:py-28 px-6 md:px-10 relative">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-brand-blue/[0.04] rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-brand-green/[0.04] rounded-full blur-[100px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="mb-16">
          <h2 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-6">
            <span class="gradient-text">Four</span> sectors.<br>
            Extraordinary opportunity.
          </h2>
          <p class="text-[15px] md:text-[17px] text-mist leading-relaxed max-w-[560px]">
            We focus exclusively on sectors where Nepal has a structural advantage and where capital can create outsized returns.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="sector in sectors" :key="sector.num"
            :class="[
              'sector-card glass-card p-7 flex flex-col justify-between min-h-[405px] group cursor-pointer relative overflow-hidden hover:-translate-y-2 transition-all duration-400',
              sector.accentBorder
            ]">
            <div :class="['absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500', sector.gradient]"></div>

            <div class="flex flex-col h-full">
              <div class="text-[12px] font-bold tracking-[0.15em] uppercase text-mist mb-6">{{ sector.num }} — Sector</div>
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-border-color transition-colors', sector.accentBg]">
                <component :is="sector.icon" :size="20" :class="sector.accentColor" />
              </div>
              <div :class="['text-xl font-bold text-ink mb-3 transition-colors leading-snug', sector.accentText]">{{ sector.title }}</div>
              <p class="text-[14px] text-mist leading-relaxed mb-6">{{ sector.desc }}</p>

              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in sector.tags"
                  :key="tag"
                  class="inline-flex items-center border border-border-color px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-mist/90 bg-surface-overlay/35"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="mt-auto"></div>
            </div>

            <div :class="['text-[13px] font-bold text-mist pt-5 border-t border-border-color flex justify-between items-center transition-colors', sector.accentText]">
              <span>USD {{ sector.range }}</span>
              <span>{{ sector.irr }} IRR</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ WHY NEPAL ═══════════════════ -->
    <section class="py-20 md:py-28 px-6 md:px-10 relative border-t border-border-color overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/[0.04] rounded-full blur-[140px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-12 xl:gap-20 items-start">
          <div>
            <h2 class="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.08] tracking-tight text-ink mb-5">
              Why Nepal.<br><span class="gradient-text">Why now.</span>
            </h2>
            <p class="text-[15px] md:text-[16px] text-mist leading-relaxed mb-8 max-w-[480px]">
              Nepal sits at the intersection of untapped natural resources, a fast-growing domestic economy, and a $10B+ annual diaspora remittance flow that is increasingly looking for productive deployment.
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div v-for="stat in [
                { value: '83 GW', label: 'Hydropower potential', color: 'text-brand-blue' },
                { value: '$10B+', label: 'Annual remittance', color: 'text-brand-green' },
                { value: '6.8%', label: 'GDP growth target', color: 'text-brand-blue' },
                { value: '<3%', label: 'Energy developed', color: 'text-brand-green' },
              ]" :key="stat.label">
                <div :class="['text-[clamp(24px,3vw,36px)] font-extrabold tabular-nums leading-none tracking-[-0.03em] mb-1.5', stat.color]">
                  {{ stat.value }}
                </div>
                <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-mist">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-5">
            <div v-for="(point, i) in [
              {
                title: 'Infrastructure gap = opportunity',
                body: 'Nepal needs $20B+ in infrastructure investment over the next decade. Roads, energy, and hospitality are all undersupplied relative to demand.',
              },
              {
                title: 'Diaspora capital is underutilized',
                body: 'Nepali diaspora sends $10B+ home annually — mostly into savings and real estate. Structured products can redirect this into productive assets.',
              },
              {
                title: 'Regulatory tailwinds',
                body: 'Recent policy reforms in energy, foreign investment caps, and repatriation rules are making it significantly easier for international capital to enter.',
              },
            ]" :key="i"
              class="glass-card rounded-2xl! p-6 border-transparent! hover:border-brand-blue/15! transition-all"
            >
              <div class="text-[17px] md:text-[18px] font-bold text-ink mb-2">{{ point.title }}</div>
              <p class="text-[13px] md:text-[14px] text-mist leading-relaxed">{{ point.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
