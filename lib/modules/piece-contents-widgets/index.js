module.exports = {
	extend: 'apostrophe-widgets',
	label: 'Table of Contents',
	addFields: [
		{
			name: 'fieldName',
			label: 'Field Name',
			help: 'What is the name of the area on the page we\'ll create the table of contents from?',
			type: 'string',
			required: true
		}
	]
}