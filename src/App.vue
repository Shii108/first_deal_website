<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'

const navScrolled = ref(false)
const mobileMenuOpen = ref(false)
const route = useRoute()

const handleScroll = () => {
  navScrolled.value = window.scrollY > 50
}

const toggleMobile = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobile = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="bg-base text-ink font-sans min-h-screen flex flex-col">
    
    <!-- NAV -->
    <nav :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      navScrolled 
        ? 'py-3 bg-base/80 backdrop-blur-2xl border-b border-border-color shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
        : 'py-5 bg-transparent border-b border-transparent'
    ]">
      <div class="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <router-link class="flex items-center gap-2.5 no-underline group" to="/" @click="closeMobile">
          <img src="/logo.jpeg" alt="First Deal" class="h-9 rounded-md" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <span style="display:none;" class="font-sans text-xl font-bold tracking-tight text-ink flex items-center gap-1">
            First<span class="gradient-text">Deal</span>
          </span>
        </router-link>

        <ul class="hidden md:flex gap-1 list-none">
          <li v-for="link in [{to: '/', label: 'Home'}, {to: '/process', label: 'Our Process'}, {to: '/sectors', label: 'Sectors'}, {to: '/investors', label: 'Investors'}]" :key="link.to">
            <router-link 
              :to="link.to"
              :class="[
                'block px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-300',
                route.path === link.to 
                  ? 'text-ink bg-surface-raised' 
                  : 'text-mist hover:text-ink hover:bg-surface-raised/50'
              ]"
            >{{ link.label }}</router-link>
          </li>
        </ul>

        <a class="hidden md:inline-flex items-center gap-2 text-[13px] font-semibold text-white btn-primary !py-2.5 !px-5 !rounded-lg" href="mailto:hello@firstdealnepal.com">
          Submit a Deal
          <ArrowUpRight :size="14" :stroke-width="2.5" />
        </a>

        <button @click="toggleMobile" class="md:hidden p-2 text-ink-muted hover:text-ink transition-colors">
          <Menu v-if="!mobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden bg-surface/95 backdrop-blur-2xl border-t border-border-color mt-2">
        <div class="px-6 py-6 flex flex-col gap-2">
          <router-link 
            v-for="link in [{to: '/', label: 'Home'}, {to: '/process', label: 'Our Process'}, {to: '/sectors', label: 'Sectors'}, {to: '/investors', label: 'Investors'}]" 
            :key="link.to"
            :to="link.to"
            @click="closeMobile"
            :class="[
              'block px-4 py-3 rounded-xl text-[15px] font-medium transition-all',
              route.path === link.to 
                ? 'text-ink bg-surface-raised' 
                : 'text-mist hover:text-ink hover:bg-surface-raised/50'
            ]"
          >{{ link.label }}</router-link>
          <a class="mt-4 text-center text-[14px] font-semibold text-white btn-primary !rounded-xl" href="mailto:hello@firstdealnepal.com">
            Submit a Deal
          </a>
        </div>
      </div>
    </nav>

    <!-- PAGE CONTENT — key forces remount, NO slow transition -->
    <main class="flex-grow">
      <router-view :key="route.fullPath" />
    </main>

    <!-- FOOTER -->
    <footer class="bg-surface border-t border-border-color mt-auto">
      <div class="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12">
          <div class="md:col-span-5">
            <img src="/logo.jpeg" alt="First Deal" class="h-9 mb-5 rounded-md opacity-70 hover:opacity-100 transition-opacity" onerror="this.style.display='none';" />
            <p class="text-[14px] text-mist leading-relaxed max-w-[320px] mb-6">
              Nepal's first structured deal origination and capital connector firm. We architect investment opportunities from discovery to close.
            </p>
            <a href="mailto:hello@firstdealnepal.com" class="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-blue hover:text-brand-blue-light transition-colors">
              hello@firstdealnepal.com
              <ArrowUpRight :size="13" />
            </a>
          </div>
          <div class="md:col-span-3">
            <div class="text-[11px] font-bold uppercase tracking-[0.15em] text-mist mb-5">Navigate</div>
            <ul class="flex flex-col gap-3">
              <li v-for="link in [{to: '/', label: 'Home'}, {to: '/process', label: 'Our Process'}, {to: '/sectors', label: 'Sectors'}, {to: '/investors', label: 'Investors'}]" :key="link.to">
                <router-link :to="link.to" class="text-[14px] text-ink-muted hover:text-ink transition-colors duration-300">{{ link.label }}</router-link>
              </li>
            </ul>
          </div>
          <div class="md:col-span-4">
            <div class="text-[11px] font-bold uppercase tracking-[0.15em] text-mist mb-5">Sectors</div>
            <ul class="flex flex-col gap-3">
              <li v-for="sector in ['Hydropower', 'Hospitality', 'Food & Agriculture', 'Real Estate']" :key="sector">
                <span class="text-[14px] text-ink-muted">{{ sector }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center gap-4">
          <span class="text-[13px] text-mist">© 2026 First Deal Nepal. All rights reserved.</span>
          <span class="text-[12px] text-mist/50">Deal architect for Nepal's future.</span>
        </div>
      </div>
    </footer>
  </div>
</template>