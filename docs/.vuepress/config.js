module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Toaster',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'A free JSON placeholder API',
  dest: 'docs/.vuepress/dist',
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ],

    [
      'meta',
      {
        hid: 'description',
        name: 'description',
        content: 'A free JSON placeholder API'
      }
    ],
    ['meta', { hid: 'og-type', property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        hid: 'og-title',
        property: 'og:title',
        content: 'Toaster'
      }
    ],
    [
      'meta',
      {
        hid: 'og-desc',
        property: 'og:description',
        content: 'A free JSON placeholder API'
      }
    ],
    [
      'meta',
      {
        hid: 'og-image',
        property: 'og:image',
        content: 'https://toaster.dev/toaster.dev-social.jpg'
      }
    ],
    [
      'meta',
      {
        hid: 'og-url',
        property: 'og:url',
        content: 'https://toaster.dev/'
      }
    ],
    [
      'meta',
      {
        hid: 'og-site_name',
        property: 'og:site_name',
        content: 'Toaster'
      }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  markdown: {
    anchor: { permalink: false, permalinkBefore: true, permalinkSymbol: '#' }
  },
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    navbar: false,
    sidebar: false
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
}
