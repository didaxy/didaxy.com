tiddlywiki --rendertiddlers [!is[system]tag[Live]] $:/didaxy/templates/static.tiddler.html static text/plain --rendertiddler $:/didaxy/templates/static.template.css static/static.css text/plain --savetiddler $:/didaxy/favicon.png static/favicon.png
cp -r output/fixed/* output/static
pwd
ls