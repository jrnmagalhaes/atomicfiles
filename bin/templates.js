class Templates {
  constructor(type, name, sass) {
    this.type = type;
    this.name = name;
    this.sass = sass;
    this.availableTemplates = {
      "react-native": {
        imports: {
          regular: `import React from "react";\nimport { View, Text } from "react-native";\n`,
          sass: `import Styles from "./name.module.scss";`,
        },
        body: {
          regular: `\nconst name = () => {\n  return (\n    <View>\n      <Text>name</Text>\n    </View>\n  );\n};\n\n`,
          sass: `\nconst name = () => {\n  return (\n    <View className={Styles.container}>\n      <Text>name</Text>\n    </View>\n  );\n};\n\n`,
        },
        export: `export {name};\n`,
      },
      react: {
        imports: {
          regular: `import React from "react";\n`,
          sass: `import Styles from "./name.module.scss";\n`,
        },
        body: {
          regular: `\nconst name = () => {\n  return (\n    <div>\n      name\n    </div>\n  );\n};\n\n`,
          sass: `\nconst name = () => {\n  return (\n    <div className={Styles.container}>\n      name\n    </div>\n  );\n};\n\n`,
        },
        export: `export {name};\n`,
      },
      sass: `.container {\n  display: flex;\n}\n`,
    };
  }

  render() {
    const template = this.availableTemplates[this.type];
    return `${template.imports.regular}${
      this.sass ? template.imports.sass : ""
    }${this.sass ? template.body.sass : template.body.regular}${
      template.export
    }`.replace(/name/g, this.name);
  }

  renderSass() {
    return this.availableTemplates.sass;
  }
}

module.exports = Templates;
