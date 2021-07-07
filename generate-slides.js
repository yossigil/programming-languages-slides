var fs = require('fs');
var path = require('path');
var Handlebars = require("handlebars");

function buildHtml(name) {
    console.log("generating slide for ", name);
    var template = fs.readFileSync(path.resolve(path.join(__dirname, 'slide-template.hbs')), "utf-8");
    var renderTemplate = Handlebars.compile(template);
    var html = renderTemplate({tutorial_name: name});
    fs.writeFile(`./slides/${name}.html`, html, err => {
        if (err) console.log(err);
        console.log("File written succesfully");
    });
}

fs.readdir("./md", (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
  
    files.forEach((file, _index) => {
        if (file.endsWith(".md")) {
            buildHtml(file.substring(0, file.length - 3));
        }
    });
})