const { describe, it } = require("mocha");
const { expect } = require("chai");

const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");
const mock = require("./mock/valid");

describe("TextProcessorFluentAPI", () => {
  it("#build", () => {
    const result = new TextProcessorFluentAPI(mock).build();

    expect(result).to.be.deep.equal(mock);
  });

  it("#extractData", () => {
    const result = new TextProcessorFluentAPI(mock)
      .extractProjectData()
      .build();
    const expected = [
      "título;link;autor;etapa;ementa;indexadoresnorma;",
      "Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;",
      "Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;",
      "Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;",
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#extractColumns", () => {
    const content = [
      "título;link;autor;etapa;ementa;indexadoresnorma;",
      "Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;",
    ];
    const expected = {
      columns: [
        "título",
        "link",
        "autor",
        "etapa",
        "ementa",
        "indexadoresnorma",
      ],
      lines: [
        "Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;",
      ],
    };
    const result = new TextProcessorFluentAPI(content).extractColumns().build();

    expect(result).to.be.deep.equal(expected);
  });

  it("#extractLines", () => {
    const content = {
      columns: [
        "título",
        "link",
        "autor",
        "etapa",
        "ementa",
        "indexadoresnorma",
      ],
      lines: [
        "Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;",
      ],
    };
    const expected = {
      columns: [
        "título",
        "link",
        "autor",
        "etapa",
        "ementa",
        "indexadoresnorma",
      ],
      lines: [
        [
          "Projeto de lei 545/2016",
          "http://www.al.sp.gov.br/propositura?id=1322832",
          "Roberto Morais, Itamar Borges",
          "PAUTA",
          "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
        ],
      ],
    };
    const result = new TextProcessorFluentAPI(content).extractLines().build();

    expect(result).to.be.deep.equal(expected);
  });

  it("#mountData", () => {
    const content = {
      columns: [
        "título",
        "link",
        "autor",
        "etapa",
        "ementa",
        "indexadoresnorma",
      ],
      lines: [
        [
          "Projeto de lei 580/2016",
          "http://www.al.sp.gov.br/propositura?id=1323286",
          "Marcia Lia",
          "PAUTA",
          "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
          "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
        ],
        [
          "Projeto de lei 545/2016",
          "http://www.al.sp.gov.br/propositura?id=1322832",
          "Roberto Morais, Itamar Borges",
          "PAUTA",
          "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
        ],
      ],
    };

    const expected = [
      {
        título: "Projeto de lei 580/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1323286",
        autor: "Marcia Lia",
        etapa: "PAUTA",
        ementa:
          "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
        indexadoresnorma:
          "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      },
      {
        título: "Projeto de lei 545/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1322832",
        autor: "Roberto Morais, Itamar Borges",
        etapa: "PAUTA",
        ementa:
          "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
        indexadoresnorma: "",
      },
    ];

    const result = new TextProcessorFluentAPI(content).mountData().build();

    expect(result).to.be.deep.equal(expected);
  });

  it("#mapProject", () => {
    const content = [
      {
        título: "Projeto de lei 580/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1323286",
        autor: "Marcia Lia, Marcia Sol Lua",
        etapa: "PAUTA",
        ementa:
          "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
        indexadoresnorma:
          "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      },
    ];

    const expected = [
      {
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
      },
    ];

    const result = new TextProcessorFluentAPI(content).mapProject().build();

    expect(result).to.be.deep.equal(expected);
  });
});
