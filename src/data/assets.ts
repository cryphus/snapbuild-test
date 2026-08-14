// Пути к графике, перенесённой с исходного лендинга snapbuild.ru.
// Файлы лежат в public/assets/images и отдаются относительно base-пути Vite.

const base = import.meta.env.BASE_URL

export const asset = (name: string) => `${base}assets/images/${name}`

/** 3D-рендеры кейсов — кладутся в public/assets/renders */
export const renderAsset = (name: string) => `${base}assets/renders/${name}`

/** Монохромные логотипы интеграций — public/assets/logos */
export const logoAsset = (name: string) => `${base}assets/logos/${name}`

export const images = {
  logo: asset('582db07d8ccd60da.svg'),
  heroShot: asset('hero-snapbuild-2026-08-07-v2.webp'),

  // Логотипы компаний в бегущей строке
  clientLogos: [
    { src: asset('5cd01de0b6a5e001.svg'), name: 'Клиент' },
    { src: asset('ee341193d7cf46d6.svg'), name: 'Клиент' },
    { src: asset('logo-avito.svg'), name: 'Авито' },
    { src: asset('logo-cian.svg'), name: 'Циан' },
    { src: asset('logo-lenta.svg'), name: 'Лента' },
  ],

  // Блок «Одна платформа — весь маркетинг»
  steps: [
    asset('84a4450b3827bc21.webp'),
    asset('process-flexible-configuration.webp'),
    asset('afe03eb4a67d5dfb.webp'),
  ],

  // Блок «Безопасность без компромиссов»
  security: [
    asset('security-approved-models.webp'),
    asset('security-private-cloud.webp'),
    asset('security-ai-stack.webp'),
  ],

  // Декоративная «пыль» на финальном CTA
  ctaDust: {
    desktop: asset('c3714c375a04149c.webp'),
    tablet: asset('f38670cf14e4b7dd.webp'),
    mobile: asset('a4285c4b0717be2b.webp'),
  },

  faqIcon: asset('c2663c497fb468e1.webp'),
}

// Крупные превью под каждый пункт в секции с табами:
// [таб][пункт] — 5 табов по 4 пункта, как в оригинале.
export const tabMedia: Record<string, string[]> = {
  sites: [
    asset('use-cases-tab1-item1-v2.webp'),
    asset('use-cases-tab1-item2.webp'),
    asset('use-cases-tab1-item3.webp'),
    asset('use-cases-web-04.webp'),
  ],
  images: [
    asset('use-cases-img-01.webp'),
    asset('use-cases-tab2-item2.webp'),
    asset('use-cases-tab2-item3.webp'),
    asset('use-cases-tab2-item4.webp'),
  ],
  video: [
    asset('use-cases-vid-01.webp'),
    asset('use-cases-tab3-item2.webp'),
    asset('use-cases-tab3-item3.webp'),
    asset('use-cases-tab3-item4.webp'),
  ],
  banners: [
    asset('use-cases-tab4-item1.webp'),
    asset('use-cases-tab4-item2.webp'),
    asset('use-cases-tab4-item3.webp'),
    asset('use-cases-tab4-item4.webp'),
  ],
  presentations: [
    asset('use-cases-pres-01.jpg'),
    asset('use-cases-tab5-item2.webp'),
    asset('use-cases-tab5-item3.webp'),
    asset('use-cases-tab5-item4.webp'),
  ],
}
