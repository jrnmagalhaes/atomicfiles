#! /usr/bin/env node
const Fs = require("fs");
const src = "./src";
const args = process.argv.slice(2);
const path = args[0].split("/");
let name = "";
let folderName = "";
if (path.length > 1) {
  name = path[1];
  folderName = path[0];
} else {
  name = args[0];
  folderName = args[0];
}
const fileName = name.charAt(0).toUpperCase() + name.slice(1);

const createAtom = () => {
  Fs.writeFile(
    `${src}/atoms/${folderName}/${fileName}.js`,
    `import React from "react";
import { View, Text } from "react-native";

const ${fileName} = () => {
  return (
    <View>
      <Text>${fileName}</Text>
    </View>
  );
};

export { ${fileName} };`,
    function (err) {
      if (err) throw err;
      console.log("Atom created");
    }
  );

  Fs.appendFile(
    `${src}/atoms/${folderName}/index.js`,
    `export * from './${fileName}'\n`,
    function (err) {
      if (err) throw err;
      console.log("Updated index.js file!");
    }
  );
};

// src folder and atoms folder
if (!Fs.existsSync(src)) {
  Fs.mkdirSync(src);
  console.log("Src folder: created");
}
if (!Fs.existsSync(`${src}/atoms`)) {
  Fs.mkdirSync(`${src}/atoms`);
  Fs.writeFile(
    `${src}/atoms/index.js`,
    "//exports all atoms\n",
    function (err) {
      if (err) throw err;
      console.log("Atoms folder: created");
    }
  );
}

if (!Fs.existsSync(`${src}/atoms/${folderName}`)) {
  Fs.mkdirSync(`${src}/atoms/${folderName}`);
  createAtom();

  //it adds an export statment in index.js file from atoms folder
  Fs.appendFile(
    `${src}/atoms/index.js`,
    `export * from './${folderName}'\n`,
    function (err) {
      if (err) throw err;
      console.log("Updated index.js file!");
    }
  );
} else if (!Fs.existsSync(`${src}/atoms/${folderName}/${fileName}.js`)) {
  createAtom();
} else {
  throw new Error("Átomo já existe");
}
