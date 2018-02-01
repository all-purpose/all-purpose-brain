module.exports = {                
  extend: 'apostrophe-pieces',
  name: 'article',
  label: 'Article',        
  pluralLabel: 'Articles',        
  addFields: [
    {
      name: '_caretaker',
      withType: 'apostrophe-user',
      label: 'Article Caretaker',
      help: 'Who should people contact if they have questions or comments?',
      type: 'joinByOne',
      filters: {
        firstName: 1,
        lastName: 1
      }
    },
    {
      name: 'body',
      label: 'Wiki Content',
      type: 'area',
      options: {
        widgets: {
          'columns': {},
          'apostrophe-rich-text': {
            toolbar: [ 'Styles', 'Bold', 'Subscript', 'Superscript', 'Link', 'Unlink', 'Anchor', 'BulletedList', 'NumberedList', 'Blockquote', 'Table', 'Split'
            ],
            styles: [
              { name: 'Section', element: 'h1'},
              { name: 'SubSection', element: 'h2'},
              { name: 'Label', element: 'h3' },
              { name: 'Code', element: 'pre' },
              { name: 'Paragraph', element: 'p' }
            ],
            blockLevelControls: true
          },
          'apostrophe-images': {
            minSize: [400, 300]
          }
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'slug', 'published', 'tags', 'contact', 'body' ]
    },
    {
      name: 'permissions',
      label: 'Permissions',
      fields: [ 'loginRequired', '_viewUsers', '_viewGroups', '_editUsers', '_editGroups' ],
      last: true
    }
  ]
};