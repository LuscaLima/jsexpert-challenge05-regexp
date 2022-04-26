const { evaluateRegex } = require("./util");
const Project = require("./project");

class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractProjectData() {
    const dataRegex = evaluateRegex(/^(.*);$/gm);
    const project = this.#content.match(dataRegex);
    this.#content = project;
    return this;
  }

  extractColumns() {
    const columnsRow = this.#content.shift();
    const columnsSplitRegex = evaluateRegex(/;/g);
    const columns = columnsRow.split(columnsSplitRegex).filter(Boolean);
    this.#content = {
      columns,
      lines: this.#content,
    };
    return this;
  }

  extractLines() {
    const lineSplitRegex = evaluateRegex(/;/g);
    this.#content.lines = this.#content.lines.map((line) =>
      line.split(lineSplitRegex).filter(Boolean)
    );
    return this;
  }

  mountData() {
    this.#content = this.#content.lines.map((line) =>
      this.#content.columns.reduce(
        (data, column, index) => ({
          ...data,
          [column]: line[index] || "",
        }),
        {}
      )
    );
    return this;
  }

  mapProject() {
    this.#content = this.#content.map((project) => new Project(project));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
