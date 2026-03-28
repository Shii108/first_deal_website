<script setup>
import { Building2, Globe, Landmark, Leaf, TrendingUp, Users } from 'lucide-vue-next'

const investors = [
  {
    num: '01',
    label: 'Diaspora Capital',
    title: 'Nepali Abroad',
    desc: '3M+ Nepalis in the Gulf, US, UK, and Australia. They want home-country exposure but need a trusted entry point.',
    range: '$25K – $250K',
    unit: 'per deal',
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
    unit: 'per deal',
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
    unit: 'per deal',
    icon: TrendingUp,
    accentBg: 'bg-brand-blue/10',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-cyan',
    borderHover: 'group-hover:border-brand-blue/20',
  },
  {
    num: '04',
    label: 'Impact Capital',
    title: 'DFIs & ESG Funds',
    desc: 'IFC, ADB, DFID, and climate-focused funds. Hydropower, sustainable agriculture, and eco-hospitality align directly with their mandates.',
    range: '$1M – $10M',
    unit: 'per deal',
    icon: Leaf,
    accentBg: 'bg-brand-green/10',
    accentColor: 'text-brand-green',
    gradient: 'from-brand-green to-emerald-400',
    borderHover: 'group-hover:border-brand-green/20',
  },
  {
    num: '05',
    label: 'Syndication',
    title: 'SPV Co-investors',
    desc: 'For deals too large for one investor, we structure special purpose vehicles that allow 5–10 investors to participate at smaller ticket sizes.',
    range: '$50K – $500K',
    unit: 'per investor',
    icon: Users,
    accentBg: 'bg-brand-blue/10',
    accentColor: 'text-brand-blue',
    gradient: 'from-brand-blue to-sky-400',
    borderHover: 'group-hover:border-brand-blue/20',
  },
  {
    num: '06',
    label: 'Strategic',
    title: 'Corporate Investors',
    desc: "Regional corporates seeking strategic stakes in Nepal's infrastructure, food supply chains, or tourism assets as part of broader regional expansion.",
    range: '$500K – $5M',
    unit: 'per deal',
    icon: Building2,
    accentBg: 'bg-brand-green/10',
    accentColor: 'text-brand-green',
    gradient: 'from-brand-green to-lime-400',
    borderHover: 'group-hover:border-brand-green/20',
  },
]
</script>

<template>
  <div class="bg-base pt-20 md:pt-28 min-h-screen">
    <section class="pt-12 pb-16 md:py-28 px-6 md:px-10 relative">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-brand-blue/[0.04] rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[20%] right-[30%] w-[350px] h-[350px] bg-brand-green/[0.04] rounded-full blur-[100px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="mb-16">
          <h2 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-6">
            A <span class="gradient-text">curated</span><br>investor network.
          </h2>
          <p class="text-[15px] md:text-[17px] text-mist leading-relaxed max-w-[620px]">
            We maintain active relationships across six investor categories. Each deal is matched only to investors whose mandate, ticket size, and risk appetite align. This precision is why our deals close.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              <span :class="['text-[12px] font-bold tracking-[0.12em] uppercase', inv.accentColor]">{{ inv.num }} — {{ inv.label }}</span>
            </div>

            <div :class="['text-2xl font-bold text-ink mb-4 leading-snug transition-colors', 'group-hover:' + inv.accentColor]">{{ inv.title }}</div>
            <p class="text-[15px] text-mist leading-relaxed mb-8">{{ inv.desc }}</p>

            <div :class="['text-[15px] font-bold text-ink border-t border-border-color pt-5 transition-colors', 'group-hover:' + inv.accentColor]">
              {{ inv.range }}
              <span class="text-[12px] font-semibold text-mist uppercase tracking-wide ml-1">{{ inv.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ HOW WE WORK WITH INVESTORS ═══════════════════ -->
    <section class="py-20 md:py-28 px-6 md:px-10 relative border-t border-border-color overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/[0.04] rounded-full blur-[140px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-12 xl:gap-20 items-start">
          <div>
            <h2 class="text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.08] tracking-tight text-ink mb-5">
              How we work<br><span class="gradient-text">with investors.</span>
            </h2>
            <p class="text-[15px] md:text-[16px] text-mist leading-relaxed mb-8 max-w-[480px]">
              We don't blast deal sheets to a mailing list. Every introduction is intentional, every data room is prepared, and every conversation starts with alignment.
            </p>
            <a class="btn-primary inline-flex items-center gap-2 text-[15px] no-underline"
              href="https://wa.me/9779851088582?text=Hi%20First%20Deal%20Team%2C%20I%27m%20interested%20in%20joining%20your%20investor%20network." target="_blank" rel="noopener noreferrer">
              Join Investor Network
            </a>
          </div>

          <div class="space-y-5">
            <div v-for="(step, i) in [
              {
                num: '01',
                title: 'Qualify & onboard',
                body: 'We understand your thesis, preferred sectors, ticket size, risk tolerance, and hold period. No deal is presented before this step is complete.',
              },
              {
                num: '02',
                title: 'Precision matching',
                body: 'When a mandate fits your criteria, you receive a structured teaser — not a mass email. Every introduction comes with context, a data room, and a clear thesis.',
              },
              {
                num: '03',
                title: 'Post-close support',
                body: 'We stay involved through execution — helping with governance setup, reporting cadence, and follow-on structuring where needed.',
              },
            ]" :key="i"
              class="glass-card rounded-2xl! p-6 border-transparent! hover:border-brand-green/15! transition-all group"
            >
              <div class="flex items-start gap-5">
                <div class="text-[28px] font-extrabold text-brand-green/20 leading-none shrink-0 pt-0.5">{{ step.num }}</div>
                <div>
                  <div class="text-[17px] md:text-[18px] font-bold text-ink mb-2 group-hover:text-brand-green transition-colors">{{ step.title }}</div>
                  <p class="text-[13px] md:text-[14px] text-mist leading-relaxed">{{ step.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
