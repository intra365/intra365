/**
 * Copyright (c) 2019-present, jumpto365, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'Intra365', // Title for your website.
  tagline: 'Entrypoints to your digital workplace. Share the same navigation across Office 365 tenants',
  url: 'https://intra365.github.io', // Your website URL
  // For github.io type URLs, you would set the url and baseUrl like:
  url: 'https://intra365.github.io',
  baseUrl: '/intra365/',
  //editUrl: 'https://github.com/intra365/intra365/edit/master/docusaurus/docs/',

  // Used for publishing and more
  projectName: 'intra365 by jumpto365',
  organizationName: 'jumpto365',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'getting-started', label: 'Docs' },
    { href: 'https://jumpto365.zendesk.com/hc/en-us', label: 'Help' },
    {
      href: 'https://pro.jumpto365.com',
      label: 'Admin',
    },
  ],

  /* path to images for header/footer */
  headerIcon: 'img/logo-og.png',
  footerIcon: 'img/logo-og.png',
  favicon: 'img/favicon/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#2B79F6',
    secondaryColor: '#2B79F6',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} jumpto365 Inc.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/logo-og.png',
  twitterImage: 'img/logo-og.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //repoUrl: 'https://github.com/intra365/intra365',

  // algolia: {
  //   apiKey: '3be60f4f8ffc24c75da84857d6323791',
  //   indexName: 'intra365',
  // },

  scrollToTop: true,
  enableUpdateTime: true,
  enableUpdateBy: true,
  docsSideNavCollapsible: true,
};

module.exports = siteConfig;
