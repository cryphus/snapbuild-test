import { useEffect, useRef } from 'react'

/**
 * Появление блока при попадании в вьюпорт.
 *
 * Повторяет механику оригинального лендинга: элемент помечен классом
 * `reveal`, IntersectionObserver добавляет `is-visible` и отписывается,
 * так что анимация проигрывается один раз.
 *
 * Контент не должен исчезнуть ни при каком сценарии, поэтому здесь две
 * подстраховки:
 *  1. скрытое состояние включается только классом `js-reveal` на <html>,
 *     который ставит сам скрипт — без JS страница видна целиком;
 *  2. если observer почему-то не присылает колбэки (встречается во
 *     встроенных webview, которые не компонуют кадры), включается
 *     резервная проверка положения блока на прокрутке.
 */
const FALLBACK_DELAY = 1600

/** Убедились ли хоть раз, что IntersectionObserver реально работает. */
let observerProven = false

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    document.documentElement.classList.add('js-reveal')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => el.classList.add('is-visible')
    const isShown = () => el.classList.contains('is-visible')

    if (!('IntersectionObserver' in window)) {
      show()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        observerProven = true
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)

    // Резервный путь: включается, только если observer себя не проявил
    let onScroll: (() => void) | null = null
    const detachScroll = () => {
      if (!onScroll) return
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      onScroll = null
    }

    const fallback = window.setTimeout(() => {
      if (observerProven || isShown()) return

      onScroll = () => {
        if (!isInViewport(el)) return
        show()
        detachScroll()
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      onScroll()
    }, FALLBACK_DELAY)

    return () => {
      window.clearTimeout(fallback)
      detachScroll()
      observer.disconnect()
    }
  }, [])

  return ref
}
