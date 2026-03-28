<script setup>
import { computed, reactive, ref } from 'vue'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? ''

const form = reactive({
  fullName: '',
  email: '',
  organization: '',
  role: '',
  botcheck: false,
})
const roles = ['Investor', 'Project Owner', 'Advisor', 'Development Organization', 'Embassy / Trade Office']
const stats = [
  { value: '14+', label: 'Active Projects' },
  { value: '18%', label: 'Avg. IRR' },
  { value: '2yr', label: 'Payback Start' },
]
const notes = [
  'Regulatory update: new FDI guidelines for energy.',
  "Market sizing: Nepal's power export potential to India.",
  'Featured deal snapshot: 4.5MW run-of-river, Syangja district.',
]

const isSubmitting = ref(false)
const hasSubmitted = ref(false)
const submitState = ref('idle')
const submitMessage = ref('')
const submitLabel = computed(() => {
  if (isSubmitting.value) return 'Sending request...'
  if (hasSubmitted.value) return 'Subscribed'
  return 'Subscribe to Deal Brief'
})

const requestSubscription = async () => {
  if (hasSubmitted.value) return

  if (!WEB3FORMS_ACCESS_KEY) {
    submitState.value = 'error'
    submitMessage.value = 'The form access key is missing. Add the Web3Forms key and try again.'
    return
  }

  isSubmitting.value = true
  submitState.value = 'idle'
  submitMessage.value = ''

  const payload = new FormData()
  payload.append('access_key', WEB3FORMS_ACCESS_KEY)
  payload.append('subject', 'Nepal Deal Brief subscription request')
  payload.append('from_name', 'First Deal Nepal')
  payload.append('full_name', form.fullName.trim())
  payload.append('email', form.email.trim())
  payload.append('organization', form.organization.trim() || 'N/A')
  payload.append('role', form.role)
  payload.append('interest', 'Nepal Deal Brief')
  payload.append('page', window.location.href)
  payload.append('botcheck', form.botcheck ? 'true' : '')

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: payload,
      headers: {
        Accept: 'application/json',
      },
    })

    const result = await response.json()
    const responseMessage = result?.message || result?.body?.message || 'Unable to send right now.'

    if (!response.ok || result?.success === false) {
      throw new Error(responseMessage)
    }

    hasSubmitted.value = true
    submitState.value = 'success'
    submitMessage.value = 'Request received and sent to the First Deal team inbox.'
    form.botcheck = false
  } catch (error) {
    submitState.value = 'error'
    submitMessage.value = error instanceof Error ? error.message : 'Unable to send right now. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-base pt-24 md:pt-28 min-h-screen">
    <section class="py-16 md:py-28 px-6 md:px-10 relative overflow-hidden">
      <div class="absolute inset-0 grid-pattern"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="mb-14">
          <h1 class="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-ink mb-5 max-w-[700px]">
            The <span class="gradient-text">Nepal Deal Brief</span>.<br>
            A monthly market intelligence note.
          </h1>
          <p class="text-[15px] md:text-[17px] text-mist leading-relaxed max-w-[620px]">
            A curated sector brief for investors, advisors, and institutions tracking Nepal's private market.
          </p>
        </div>

        <!-- Two columns — same height -->
        <div class="db-grid">
          <!-- Brief Card -->
          <div class="glass-card rounded-[22px]! overflow-hidden border-transparent! shadow-[0_16px_50px_rgba(27,40,66,0.07)] flex flex-col">
            <div class="bg-ink px-5 py-4 flex items-center justify-between">
              <span class="text-[12px] font-medium text-white">Nepal Deal Brief</span>
              <span class="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-blue-light">Issue No. 001 · Q2 2026</span>
            </div>
            <div class="bg-surface px-5 py-5 flex-1 flex flex-col">
              <p class="text-[9px] font-bold uppercase tracking-[0.2em] text-mist mb-3">April 2026 · Hydropower Focus Edition</p>
              <div class="h-px bg-border-color mb-4"></div>
              <h2 class="text-[clamp(17px,2vw,22px)] font-extrabold tracking-tight leading-[1.18] text-ink mb-3">
                Run-of-river opportunities in Gandaki Province: a structured capital gap
              </h2>
              <p class="text-[13px] leading-relaxed text-ink-muted mb-5">
                This edition profiles mid-scale run-of-river projects in Gandaki Province —
                active licenses, capital gaps, and where capital can move first.
              </p>
              <div class="grid grid-cols-3 gap-3 mb-5">
                <div v-for="s in stats" :key="s.label" class="border-l border-border-color pl-3 first:pl-0 first:border-l-0">
                  <div class="text-[clamp(18px,2vw,24px)] font-extrabold tracking-[-0.04em] text-ink">{{ s.value }}</div>
                  <div class="text-[8px] font-bold uppercase tracking-[0.18em] text-mist">{{ s.label }}</div>
                </div>
              </div>
              <div class="mt-auto space-y-1.5">
                <div v-for="n in notes" :key="n" class="text-[12px] text-ink-muted leading-relaxed">
                  <span class="text-brand-blue font-bold mr-1.5">+</span>{{ n }}
                </div>
              </div>
            </div>
          </div>

          <!-- Subscribe Form -->
          <div class="db-panel flex flex-col">
            <h2 class="text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink mb-3">
              Receive the Nepal Deal Brief — free, monthly.
            </h2>
            <p class="text-[14px] leading-[1.65] text-mist mb-5">
              Each issue covers one sector in depth: deal pipeline, regulatory landscape, market data,
              and one featured project. For investors, advisors, embassies, and institutions.
            </p>

            <form class="flex flex-col gap-2.5 mt-auto" @submit.prevent="requestSubscription">
              <input
                v-model="form.botcheck"
                type="checkbox"
                name="botcheck"
                class="hidden"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
              >
              <div class="grid grid-cols-2 gap-2.5">
                <input v-model="form.fullName" type="text" required placeholder="Full name" class="db-input">
                <input v-model="form.email" type="email" required placeholder="Email address" class="db-input">
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <input v-model="form.organization" type="text" placeholder="Organization (optional)" class="db-input">
                <select v-model="form.role" required class="db-input db-select">
                  <option disabled value="">I am a... (Investor / Project Owner / Advisor)</option>
                  <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                </select>
              </div>
              <button
                type="submit"
                :disabled="isSubmitting || hasSubmitted"
                class="db-submit w-full btn-primary !rounded-xl !py-3 text-[14px] font-semibold flex items-center justify-center gap-2 mt-1"
              >
                {{ submitLabel }}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p
              v-if="submitMessage"
              :class="[
                'db-feedback mt-3',
                submitState === 'error' ? 'db-feedback--error' : 'db-feedback--success'
              ]"
            >
              {{ submitMessage }}
            </p>

            <p class="text-[12px] text-mist mt-3">
              Each request is sent directly to the First Deal team inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.db-grid {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
}

