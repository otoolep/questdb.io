/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [];

const siteConfig = {
    title: 'QuestDB', // Title for your website.
    tagline: 'Always on time',
    url: 'https://questdb.github.io', // Your website URL
    baseUrl: '/', // Base URL for your project */
    projectName: 'website',
    organizationName: 'questdb',
    // For top-level user or org sites, the organization is still the same.
    // e.g., for the https://JoelMarcey.github.io site, it would be set like...
    //   organizationName: 'JoelMarcey'

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        {doc: "getstarted", label: 'Get Started'},
        {doc: 'docstructure', label: 'Documentation'},
        {blog: true, label: 'Blog'},
    ],

    // If you have users set above, you add it here:
    users,

    /* path to images for header/footer */
    headerIcon: 'img/favicon.png',
    footerIcon: 'img/favicon.png',
    favicon: 'img/favicon.png',

    /* Colors for website */
    colors: {
        primaryColor: '#0d011a',
        secondaryColor: '#130042',
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
    copyright: `Copyright © ${new Date().getFullYear()} QuestDB Limited`,

    //Tracking ID for Google analytics
    gaTrackingId: 'UA-145747842-1',

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'agate',
    },

    cname: 'www.questdb.io',

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/undraw_online.svg',
    twitterImage: 'img/undraw_tweetstorm.svg',

    // For sites with a sizable amount of content, set collapsible to true.
    // Expand/collapse the links and subcategories under categories.
    docsSideNavCollapsible: true,

    // Show documentation's last contributor's name.
    // enableUpdateBy: true,

    // Show documentation's last update time.
    enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...

    repoUrl: 'https://github.com/questdb/questdb',

    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js'
    ],
    stylesheets: [
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,500,600,700|Source+Code+Pro:400,700|Open+Sans:300,400,600,700',
        '/css/code-block-buttons.css'
    ],
    separateCss: [
        '/css/code-block-buttons.css'
    ]

};


module.exports = siteConfig;
