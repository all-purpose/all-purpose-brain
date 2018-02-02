module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Notice',
	// contextualOnly: true,
	blockLevelControls: true,
	addFields: [
		{
			type: 'select',
			name: 'noticeType',
			label: 'Type',
			choices: [
				{
					value: 'positive',
					label: 'Positive'
				},
				{
					value: 'neutral',
					label: 'Neutral'
				},
				{
					value: 'negative',
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