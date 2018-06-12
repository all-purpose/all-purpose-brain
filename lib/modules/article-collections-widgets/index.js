module.exports = {
	extend: 'apostrophe-pieces-widgets',
	label: 'Collection Widget',
	filters: {
		projection: {
			slug: 1,
			title: 1,
			type: 1,
			tags: 1,
			_url: 1
		}
	},
	addFields: [
		{
			name: 'contents',
			label: 'Widget Contents',
			type: 'select',
			help: 'You can only list the contents of one collection on an article page',
			required: true,
			choices: [
				{
					label: 'List all Collections',
					value: 'allCollections'
				},
				{
					label: 'List Contents of one (this) collection',
					value: 'oneCollection'
				}
			]
		}
	],
	construct: function (self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'article-collections-widgets');
		}
		self.pushAsset("stylesheet", "article-collections-widgets");
  }
}