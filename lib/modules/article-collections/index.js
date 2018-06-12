module.exports = {
  name: "article-collection",
  extend: "apostrophe-pieces",
  label: "Article Collection",
  pluralLabel: "Article Collections",
  addFields: [
    {
      name: "_articles",
      type: "joinByOneReverse",
      withType: "article",
      reverseOf: "_collection"
    },
    {
      name: "collectionIntro",
      label: "Collection Introduction",
      help: "The content for this collection's index page",
      type: "area",
      options: {
        widgets: {
          "apostrophe-rich-text": {
            toolbar: [
              "Styles",
              "Bold",
              "Italic",
              "Link",
              "Unlink",
              "Table",
              "BulletedList"
            ],
            styles: [
              {
                name: "Heading",
                element: "h1"
              },
              {
                name: "Sub-heading",
                element: "h2"
              }
            ],
            blockLevelControls: true
          },
          "apostrophe-images": {
            label: "Image",
            minSize: [480, 360],
            aspectRatio: [16, 9]
          },
          "apostrophe-video": {
            label: "Youtube or Vimeo"
          }
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'slug', 'published', 'tags', 'contact', 'collectionIntro']
    },
    {
      name: 'permissions',
      label: 'Permissions',
      fields: [ 'loginRequired', '_viewUsers', '_viewGroups', '_editUsers', '_editGroups' ],
      last: true
    }
  ]
};
