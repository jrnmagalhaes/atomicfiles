#! /usr/bin/env node
const Fs = require("fs");
const { projectType, src_folder = "./src" } = require(process.cwd() +
  "/cafe.config.json");
const args = process.argv.slice(2);
const atomictype = args[0];
const path = args[1].split("/");
const name = path.length > 1 ? path[1] : path[0];
const folderName = path[0];
const fileName = name.charAt(0).toUpperCase() + name.slice(1);
const Templates = require("./templates.js");

const createAtom = () => {
  const templates = new Templates(projectType, fileName);
  Fs.writeFile(
    `${src_folder}/${atomictype}/${folderName}/${fileName}.js`,
    templates.render(),
    function (err) {
      if (err) throw err;
      console.log("Atom created");
    }
  );

  Fs.appendFile(
    `${src_folder}/${atomictype}/${folderName}/index.js`,
    `export * from './${fileName}'\n`,
    function (err) {
      if (err) throw err;
      console.log("Updated index.js file!");
    }
  );
};

// src folder and atomictype folder
if (!Fs.existsSync(src_folder)) {
  Fs.mkdirSync(src_folder);
  console.log("Src folder: created");
}
if (!Fs.existsSync(`${src_folder}/${atomictype}`)) {
  Fs.mkdirSync(`${src_folder}/${atomictype}`);
  Fs.writeFile(
    `${src_folder}/${atomictype}/index.js`,
    "//exports everything\n",
    function (err) {
      if (err) throw err;
      console.log(`${atomictype} folder: created`);
    }
  );
}

if (!Fs.existsSync(`${src_folder}/${atomictype}/${folderName}`)) {
  Fs.mkdirSync(`${src_folder}/${atomictype}/${folderName}`);
  createAtom();

  //it adds an export statment in index.js file from atoms folder
  Fs.appendFile(
    `${src_folder}/${atomictype}/index.js`,
    `export * from './${folderName}'\n`,
    function (err) {
      if (err) throw err;
      console.log("Updated index.js file!");
    }
  );
} else if (
  !Fs.existsSync(`${src_folder}/${atomictype}/${folderName}/${fileName}.js`)
) {
  createAtom();
} else {
  throw new Error(`Atomic file alredy exists`);
}
