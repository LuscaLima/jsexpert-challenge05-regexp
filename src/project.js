const { evaluateRegex } = require("./util");

class Project {
  constructor({ título, link, autor, indexadoresnorma }) {
    const splitInfoRegex = evaluateRegex(/,/g);
    const idRegex = evaluateRegex(/(\d+)$/g);
    const numberYearRegex = evaluateRegex(/(\d+)/g);
    const firstLastNamesRegex = evaluateRegex(/\s/g);
    const [number, year] = título.match(numberYearRegex);
    const authors = autor.split(splitInfoRegex).map((author) => {
      const names = author.trim().split(firstLastNamesRegex);
      const first = names.shift();
      const last = names.pop();
      return { nome: [first, last].join(" ") };
    });
    const indexers = indexadoresnorma
      .split(splitInfoRegex)
      .map((indexer) => indexer.trim());

    this.id = link.match(idRegex).join();
    this.url = link;
    this.numero = number;
    this.ano = year;
    this.autores = authors;
    this.indexadores = indexers;
  }
}

module.exports = Project;
