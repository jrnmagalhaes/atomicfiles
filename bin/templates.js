class Templates {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
  availableTemplates = {
    "react-native": `import React from "react";\nimport { View, Text } from "react-native";\n\nconst name = () => {\n  return (\n    <View>\n      <Text>name</Text>\n    </View>\n  );\n};\n\nexport { name };\n`,
    react: `import React from "react";\n\nconst name = () => {\n  return (\n    <div>\n      name\n    </div>\n  );\n};\n\nexport { name };\n`,
  };

  render() {
    return this.availableTemplates[this.type].replace(/name/g, this.name);
  }
}

module.exports = Templates;
