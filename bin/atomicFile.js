const AtomicFileTypes = require("./atomicFileTypes");
const Templates = require("./templates");
const Fs = require("fs");

class AtomicFile {
  constructor(path, type, projectType, src_folder, renderStyles = false, includeStorybook = false, includeJsTest = false) {
    const splittedPath = path.split("/");
    const fileName =
      splittedPath.length > 1 ? splittedPath[1] : splittedPath[0];
    this.type = AtomicFileTypes[type];
    this.folderName = splittedPath[0].charAt(0).toLocaleLowerCase() + splittedPath[0].slice(1);
    this.name = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    this.projectType = projectType;
    this.src_folder = src_folder;
    this.renderStyles = renderStyles;
    this.includeStorybook = includeStorybook;
    this.includeJsTest = includeJsTest
  }

  createFolder() {
    if (!Fs.existsSync(`${this.src_folder}/${this.type}`)) {
      Fs.mkdirSync(`${this.src_folder}/${this.type}`);
      Fs.writeFile(
        `${this.src_folder}/${this.type}/index.js`,
        "",
        function (err) {
          if (err) throw err;
        }
      );
    }

    if (!Fs.existsSync(`${this.src_folder}/${this.type}/${this.folderName}`)) {
      Fs.mkdirSync(`${this.src_folder}/${this.type}/${this.folderName}`);

      Fs.appendFile(
        `${this.src_folder}/${this.type}/index.js`,
        `export * from './${this.folderName}';\n`,
        function (err) {
          if (err) throw err;
          console.log("Updated index.js file!");
        }
      );
    }
  }

  createAtom() {
    this.createFolder();

    const templates = new Templates(
      this.projectType,
      this.name,
      this.renderStyles,
      this.type
    );

    if (
      Fs.existsSync(
        `${this.src_folder}/${this.type}/${this.folderName}/${this.name}.js`
      )
    ) {
      console.log("exists?");
      throw new Error(`Atomic file alredy exists`);
    }

    Fs.writeFile(
      `${this.src_folder}/${this.type}/${this.folderName}/${this.name}.js`,
      templates.render(),
      function (err) {
        if (err) throw err;
        console.log("Atomic files created");
      }
    );

    if (this.renderStyles) {
      Fs.writeFile(
        `${this.src_folder}/${this.type}/${this.folderName}/${this.name}.module.scss`,
        templates.renderSass(),
        function (err) {
          if (err) throw err;
        }
      );
    }

    if (this.includeStorybook) {
      templates.renderStorybook().then(template => {
        Fs.writeFile(
          `${this.src_folder}/${this.type}/${this.folderName}/${this.name}.stories.js`,
          template,
          function (err) {
            if (err) throw err;
          }
        );
      });
    }

    if (this.includeJsTest) {
      templates.renderJsTestFile().then(template=>{
        Fs.writeFile(
          `${this.src_folder}/${this.type}/${this.folderName}/${this.name}.test.js`,
          template,
          function (err) {
            if (err) throw err;
          }
        );
      })
    } 
      
    Fs.appendFile(
      `${this.src_folder}/${this.type}/${this.folderName}/index.js`,
      `export * from './${this.name}';\n`,
      function (err) {
        if (err) throw err;
        console.log("Updated index.js file!");
      }
    );
  }
}

module.exports = AtomicFile;
