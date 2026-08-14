import { useEffect, useRef } from 'react'

/**
 * Плавное появление блока при прокрутке — как в оригинале
 * (сдвиг снизу 32px, 0.9s, cubic-bezier(0.16, 1, 0.3, 1)).
 *
 * Появление считается по положению блока, а не через IntersectionObserver.
 * Observer пропускает секции при «прыжке» прокрутки: переход по якорю из
 * меню перематывает страницу мимо нескольких блоков, состояние
 * пересечения между кадрами не меняется, колбэк не приходит — и секция
 * остаётся скрытой, хотя пользователь её уже проскроллил. Проверка
 * положения такого пробела не имеет: всё, что выше границы, показывается.
 *
 * Скрытое состояние включается только после пробы: в некоторых окружениях
 * (встроенные webview без композитинга) переход стартует, но навсегда
 * застывает на начальном значении, то есть на opacity 0. Не прошла проба —
 * класс js-reveal не ставится и страница видна целиком без анимации.
 */

/** Доля высоты экрана, ниже которой блок считается показанным. */
const TRIGGER_RATIO = 0.9

const pending = new Set<HTMLElement>()
let listening = false
let frame = 0

function reveal(el: HTMLElement) {
  el.classList.add('is-visible')
  pending.delete(el)
}

function sweep() {
  frame = 0
  const limit = window.innerHeight * TRIGGER_RATIO
  pending.forEach((el) => {
    if (el.getBoundingClientRect().top < limit) reveal(el)
  })
  if (!pending.size) stopListening()
}

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(sweep)
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
}

function stopListening() {
  if (!listening) return
  listening = false
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
}

/** Продвигает ли браузер переходы, а не застывает на начальном значении. */
let probeState: 'pending' | 'ok' | 'failed' = 'pending'
let probeStarted = false
const waiting: ((ok: boolean) => void)[] = []

function probe() {
  if (probeStarted) return
  probeStarted = true

  const el = document.createElement('div')
  el.style.cssText =
    'position:fixed;top:0;left:0;width:1px;height:1px;pointer-events:none;opacity:0;transition:opacity 300ms linear'
  document.body.appendChild(el)

  // читаем стиль, чтобы браузер зафиксировал начальное значение
  void getComputedStyle(el).opacity
  el.style.opacity = '1'

  window.setTimeout(() => {
    const ok = parseFloat(getComputedStyle(el).opacity) > 0
    el.remove()
    probeState = ok ? 'ok' : 'failed'
    if (ok) document.documentElement.classList.add('js-reveal')
    waiting.splice(0).forEach((fn) => fn(ok))
  }, 120)
}

function onProbeReady(fn: (ok: boolean) => void) {
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

    let cancelled = false

    onProbeReady((ok) => {
      if (cancelled || !el.isConnected) return
      if (!ok) {
        el.classList.add('is-visible')
        return
      }
      pending.add(el)
      startListening()
      sweep()
    })

    return () => {
      cancelled = true
      pending.delete(el)
      if (!pending.size) stopListening()
    }
  }, [])

  return ref
}
