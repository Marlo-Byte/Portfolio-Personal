import { ref, onMounted, onUnmounted } from 'vue'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
  const isDark = ref<boolean>(false)
  const theme = ref<Theme>('light')
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const updateDOM = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setTheme = (newTheme: Theme, save = true) => {
    theme.value = newTheme
    isDark.value = newTheme === 'dark'
    if (save) {
      localStorage.setItem('theme', newTheme)
    }
    updateDOM()
  }

  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark'
    setTheme(newTheme, true)
  }

  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (!savedTheme) {
      setTheme(e.matches ? 'dark' : 'light', false)
    }
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme, false)
    } else {
      setTheme(mediaQuery.matches ? 'dark' : 'light', false)
    }
  }

  onMounted(() => {
    initTheme()
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  })

  return {
    isDark,
    theme,
    toggleTheme,
    setTheme,
    initTheme,
  }
}
