#! /usr/bin/env node
const Fs = require("fs");
const { showAtomTypes } = require("./utils");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const AtomicFile = require("./atomicFile");
const AtomicFileTypes = require("./atomicFileTypes");

const { projectType, src_folder = "./src" } = require(process.cwd() +
  "/cafe.config.json");

const usage = "\nUsage: cafe <arguments> <atom_path>";
const options = yargs
  .usage(usage)
  .option("t", {
    alias: "atom_types",
    describe: "List all supported types.",
    type: "boolean",
    demandOption: false,
  })
  .option("at", {
    alias: "type",
    describe: "choose the atom type",
    choices: ["a", "m", "o", "p", "t"],
    demandOption: false,
  })
  .option("s", {
    alias: "render_styles",
    describe: "define if you want to add a sass module",
    demandOption: false,
    type: "boolean",
  })
  .option("setup", {
    describe: "setup initial folder structure",
  })
  .help(true).argv;

const argv = yargs(hideBin(process.argv)).parse();

if (argv.type || argv.at) {
  console.log(argv);
  if (argv._[0]) {
    const atomicFile = new AtomicFile(
      argv._[0],
      argv.type ? argv.type : argv.at,
      projectType,
      src_folder,
      argv.s
    );
    atomicFile.createAtom();
  } else {
    console.log("************* ERROR *************");
    console.log("provide a file name or path");
  }
  return;
}

if (argv.setup) {
  let folderPath = "";
  for (const [key, value] of Object.entries(AtomicFileTypes)) {
    folderPath = `${src_folder}/${value}`;
    if (!Fs.existsSync(folderPath)) {
      Fs.mkdirSync(folderPath, { recursive: true });
    }
    if (!Fs.existsSync(`${folderPath}/index.js`))
      Fs.writeFileSync(`${folderPath}/index.js`, "", function (err) {
        if (err) throw err;
      });
  }
  console.log("Structure created");
  return;
}

// list all file types
if (argv.t) {
  showAtomTypes();
  return;
}

/*
const args = process.argv.slice(2);
console.log("args: ", args);
if (args.length) {
  const atomictype = args[0];
  const path = args[1].split("/")V
  const name = path.length > 1 ? path[1] : path[0];
  const folderName = path[0];
  const fileName = name.charAt(0).toUpperCase() + name.slice(1);

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
} else {
  console.log("Provide arguments");
}
*/
