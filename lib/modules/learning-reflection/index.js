module.exports = {                
  extend: 'apostrophe-pieces',
  name: 'learningReflection',
  label: 'Learning Reflection',        
  pluralLabel: 'Learnings',        
  addFields: [
    {
      name: 'project',
      label: 'Project',
      type: 'string'
    },
    {
      name: 'summary',
      label: 'Summary',
      help: 'Shown when browsing learnings',
      type: 'singleton',
      widgetType: 'apostrophe-rich-text',
      options: {
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
      }
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
      fields: [ 'title', 'slug', 'published', 'tags', 'project', 'summary', 'body' ]
    },
    {
      name: 'permissions',
      label: 'Permissions',
      fields: [ 'loginRequired', '_viewUsers', '_viewGroups', '_editUsers', '_editGroups' ],
      last: true
    }
  ]
};