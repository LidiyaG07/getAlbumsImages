import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'light' as 'light' | 'dark',
  }),
  actions: {
    setTheme(newTheme: 'light' | 'dark') {
      this.mode = newTheme
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      localStorage.setItem('theme', newTheme)
    },

    toggleTheme() {
      const newTheme = this.mode === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },

    initTheme() {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) {
        this.setTheme(saved)
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.setTheme(prefersDark ? 'dark' : 'light')
      }
    },
  },
})
