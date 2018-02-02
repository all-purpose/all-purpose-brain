module.exports = {                
  extend: 'apostrophe-pieces',
  name: 'article',
  label: 'Article',        
  pluralLabel: 'Articles',        
  addFields: [
    {
      name: 'caretaker',
      label: 'Caretaker',
      help: 'Who should people contact with quetions or comments?',
      type: 'string'
    },
    {
      name: 'body',
      label: 'Wiki Content',
      type: 'area',
      options: {
        widgets: {
          'columns': {},
          'notice': {},
          'apostrophe-rich-text': {
            toolbar: [ 'Styles', 'Bold', 'Subscript', 'Superscript', 'Link', 'Unlink', 'Anchor', 'BulletedList', 'NumberedList', 'Blockquote', 'Table', 'Split'
            ],
            styles: [
              { name: 'Paragraph', element: 'p' },
              { name: 'Section', element: 'h1'},
              { name: 'SubSection', element: 'h2'},
              { name: 'Label', element: 'h3' },
              { name: 'Code', element: 'pre' }
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