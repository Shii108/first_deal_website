<script setup>
import { ArrowRight, BarChart3, Handshake, Search, Shield, Target, Users } from 'lucide-vue-next'

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
    desc: 'Introductions are shaped by thesis fit, ticket size, hold period, and risk appetite so conversations start in the right room.',
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
    desc: 'We stay through term sheets, negotiations, and final execution so the deal closes on terms that hold.',
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
    value: '15+',
    label: 'Live mandates',
    tone: 'text-brand-blue',
  },
  {
    value: '4',
    label: 'Core sectors',
    tone: 'text-brand-green',
  },
  {
    value: '50+',
    label: 'Investor relationships',
    tone: 'text-brand-blue',
  },
  {
    value: '18.4%',
    label: 'Target IRR',
    tone: 'text-brand-green',
  },
]

const readinessDimensions = [
  { label: 'Legal clarity', score: '9.0', fill: '90%' },
  { label: 'Financial model', score: '8.0', fill: '80%' },
  { label: 'Management team', score: '7.5', fill: '75%' },
  { label: 'Exit potential', score: '7.0', fill: '70%' },
  { label: 'Market validation', score: '8.5', fill: '85%' },
  { label: 'ESG compliance', score: '8.0', fill: '80%' },
]

const ctaItems = [
  { title: 'Submit a Project', desc: 'Share your deal for review', icon: BarChart3 },
  { title: 'Register as Investor', desc: 'Access curated opportunities', icon: Users },
  { title: 'Advisory Services', desc: 'Strategic deal structuring', icon: Shield },
]
</script>

