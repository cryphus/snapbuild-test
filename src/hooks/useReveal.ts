import { useEffect, useRef } from 'react'

/**
 * Появление блока при попадании в вьюпорт.
 *
 * Повторяет механику оригинального лендинга: элемент помечен классом
 * `reveal`, при попадании в зону видимости добавляется `is-visible`.
 *
 * Контент не должен пропасть ни при каком сценарии, поэтому здесь три слоя:
 *  1. скрытое состояние включается только классом `js-reveal` на <html>,
 *     который ставит сам скрипт — без JS страница видна целиком;
 *  2. основной путь — IntersectionObserver;
 *  3. параллельно работает проверка положения на прокрутке.
 *
 * Третий слой обязателен: встречаются окружения (встроенные webview,
 * которые не компонуют кадры), где observer присылает только начальный
 * колбэк на подписку и больше не реагирует на прокрутку. Ориентироваться
 * на факт «колбэк пришёл» нельзя — начальный приходит всегда и ничего не
 * доказывает, поэтому резервная проверка не отключается.
 *
 * Оба пути идемпотентны: кто сработает первым, тот и покажет блок,
 * после чего слушатели снимаются.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    document.documentElement.classList.add('js-reveal')
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let done = false

    const check = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    }

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer?.disconnect()
    }

    const show = () => {
      if (done) return
      done = true
      el.classList.add('is-visible')
      cleanup()
    }

    function onScroll() {
      if (check()) show()
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) show()
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
          )
        : null

    observer?.observe(el)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return cleanup
  }, [])

  return ref
}
