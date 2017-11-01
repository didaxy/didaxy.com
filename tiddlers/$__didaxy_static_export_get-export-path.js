/*\
with thanks to 'welford', https://github.com/welford/twstaticblog/tree/master/export
formats filenames so they conform to kebab case
\*/
(function(){
"use strict";

exports.name = "tv-get-export-path";

exports.params = [
	{title: ""}
];

/*
Run the macro
*/
exports.run = function(title) {
                       
	var sanitized_title = title.replace(/([^a-z0-9]+)/gi, '-');
	return ("./static/"+ sanitized_title).toLocaleLowerCase();
	console.log("au");
}
})();