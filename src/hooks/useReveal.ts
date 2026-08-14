import { useEffect, useRef } from 'react'

/**
 * Плавное появление блока при попадании в вьюпорт — как в оригинале
 * (сдвиг снизу 32px, 0.9s, cubic-bezier(0.16, 1, 0.3, 1)).
 *
 * Эффект требует держать секцию скрытой до срабатывания, поэтому включаем
 * его только там, где он гарантированно доиграет. Перед этим проверяем две
 * вещи, каждая из которых уже ломалась на практике:
 *
 *  1. IntersectionObserver действительно присылает колбэки — иначе секция
 *     никогда не получит команду появиться;
 *  2. браузер действительно продвигает переходы — встречаются окружения
 *     (встроенные webview без композитинга), где transition стартует, но
 *     навсегда застывает на начальном значении, то есть на opacity 0.
 *
 * Не прошла любая из проверок — класс js-reveal не ставится, и страница
 * показывается целиком без анимации. Контент не может остаться невидимым.
 */
const PROBE_TIMEOUT = 400

type Listener = (ok: boolean) => void

let probeState: 'pending' | 'ok' | 'failed' = 'pending'
let probeStarted = false
const waiting: Listener[] = []

function settle(ok: boolean) {
  if (probeState !== 'pending') return
  probeState = ok ? 'ok' : 'failed'
  if (ok) document.documentElement.classList.add('js-reveal')
  waiting.splice(0).forEach((fn) => fn(ok))
}

/** Присылает ли IntersectionObserver колбэки. */
function probeObserver(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!('IntersectionObserver' in window)) {
      resolve(false)
      return
    }

    const el = document.createElement('div')
    el.style.cssText =
      'position:fixed;top:50%;left:0;width:1px;height:1px;pointer-events:none;opacity:0'
    document.body.appendChild(el)

    const finish = (ok: boolean) => {
      window.clearTimeout(timer)
      observer.disconnect()
      el.remove()
      resolve(ok)
    }

    const timer = window.setTimeout(() => finish(false), PROBE_TIMEOUT)
    const observer = new IntersectionObserver(() => finish(true))
    observer.observe(el)
  })
}

/** Продвигает ли браузер переходы, а не застывает на начальном значении. */
function probeTransition(): Promise<boolean> {
  return new Promise((resolve) => {
    const el = document.createElement('div')
    el.style.cssText =
      'position:fixed;top:0;left:0;width:1px;height:1px;pointer-events:none;opacity:0;transition:opacity 300ms linear'
    document.body.appendChild(el)

    // читаем стиль, чтобы браузер зафиксировал начальное значение
    void getComputedStyle(el).opacity
    el.style.opacity = '1'

    window.setTimeout(() => {
      const moved = parseFloat(getComputedStyle(el).opacity) > 0
      el.remove()
      resolve(moved)
    }, 120)
  })
}

function probe() {
  if (probeStarted) return
  probeStarted = true
  Promise.all([probeObserver(), probeTransition()])
    .then(([observerOk, transitionOk]) => settle(observerOk && transitionOk))
    .catch(() => settle(false))
}

function onProbeReady(fn: Listener) {
  if (probeState === 'pending') {
    waiting.push(fn)
    probe()
    return
  }
  fn(probeState === 'ok')
}

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let observer: IntersectionObserver | null = null
    let cancelled = false

    onProbeReady((ok) => {
      if (cancelled || !el.isConnected) return
      if (!ok) {
        el.classList.add('is-visible')
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      )
      observer.observe(el)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [])

  return ref
}
