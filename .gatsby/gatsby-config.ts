const siteTitle = `SIN - SINoALICE`;
const siteUrl = `https://sin-sinoalice.netlify.app/`;
const siteDescription = `Tools for SINoALICE`;
const backgroundColor = `#09090f`;
const themeColor = `#3f51b5`;

const siteMetadata = {
  siteTitle,
  siteTitleAlt: `SIN - SINoALICE`,
  siteHeadline: `SIN - SINoALICE - Tools for SINoALICE from @sofelfam`,
  siteUrl,
  siteDescription,
  siteLanguage: `ja`,
  author: `@sofelfam`, // twitter account id
  basePath: `/`,
  social: {
    twitter: `https://twitter.com/sofelfam`,
    github: `https://github.com/sofelfam`,
  },
};

export default {
  pathPrefix: "/sin-sinoalice-v2",
  siteMetadata,
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-lodash`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyzer`,
      options: {
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        //trackingId: `UA-XXXXXXXXX-X`,
      },
    },
    // gatsby-plugin-manifest should be described before gatsby-plugin-offline
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle,
        description: siteDescription,
        Scope: `/`,
        start_url: `/?utm_source=homescreen`,
        background_color: backgroundColor,
        theme_color: themeColor,
        display: `standalone`,
        icon: `./assets/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
