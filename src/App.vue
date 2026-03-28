<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { Menu, X, ArrowUpRight, Mail, MessageCircle, Linkedin, Facebook } from 'lucide-vue-next'

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
        ? 'py-3 bg-base/80 backdrop-blur-2xl border-b border-border-color shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
        : 'py-5 bg-transparent border-b border-transparent'
    ]">
      <div class="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <router-link class="flex items-center gap-2.5 no-underline group" to="/" @click="closeMobile">
          <img src="/logo.jpeg" alt="First Deal" class="h-9 rounded-md"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <span style="display:none;"
            class="font-sans text-xl font-bold tracking-tight text-ink flex items-center gap-1">
            First<span class="gradient-text">Deal</span>
          </span>
        </router-link>

        <ul class="hidden md:flex gap-1 list-none">
          <li
            v-for="link in [{ to: '/', label: 'Home' }, { to: '/process', label: 'Our Process' }, { to: '/sectors', label: 'Sectors' }, { to: '/investors', label: 'Investors' }]"
            :key="link.to">
            <router-link :to="link.to" :class="[
              'block px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-300',
              route.path === link.to
                ? 'text-ink bg-surface-raised'
                : 'text-mist hover:text-ink hover:bg-surface-raised/50'
            ]">{{ link.label }}</router-link>
          </li>
        </ul>

        <a class="hidden md:inline-flex items-center gap-2 text-[14px] font-semibold text-white btn-primary !py-2.5 !px-5 !rounded-lg"
          href="https://wa.me/9779851088582?text=Hi%20First%20Deal%20Team%2C%20I%27d%20like%20to%20submit%20a%20deal%20for%20review."
          target="_blank" rel="noopener noreferrer">
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
            v-for="link in [{ to: '/', label: 'Home' }, { to: '/process', label: 'Our Process' }, { to: '/sectors', label: 'Sectors' }, { to: '/investors', label: 'Investors' }]"
            :key="link.to" :to="link.to" @click="closeMobile" :class="[
              'block px-4 py-3 rounded-xl text-[15px] font-medium transition-all',
              route.path === link.to
                ? 'text-ink bg-surface-raised'
                : 'text-mist hover:text-ink hover:bg-surface-raised/50'
            ]">{{ link.label }}</router-link>
          <a class="mt-4 text-center text-[14px] font-semibold text-white btn-primary !rounded-xl"
            href="https://wa.me/9779851088582?text=Hi%20First%20Deal%20Team%2C%20I%27d%20like%20to%20submit%20a%20deal%20for%20review."
            target="_blank" rel="noopener noreferrer">
            Submit a Deal
          </a>
        </div>
      </div>
    </nav>

    <!-- PAGE CONTENT — key forces remount, NO slow transition -->
    <main class="flex-grow">
      <router-view v-slot="{ Component, route: viewRoute }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="viewRoute.fullPath" />
        </transition>
      </router-view>
    </main>

    <!-- FOOTER -->
    <footer class="bg-surface border-t border-border-color mt-auto">
      <div class="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <!-- Top Grid -->
        <div class="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 pb-14">
          <!-- Brand -->
          <div class="col-span-2 md:col-span-4">
            <img src="/logo.jpeg" alt="First Deal"
              class="h-9 mb-5 rounded-md opacity-70 hover:opacity-100 transition-opacity"
              onerror="this.style.display='none';" />
            <p class="text-[14px] text-mist leading-relaxed max-w-[320px] mb-6">
              Nepal's first structured deal origination and capital connector firm. We architect investment
              opportunities from discovery to close.
            </p>
            <!-- Social icons inline with brand -->
            <div class="flex items-center gap-2">
              <a href="https://www.linkedin.com/company/90751401/" target="_blank" rel="noopener noreferrer"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-mist hover:text-[#0077b5] hover:bg-[#0077b5]/8 transition-all duration-300">
                <Linkedin :size="16" />
              </a>
              <a href="https://www.facebook.com/firstdealnepal/" target="_blank" rel="noopener noreferrer"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-mist hover:text-[#1877f2] hover:bg-[#1877f2]/8 transition-all duration-300">
                <Facebook :size="16" />
              </a>
              <a href="https://wa.me/9779851088582" target="_blank" rel="noopener noreferrer"
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-mist hover:text-[#25d366] hover:bg-[#25d366]/8 transition-all duration-300">
                <MessageCircle :size="16" />
              </a>
            </div>
          </div>

          <!-- Navigate -->
          <div class="col-span-1 md:col-span-2">
            <div class="text-[11px] font-bold uppercase tracking-[0.15em] text-mist mb-5">Navigate</div>
            <ul class="flex flex-col gap-3">
              <li
                v-for="link in [{ to: '/', label: 'Home' }, { to: '/process', label: 'Our Process' }, { to: '/sectors', label: 'Sectors' }, { to: '/investors', label: 'Investors' }]"
                :key="link.to">
                <router-link :to="link.to"
                  class="text-[14px] text-ink-muted hover:text-brand-blue transition-colors duration-300">{{ link.label
                  }}</router-link>
              </li>
            </ul>
          </div>

          <!-- Sectors -->
          <div class="col-span-1 md:col-span-2">
            <div class="text-[11px] font-bold uppercase tracking-[0.15em] text-mist mb-5">Sectors</div>
            <ul class="flex flex-col gap-3">
              <li v-for="sector in ['Hydropower', 'Hospitality', 'Food & Agri', 'Real Estate']" :key="sector">
                <router-link to="/sectors"
                  class="text-[14px] text-ink-muted hover:text-brand-blue transition-colors duration-300">{{ sector
                  }}</router-link>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="col-span-2 md:col-span-4">
            <div class="text-[11px] font-bold uppercase tracking-[0.15em] text-mist mb-5">Get in touch</div>
            <div class="flex flex-col gap-4 mb-6">
              <a href="mailto:hello@firstdealnepal.com"
                class="group flex items-center gap-3 text-ink no-underline hover:text-brand-blue transition-colors">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue group-hover:bg-brand-blue/15 transition-colors">
                  <Mail :size="14" />
                </div>
                <span class="text-[14px] font-medium">hello@firstdealnepal.com</span>
              </a>
              <a href="https://wa.me/9779851088582" target="_blank" rel="noopener noreferrer"
                class="group flex items-center gap-3 text-ink no-underline hover:text-brand-green transition-colors">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/8 text-brand-green group-hover:bg-brand-green/15 transition-colors">
                  <MessageCircle :size="14" />
                </div>
                <span class="text-[14px] font-medium">+977 9851088582</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-border-color flex flex-col sm:flex-row justify-between items-center gap-4">
          <span class="text-[13px] text-mist">© 2026 First Deal Nepal. All rights reserved.</span>
        </div>
      </div>
    </footer>
  </div>
</template>
