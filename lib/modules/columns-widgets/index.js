var textOptions = {
  widgets: {
    'apostrophe-rich-text': {
      toolbar: [ 'Styles', 'Bold', 'Italic', 'Subscript', 'Superscript', 'Link', 'Unlink', 'Anchor', 'BulletedList', 'NumberedList', 'Blockquote', 'Table', 'Split'
      ],
      styles: [
        { name: 'Paragraph', element: 'p'},
        { name: 'Featured Intro', element: 'h1'},
        { name: 'Section Heading', element: 'h2'},
        { name: 'Label', element: 'h3' },
        { name: 'Code', element: 'pre' },
        { name: 'Notice', element: 'p', attributes: { 'class': 'card__notice'} }
      ]
    },
    'apostrophe-images': {
      minSize: [400, 300]
    }
  }
};

module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Columns',
  // skipInitialModal: true,
  blockLevelControls: true,
  addFields: [
    {
      type: 'select',
      name: 'gridCols',
      label: 'Columns',
      choices: [
        {
          value: 'twoTwo',
          label: '50 | 50'
        },
        {
          value: 'threeOne',
          label: '75 | 25'
        },
        {
          value: 'oneThree',
          label: '25 | 75'
        },
        {
          value: 'fourCols',
          label: '4 Columns',
          showFields: ['colThree', 'colFour']
        },
        {
          value: 'threeCols',
          label: '3 Columns',
          showFields: ['colThree']
        }
      ]
    },
    {
      name: 'colOne',
      label: 'Column One',
      type: 'area',
      contextual: true,
      options: textOptions
    },
    {
      name: 'colTwo',
      label: 'Column Two',
      type: 'area',
      contextual: true,
      options: textOptions
    },
    {
      name: 'colThree',
      label: 'Column Three',
      type: 'area',
      contextual: true,
      options: textOptions
    },
    {
      name: 'colFour',
      label: 'Column Four',
      type: 'area',
      contextual: true,
      options: textOptions
    }
  ],
  construct: function (self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'grid');
      self.pushAsset('stylesheet', 'editor', { when: 'user' });
    }
  }
};