module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Code Syntax Highlighted Block',
  addFields: [
    {
      type: 'select',
      name: 'language',
      label: 'Language',
      choices: [
        // List of languages we support
        // Selected manually from http://prismjs.com/download.html

        // .markup
        // .css
        // .clike
        // .javascript
        // .apacheconf
        // .c
        // .git
        // .java
        // .json
        // .less
        // .markdown
        // .objectivec
        // .php
        // .scss
        // .sql
        // .swift
        {
          value: 'markup',
          label: 'Markup'
        },
        {
          value: 'css',
          label: 'CSS'
        },
        {
          value: 'javascript',
          label: 'JavaScript'
        },
        {
          value: 'json',
          label: 'JSON'
        },
        {
          value: 'less',
          label: 'Less'
        },
        {
          value: 'bash',
          label: 'Bash'
        },
        {
          value: 'clike',
          label: 'C-like'
        },
        {
          value: 'apacheconf',
          label: 'Apache Configuration'
        },
        {
          value: 'c',
          label: 'C'
        },
        {
          value: 'git',
          label: 'Git'
        },
        {
          value: 'java',
          label: 'Java'
        },
        {
          value: 'markdown',
          label: 'Markdown'
        },
        {
          value: 'objectivec',
          label: 'Objective-C'
        },
        {
          value: 'php',
          label: 'PHP'
        },
        {
          value: 'scss',
          label: 'Sass (SCSS)'
        },
        {
          value: 'sql',
          label: 'SQL'
        },
        {
          value: 'swift',
          label: 'Swift'
        }
      ]
    },
    {
      name: 'code',
      label: 'Code',
      type: 'string',
      textarea: true,
      required: true
    },
  ],
  construct: function (self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'prism');
      self.pushAsset('script', 'prism');
    }
  }
};