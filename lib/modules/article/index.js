module.exports = {                
  extend: 'apostrophe-pieces',
  name: 'article',
  label: 'Article',        
  pluralLabel: 'Articles',
  contextual: true,
  addFields: [
    {
      name: 'caretaker',
      label: 'Caretaker',
      help: 'Who should people contact with quetions or comments?',
      type: 'string',
      required: 'true'
    },
    {
      name: 'body',
      label: 'Wiki Content',
      type: 'area',
      contextual: true,
      required: true,
      options: {
        widgets: {
          'columns': {},
          'prism': {},
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
    },
    {
      name: '_collection',
      label: 'What collection is this article part of?',
      help: 'Not all articles are part of a collection. One example would be "HR"',
      type: 'joinByOne',
      withType: 'article-collection',
      idField: 'acIDs',
      withJoins: ['_articles'],
      filters: {
        projection: {
          title: 1,
          slug: 1,
          _articles: 1
        }
      }
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      fields: [ 'title', 'slug', 'published', 'tags', 'contact', '_collection', 'body' ]
    },
    {
      name: 'permissions',
      label: 'Permissions',
      fields: [ 'loginRequired', '_viewUsers', '_viewGroups', '_editUsers', '_editGroups' ],
      last: true
    }
  ],
  construct: function (self, options) {
    // ************************
		// ** GENERATE CONTENTS
		// ************************
		self.docBeforeSave = function (req, doc, options) {
			if (doc.type !== self.name) {
				return
			}
			var toc = [];
			var headInd = 1;
			// for (item of doc.body.items) {
      doc.body.items.forEach(function (item, index, arr) {
        if (item.type == "apostrophe-rich-text") {
					var regexp = /<h[1-6]>(.*)<\/h[1-6]>/g;
          var headings = item.content.match(regexp);
          var newCont = item.content;
					if (headings) {
						for (heading of headings) {
              var hOld = heading;
							var hID = "sect-" + headInd++;
							var hCont = heading.replace(regexp, "$1");
              var hNew = heading.replace(/(<h[1-6])/, "$1 id=\"" + hID + "\"");
              // newCont.replace(hOld, hNew);
              newCont = newCont.replace(hOld, hNew);
							var link = '<a href="#' + hID + '">' + hCont + '</a>';	
							toc.push(link);
            }
            // console.log("Content before:");
            // console.log(doc.body.items[index].content.match(regexp));
            doc.body.items[index].content = newCont;
            // console.log("Content after:");
            // console.log(doc.body.items[index].content.match(regexp));
					}
				}
      });
      headInd = 1;
      console.log("Saving");
      // console.log(toc);
      if (toc.length > 0) {
        doc.contArr = toc;
        console.log(doc.contArr);
      }
		}
  }
};