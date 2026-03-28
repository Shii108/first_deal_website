<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { Send, ClipboardCheck, PackageCheck, Handshake, UserPlus, Lock, FileSearch, CircleCheckBig, ArrowRight } from 'lucide-vue-next'

const activeTab = ref('project')

const switchTab = (which) => {
  activeTab.value = which
}

const projectSteps = [
  { num: '01', title: 'Submit', desc: 'Submit your project details for initial review.', icon: Send },
  { num: '02', title: 'Assess', desc: 'Our team evaluates the project against our due diligence criteria.', icon: ClipboardCheck },
  { num: '03', title: 'Package', desc: 'We architect the deal and prepare investment collateral.', icon: PackageCheck },
  { num: '04', title: 'Introduce', desc: 'Connect with our vetted investor network.', icon: Handshake },
]

const investorSteps = [
  { num: '01', title: 'Register', desc: 'Tell us your investment criteria and mandate.', icon: UserPlus },
  { num: '02', title: 'Access', desc: 'Gain entry to our proprietary deal room.', icon: Lock },
  { num: '03', title: 'Diligence', desc: 'Review comprehensive deal memorandums and models.', icon: FileSearch },
  { num: '04', title: 'Close', desc: 'Execute the transaction with structured terms.', icon: CircleCheckBig },
]

const pipeline = ['Discovery', 'Deal Scoring', 'Packaging', 'Matching', 'Close & Monitor']
const pipelineIcons = [FileSearch, ClipboardCheck, PackageCheck, Handshake, CircleCheckBig]

const stepsRef = ref(null)
</script>

<template>
  <div class="bg-base pt-28">
    <!-- ═══════════════════ HOW TO WORK WITH US ═══════════════════ -->
    <section class="py-20 md:py-24 px-6 md:px-10 border-b border-border-color relative">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-brand-blue/[0.04] rounded-full blur-[120px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div>
          <h2 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-14">
            Two paths.<br>
            <span class="gradient-text">One platform.</span>
          </h2>
        </div>

        <!-- Tab Switcher -->
        <div class="flex gap-2 mb-12 p-1.5 bg-surface-raised rounded-xl w-fit border border-border-color">
          <button @click="switchTab('project')" 
            :class="[
              'px-6 py-2.5 rounded-lg text-[13px] font-bold uppercase tracking-wide transition-all duration-300',
              activeTab === 'project' 
                ? 'bg-brand-blue text-white shadow-[0_0_20px_rgba(42,114,184,0.2)]' 
                : 'text-mist hover:text-ink'
            ]">
            I have a project
          </button>
          <button @click="switchTab('investor')" 
            :class="[
              'px-6 py-2.5 rounded-lg text-[13px] font-bold uppercase tracking-wide transition-all duration-300',
              activeTab === 'investor' 
                ? 'bg-brand-blue text-white shadow-[0_0_20px_rgba(42,114,184,0.2)]' 
                : 'text-mist hover:text-ink'
            ]">
            I am an investor
          </button>
        </div>

        <!-- Steps Grid -->
        <div ref="stepsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="step in (activeTab === 'project' ? projectSteps : investorSteps)" :key="step.num + activeTab"
            class="step-card glass-card p-7 group hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/15 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                <component :is="step.icon" :size="17" class="text-brand-blue" />
              </div>
              <span class="text-[12px] font-bold tracking-[0.15em] uppercase text-mist">Step {{ step.num }}</span>
            </div>
            <div class="text-xl font-bold text-ink mb-3 group-hover:text-brand-blue transition-colors">{{ step.title }}</div>
            <p class="text-[15px] text-mist leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════ PIPELINE ARCHITECTURE ═══════════════════ -->
    <section class="py-20 md:py-24 px-6 md:px-10 relative">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/[0.04] rounded-full blur-[120px]"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="mb-16">
          <h2 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-ink">
            The <span class="gradient-text">First Deal</span><br>
            Architecture Process.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div v-for="(stage, idx) in pipeline" :key="idx"
            class="pipeline-card glass-card p-5 relative group hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center gap-2 mb-6">
              <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', idx % 2 === 0 ? 'bg-brand-blue/10' : 'bg-brand-green/10']">
                <component :is="pipelineIcons[idx]" :size="14" :class="idx % 2 === 0 ? 'text-brand-blue' : 'text-brand-green'" />
              </div>
              <span class="text-[11px] font-bold tracking-[0.12em] text-brand-blue uppercase">Step 0{{ idx + 1 }}</span>
            </div>
            <div class="text-[16px] font-bold text-ink group-hover:text-brand-blue transition-colors leading-snug">{{ stage }}</div>
            
            <div v-if="idx !== 4" class="hidden md:flex absolute -right-[10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-surface-raised border border-border-color rounded-full items-center justify-center z-10 text-mist group-hover:text-brand-blue group-hover:border-brand-blue/25 transition-all">
              <ArrowRight :size="10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
