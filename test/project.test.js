const { describe, it } = require("mocha");
const { expect } = require("chai");
const Project = require("../src/project");

describe("Project", () => {
  it("should generate a project instance from properties list", () => {
    const content = {
      título: "Projeto de lei 580/2016",
      link: "http://www.al.sp.gov.br/propositura?id=1323286",
      autor: "Marcia Lia, Marcia Sol Lua",
      etapa: "PAUTA",
      ementa:
        "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
      indexadoresnorma:
        "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
    };

    const result = new Project(content);
    const expected = {
      id: "1323286",
      numero: "580",
      ano: "2016",
      autores: [
        {
          nome: "Marcia Lia",
        },
        {
          nome: "Marcia Lua",
        },
      ],
      url: "http://www.al.sp.gov.br/propositura?id=1323286",
      indexadores: [
        "NORMAS",
        "REALIZAÇÃO",
        "CONCURSO PÚBLICO ESTADUAL",
        "ESTADO DE SÃO PAULO",
        "ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      ],
    };

    expect(result).to.be.deep.equal(expected);
  });
});
