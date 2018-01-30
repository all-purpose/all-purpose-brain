// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  types: [
    {
      name: 'home',
      label: 'Home'
    },
    {
      name: 'article-page',
      label: 'Knowledgebase Homepage'
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ],
  park: [
    {
      title: 'Search',
      slug: '/search',
      type: 'apostrophe-search',
      label: 'Search',
      published: true
    }
  ]
};
