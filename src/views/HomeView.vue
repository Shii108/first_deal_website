<script setup>
import { ArrowRight, BarChart3, Globe, Target, TrendingUp, Users, Zap } from 'lucide-vue-next'
import HomeSections from '@/components/home/HomeSections.vue'
</script>

<template>
  <div class="bg-base">
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[20%] right-[15%] w-[460px] h-[460px] bg-brand-blue/[0.04] rounded-full blur-[110px]"></div>
      <div class="absolute bottom-[20%] left-[10%] w-[360px] h-[360px] bg-brand-green/[0.04] rounded-full blur-[90px]"></div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div class="lg:col-span-6 flex flex-col justify-center">
            <h1 class="text-[clamp(44px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-7">
              <span class="block text-ink">We originate.</span>
              <span class="block gradient-text">We structure.</span>
              <span class="block text-ink">We close.</span>
            </h1>

            <p class="text-lg md:text-xl font-medium text-ink-muted leading-relaxed mb-3 max-w-[520px]">
              Not a broker. Not an agent.<br>A <span class="text-ink font-semibold">deal architect</span> for Nepal.
            </p>
            <p class="text-[16px] text-mist leading-relaxed max-w-[540px] mb-10">
              We identify high-potential projects, structure investment-ready deals, and connect them with the right
              capital from diaspora investors to PE/VC funds.
            </p>

            <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 sm:items-center">
              <router-link class="btn-primary inline-flex w-full items-center justify-center gap-2 text-[15px] no-underline sm:w-auto" to="/process">
                See Our Process
                <ArrowRight :size="16" />
              </router-link>
              <router-link class="btn-ghost inline-flex w-full items-center justify-center gap-2 text-[15px] no-underline sm:w-auto" to="/sectors">
                Explore Sectors
              </router-link>
            </div>
          </div>

          <div class="lg:col-span-6 hidden lg:flex justify-center items-center">
            <div class="relative w-full max-w-[540px] h-[520px]">
              <svg class="w-full h-full" viewBox="0 0 540 520" fill="none" aria-hidden="true">
                <path
                  class="graph-line-animated"
                  style="animation-delay: 0.05s"
                  d="M80,400 Q180,340 270,260"
                  stroke="rgba(42,114,184,0.3)"
                  stroke-width="1.5"
                />
                <path
                  class="graph-line-animated"
                  style="animation-delay: 0.12s"
                  d="M60,260 Q150,260 270,260"
                  stroke="rgba(42,114,184,0.25)"
                  stroke-width="1.5"
                />
                <path
                  class="graph-line-animated"
                  style="animation-delay: 0.2s"
                  d="M80,120 Q200,180 270,260"
                  stroke="rgba(42,114,184,0.3)"
                  stroke-width="1.5"
                />
                <path
                  class="graph-line-animated"
                  style="animation-delay: 0.28s"
                  d="M270,260 Q380,180 460,120"
                  stroke="rgba(76,175,80,0.3)"
                  stroke-width="1.5"
                />
                <path
                  class="graph-line-animated"
                  style="animation-delay: 0.36s"
                  d="M270,260 Q390,260 480,260"
                  stroke="rgba(76,175,80,0.25)"
                  stroke-width="1.5"
                />
                <path
                  class="graph-line-animated"
                  style="animation-delay: 0.44s"
                  d="M270,260 Q380,340 460,400"
                  stroke="rgba(76,175,80,0.3)"
                  stroke-width="1.5"
                />
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
                <circle
                  cx="270"
                  cy="260"
                  r="32"
                  fill="#f0f2f5"
                  stroke="rgba(42,114,184,0.4)"
                  stroke-width="2"
                  filter="url(#nodeGlow)"
                />
                <text
                  x="270"
                  y="255"
                  text-anchor="middle"
                  fill="#3a8ad4"
                  font-family="Plus Jakarta Sans, system-ui, sans-serif"
                  font-weight="800"
                  font-size="9"
                  letter-spacing="1.5"
                >
                  FIRST
                </text>
                <text
                  x="270"
                  y="270"
                  text-anchor="middle"
                  fill="#1a1f2e"
                  font-family="Plus Jakarta Sans, system-ui, sans-serif"
                  font-weight="800"
                  font-size="9"
                  letter-spacing="1.5"
                >
                  DEAL
                </text>
              </svg>

              <div
                class="absolute top-[16%] left-[4%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! cursor-default animate-float"
                style="animation-delay: 0.15s"
              >
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
                class="absolute top-[44%] left-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! cursor-default animate-float-slow"
                style="animation-delay: 0.3s"
              >
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
                class="absolute top-[71%] left-[4%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-blue/20! cursor-default animate-float"
                style="animation-delay: 0.45s"
              >
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

              <div
                class="absolute top-[16%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! cursor-default animate-float-slow"
                style="animation-delay: 0.18s"
              >
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
                class="absolute top-[44%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! cursor-default animate-float"
                style="animation-delay: 0.34s"
              >
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
                class="absolute top-[71%] right-[0%] glass-card rounded-xl! px-3.5 py-2.5 bg-surface-raised/90! border-brand-green/20! cursor-default animate-float-slow"
                style="animation-delay: 0.5s"
              >
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

              <div class="absolute top-[2%] left-[8%] text-[10px] font-bold text-brand-blue/50 uppercase tracking-[0.15em]">
                Projects
              </div>
              <div class="absolute top-[2%] right-[8%] text-[10px] font-bold text-brand-green/50 uppercase tracking-[0.15em]">
                Capital
              </div>
              <div class="absolute top-[57%] left-1/2 -translate-x-1/2 text-center w-[180px]">
                <div class="text-[11px] font-semibold text-mist leading-snug">We connect projects with capital</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <HomeSections />
  </div>
</template>
