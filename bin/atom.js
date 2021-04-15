#! /usr/bin/env node
const Fs = require("fs");
// const shell = require("shelljs");
const src = "./src";
const args = process.argv.slice(2);
const name = args[0];
const fileName = name.charAt(0).toUpperCase() + name.slice(1);

const createAtom = () => {
  Fs.writeFile(
    `${src}/atoms/${name}/${fileName}.js`,
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
    `${src}/atoms/${name}/index.js`,
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
  console.log("src folder created");
}
if (!Fs.existsSync(`${src}/atoms`)) {
  Fs.mkdirSync(`${src}/atoms`);
  Fs.writeFile(
    `${src}/atoms/index.js`,
    "//exports all atoms\n",
    function (err) {
      if (err) throw err;
      console.log("atoms folder created");
    }
  );
}

Fs.appendFile(
  `${src}/atoms/index.js`,
  `export * from './${name}'\n`,
  function (err) {
    if (err) throw err;
    console.log("Updated index.js file!");
  }
);

if (!Fs.existsSync(`${src}/atoms/${name}`)) {
  Fs.mkdirSync(`${src}/atoms/${name}`);
  createAtom();
} else if (
  !Fs.existsSync(
    `${src}/${args[0]}/${args[0].charAt(0).toUpperCase() + args[0].slice(1)}.js`
  )
) {
  createAtom();
} else {
  throw new Error("Átomo já existe");
}
// shell.exec("mkdir ./src");
// shell.exec("mkdir ./src/atoms");
// shell.exec("touch ./src/atoms/teste.js");
