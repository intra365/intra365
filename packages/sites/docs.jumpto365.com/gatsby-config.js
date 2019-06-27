/**
 * Copyright (c) 2018-present, jumpto365, Inc.
 *
 * @emails jumpto365
 */

'use strict';

module.exports = {
  pathPrefix: `/navigate`,
  siteMetadata: {
    title: 'jumpto365>Navigate',
    siteUrl: 'https://docs.jumpto365.com/navigate',
    rssFeedTitle: 'Navigate',
    rssFeedDescription: 'A JavaScript library for building user interfaces',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    'gatsby-source-react-error-codes',
    'gatsby-transformer-authors-yaml',
    'gatsby-transformer-home-example-code',
    'gatsby-transformer-versions-yaml',
    'gatsby-plugin-netlify',
    'gatsby-plugin-glamor',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#61dafb',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 840,
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-header-custom-ids',
          {
            resolve: 'gatsby-remark-code-repls',
            options: {
              defaultText: '<b>Try it on CodePen</b>',
              directory: `${__dirname}/examples/`,
              externals: [
                `//unpkg.com/react/umd/react.development.js`,
                `//unpkg.com/react-dom/umd/react-dom.development.js`,
              ],
              dependencies: [`react`, `react-dom`],
              redirectTemplate: `${__dirname}/src/templates/codepen-example.js`,
              target: '_blank',
            },
          },
          {
            resolve: 'gatsby-remark-embed-snippet',
            options: {
              classPrefix: 'gatsby-code-',
              directory: `${__dirname}/examples/`,
            },
          },
          'gatsby-remark-use-jsx',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'gatsby-code-',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-41298772-1',
      },
    },
    
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
  ],
};