<template>
  <div>
    <section class="py-20 md:py-28 px-6 md:px-10 relative border-t border-border-color overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-brand-blue/[0.04] rounded-full blur-[140px]"></div>
      <div class="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-brand-green/[0.04] rounded-full blur-[120px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-[clamp(30px,4vw,50px)] font-extrabold leading-[1.06] tracking-tight text-ink mb-5 max-w-[680px] mx-auto">
            From raw opportunity to<br><span class="gradient-text">closed capital.</span>
          </h2>
          <p class="text-[15px] md:text-[17px] text-mist leading-relaxed max-w-[560px] mx-auto">
            Every deal passes through four rigorous stages before it reaches an investor. No shortcuts, no noise, only
            structured conviction.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-4 mb-16 md:mb-20">
          <div v-for="(stage, i) in pipelineStages" :key="stage.tag" class="pipeline-stage group relative">
            <div
              v-if="i > 0"
              class="hidden xl:block absolute -left-[calc(0.5rem+1px)] top-[44px] w-[calc(1rem+2px)] h-px bg-gradient-to-r"
              :class="stage.connectorGrad"
            ></div>

            <div
              class="glass-card rounded-2xl! p-6 h-full border-transparent! hover:border-brand-blue/20! transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1"
            >
              <div class="absolute top-3 right-4 text-[70px] font-black leading-none select-none pointer-events-none" :class="stage.ghostColor">
                {{ stage.num }}
              </div>

              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 relative z-[1]" :class="stage.iconBg">
                <component :is="stage.icon" :size="20" :class="stage.iconColor" />
              </div>

              <div class="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 relative z-[1]" :class="stage.tagColor">
                {{ stage.tag }}
              </div>

              <div class="text-[18px] md:text-[20px] font-bold text-ink leading-tight mb-3 relative z-[1]">{{ stage.title }}</div>
              <p class="text-[13px] text-mist leading-relaxed relative z-[1]">{{ stage.desc }}</p>

              <div
                class="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                :class="stage.accentBg"
              ></div>
            </div>
          </div>
        </div>

        <div>
          <div class="glass-card rounded-2xl! p-6 md:p-8 border-transparent!">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div v-for="item in slateMetrics" :key="item.label" class="text-center md:text-left">
                <div :class="['text-[clamp(28px,3.5vw,44px)] font-extrabold tabular-nums leading-none tracking-[-0.04em] mb-2', item.tone]">
                  {{ item.value }}
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

    <section class="py-20 md:py-24 px-6 md:px-10 relative overflow-hidden border-t border-border-color">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[18%] left-[14%] w-[320px] h-[320px] bg-brand-green/[0.05] rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[12%] right-[12%] w-[360px] h-[360px] bg-brand-blue/[0.04] rounded-full blur-[120px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="grid grid-cols-1 xl:grid-cols-[0.94fr_1.06fr] gap-8 xl:gap-12 items-center">
          <div>
            <h2 class="text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.05] tracking-tight text-ink mb-5 max-w-[640px]">
              The <span class="gradient-text">Deal Readiness</span> Score
            </h2>

            <p class="text-[15px] md:text-[17px] text-mist leading-relaxed max-w-[580px] mb-8">
              Every opportunity is reviewed across six core dimensions before it reaches our investor network. Only
              deals that meet our internal bar move forward.
            </p>

            <blockquote class="border-l-2 border-brand-blue/40 bg-surface-raised/80 px-5 py-4 max-w-[620px]">
              <p class="text-[14px] md:text-[15px] leading-relaxed text-ink-muted">
                We filter rigorously upfront, so investors spend time on the opportunities that are ready, not the ones
                that still need work.
              </p>
            </blockquote>
          </div>

          <div class="relative rounded-[24px] border border-brand-blue/12 bg-white/88 backdrop-blur-sm px-5 py-6 md:px-7 md:py-7 shadow-[0_22px_60px_rgba(42,114,184,0.08)] overflow-hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(76,175,80,0.06),transparent_34%)]"></div>

            <div class="relative z-[1] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-brand-blue mb-8">
              Sample Deal Readiness Assessment
            </div>

            <div class="relative z-[1] space-y-5">
              <div
                v-for="item in readinessDimensions"
                :key="item.label"
                class="grid grid-cols-[minmax(0,112px)_1fr_34px] md:grid-cols-[minmax(0,162px)_1fr_42px] items-center gap-3 md:gap-4"
              >
                <div class="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  {{ item.label }}
                </div>
                <div class="h-[4px] bg-surface-overlay overflow-hidden rounded-full">
                  <div class="h-full bg-gradient-to-r from-brand-blue-light to-brand-green" :style="{ width: item.fill }"></div>
                </div>
                <div class="text-right text-[16px] font-semibold tabular-nums text-ink">
                  {{ item.score }}
                </div>
              </div>
            </div>

            <div class="relative z-[1] mt-6 pt-5 border-t border-border-color md:mt-7 md:pt-6">
              <div class="flex flex-col items-start gap-3 lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-x-6">
                <div class="text-[10px] leading-none md:text-[11px] font-bold uppercase tracking-[0.18em] md:tracking-[0.2em] text-ink-muted">
                  Overall Score
                </div>
                <div class="self-start whitespace-nowrap text-left text-[26px] sm:text-[30px] md:text-[34px] lg:justify-self-end lg:text-right lg:text-[54px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-ink">
                  <span class="text-brand-green">8.0</span>
                  <span class="text-ink/85"> / 10</span>
                </div>
              </div>
            </div>

            <div class="relative z-[1] mt-4 inline-flex max-w-full items-center gap-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 px-3 py-1.5 text-[9px] sm:text-[10px] md:px-4 md:py-2 md:text-[11px] font-semibold tracking-[0.01em] md:tracking-[0.03em] text-brand-green">
              <span>✓</span>
              <span class="truncate">Cleared for investor review</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden border-t border-border-color">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/[0.05] rounded-full blur-[140px]"></div>

      <div class="max-w-[900px] mx-auto relative z-10 text-center">
        <h2 class="text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-6">
          Ready to make<br><span class="gradient-text">your first deal?</span>
        </h2>
        <p class="text-[17px] text-mist leading-relaxed mb-10 max-w-[500px] mx-auto">
          Whether you have a project seeking capital or capital seeking Nepal's best opportunities, the conversation
          starts here.
        </p>
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <a
            class="btn-primary inline-flex items-center gap-2 text-[15px] no-underline"
            href="https://wa.me/9779851088582?text=Hi%20First%20Deal%20Team%2C%20I%27d%20like%20to%20discuss%20a%20deal."
            target="_blank"
            rel="noopener noreferrer"
          >
            Start a Conversation
            <ArrowRight :size="16" />
          </a>
          <router-link class="btn-ghost inline-flex items-center gap-2 text-[15px] no-underline" to="/investors">
            View Investor Network
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="item in ctaItems"
            :key="item.title"
            class="glass-card rounded-2xl! p-5 flex items-center gap-4 text-left cursor-pointer group hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="w-11 h-11 rounded-xl bg-surface-overlay border border-border-color flex items-center justify-center shrink-0 group-hover:bg-brand-blue/10 group-hover:border-brand-blue/25 transition-all"
            >
              <component :is="item.icon" :size="17" class="text-mist group-hover:text-brand-blue transition-colors" />
            </div>
            <div>
              <div class="text-[15px] font-bold text-ink group-hover:text-brand-blue transition-colors">{{ item.title }}</div>
              <div class="text-[12px] text-mist mt-0.5">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
