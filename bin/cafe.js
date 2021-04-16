#! /usr/bin/env node
const Fs = require("fs");
const { projectType } = require(process.env.PWD + "/cafe.config.json");
const src = "./src";
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
    `${src}/${atomictype}/${folderName}/${fileName}.js`,
    templates.render(),
    function (err) {
      if (err) throw err;
      console.log("Atom created");
    }
  );

  Fs.appendFile(
    `${src}/${atomictype}/${folderName}/index.js`,
    `export * from './${fileName}'\n`,
    function (err) {
      if (err) throw err;
      console.log("Updated index.js file!");
    }
  );
};

// src folder and atomictype folder
if (!Fs.existsSync(src)) {
  Fs.mkdirSync(src);
  console.log("Src folder: created");
}
if (!Fs.existsSync(`${src}/${atomictype}`)) {
  Fs.mkdirSync(`${src}/${atomictype}`);
  Fs.writeFile(
    `${src}/${atomictype}/index.js`,
    "//exports everything\n",
    function (err) {
      if (err) throw err;
      console.log(`${atomictype} folder: created`);
    }
  );
}

if (!Fs.existsSync(`${src}/${atomictype}/${folderName}`)) {
  Fs.mkdirSync(`${src}/${atomictype}/${folderName}`);
  createAtom();

  //it adds an export statment in index.js file from atoms folder
  Fs.appendFile(
    `${src}/${atomictype}/index.js`,
    `export * from './${folderName}'\n`,
    function (err) {
      if (err) throw err;
      console.log("Updated index.js file!");
    }
  );
} else if (
  !Fs.existsSync(`${src}/${atomictype}/${folderName}/${fileName}.js`)
) {
  createAtom();
} else {
  throw new Error(`Atomic file alredy exists`);
}
