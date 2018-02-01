module.exports = {
	extend: 'apostrophe-pieces-widgets',
	filters: {
		projection: {
			title: 1,
			_url: 1,
			searchSummary: 1
		}
	},
	sort: { updatedAt: 1 },
	construct: function (self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'article-widgets');
    }
  }
}
	