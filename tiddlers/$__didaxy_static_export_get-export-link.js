/*\
with thanks to 'welford', https://github.com/welford/twstaticblog/tree/master/export
formats links so they conform to camel case.
\*/
(function(){
"use strict";

exports.name = "tv-get-export-link";

exports.params = [
];

exports.run = function() {
	var title = this.to;
	var sanitized_title = title.replace(/([^a-z0-9]+)/gi, '-');
	var attr = this.getVariable("tv-subfolder-links");
	var path_to_root="./"	
	var finalLink=path_to_root

	
	var wikiLinkTemplateMacro = this.getVariable("tv-wikilink-template"),
		wikiLinkTemplate = wikiLinkTemplateMacro ? wikiLinkTemplateMacro.trim() : "#$uri_encoded$",
		wikiLinkText = wikiLinkTemplate.replace("$uri_encoded$",encodeURIComponent(sanitized_title));	
	wikiLinkText = wikiLinkText.replace("$uri_doubleencoded$",encodeURIComponent(sanitized_title));
	return (finalLink + wikiLinkText).toLocaleLowerCase();
};

})();