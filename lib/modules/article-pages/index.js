module.exports = {          
  extend: 'apostrophe-pieces-pages',
  construct: function (self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'article-pages');
      // self.pushAsset('stylesheet', 'editor', { when: 'user' });
    };
  }
};