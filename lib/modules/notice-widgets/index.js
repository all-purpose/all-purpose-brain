module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Notice',
	// contextualOnly: true,
	blockLevelControls: true,
	addFields: [
		{
			name: 'noticeType',
			label: 'Notice Type',
			type: 'select',
			choices: [
				{
					name: 'positive',
					label: 'Positive'
				},
				{
					name: 'neutral',
					label: 'Neutral'
				},
				{
					name: 'negative',
					label: 'Negative'
				}
			]
		},
		{
			name: 'content',
			label: 'Content',
			type: 'singleton',
			// contextualOnly: true,
			widgetType: 'apostrophe-rich-text',
			options: {
				toolbar: [
					"Styles",
					"Bold",
					"Italic",
					"Link",
					"Unlink"
				],
				styles: [
					{ name: "Heading", element: "h3" },
					{ name: "Message", element: "p" }
				]
			}
		}
	],
  construct: function (self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function () {
      superPushAssets();
      self.pushAsset('stylesheet', 'notice');
    }
  }
};