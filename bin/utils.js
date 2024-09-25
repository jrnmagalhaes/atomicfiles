const AtomTypeNames = {
  a: "Atoms",
  m: "Molecules",
  o: "Organisms",
  p: "Pages",
  t: "Templates",
}

function showAtomTypes() {
  console.log(`a : ${AtomTypeNames.a}`);
  console.log(`m : ${AtomTypeNames.m}`);
  console.log(`o : ${AtomTypeNames.o}`);
  console.log(`p : ${AtomTypeNames.p}`);
  console.log(`t : ${AtomTypeNames.t}`);
}

function getAtomName(type) {
  return AtomTypeNames[type] ?? type
}

module.exports = { showAtomTypes: showAtomTypes, getAtomName: getAtomName };
