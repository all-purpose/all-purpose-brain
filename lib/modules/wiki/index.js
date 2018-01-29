module.exports = {                
  extend: 'apostrophe-pieces',
  name: 'wiki',
  label: 'Wiki',        
  pluralLabel: 'Wikis',        
  addFields: [
    {
      name: 'contact',
      label: 'Contact Person',
      help: 'Who should people contact if they have questions?',
      type: 'string',
    },
    {
      name: 'body',
      label: 'Wiki Content',
      type: 'area',
      options: {
        widgets: {
          'columns': {},
          'apostrophe-rich-text': {
            toolbar: [ 'Styles', 'Bold', 'Italic', 'Subscript', 'Superscript', 'Link', 'Unlink', 'Anchor', 'BulletedList', 'NumberedList', 'Blockquote', 'Table', 'Split'
            ],
            styles: [
              {
                name: 'Heading',
                element: 'h1'
              },
              {
                name: 'Sub-heading',
                element: 'h2'
              }
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