.db-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 1.375rem;
  padding: 2rem;
  box-shadow: 0 16px 48px rgba(27, 40, 66, 0.06);
}

.db-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  font-family: inherit;
  font-size: 13.5px;
  color: var(--color-ink);
  background: var(--color-base);
  border: 1px solid var(--color-border-color);
  border-radius: 0.6rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.db-input::placeholder { color: var(--color-mist); }
.db-input:focus {
  border-color: rgba(42, 114, 184, 0.35);
  box-shadow: 0 0 0 3px rgba(42, 114, 184, 0.06);
}

.db-select {
  cursor: pointer;
  color: var(--color-mist);
  padding-right: 2.2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5L6 7.5L9.5 4.5' stroke='%237c8a9e' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  -webkit-appearance: none;
  appearance: none;
}
.db-select:has(option:checked:not([disabled])) { color: var(--color-ink); }

.db-submit:disabled {
  cursor: not-allowed;
  opacity: 0.78;
  transform: none;
  box-shadow: 0 2px 16px rgba(42, 114, 184, 0.12);
}

.db-feedback {
  border-radius: 0.85rem;
  border: 1px solid rgba(42, 114, 184, 0.12);
  padding: 0.9rem 1rem;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--color-ink);
  background: rgba(42, 114, 184, 0.04);
}

.db-feedback--success {
  color: var(--color-ink);
  border-color: rgba(42, 114, 184, 0.14);
  background: linear-gradient(135deg, rgba(42, 114, 184, 0.05), rgba(76, 175, 80, 0.04));
}

.db-feedback--error {
  color: #c2410c;
  background: rgba(232, 151, 42, 0.08);
  border-color: rgba(232, 151, 42, 0.18);
}

@media (max-width: 960px) {
  .db-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .db-grid .grid-cols-2 { grid-template-columns: 1fr; }
  .db-panel { padding: 1.5rem; }
}
</style>
