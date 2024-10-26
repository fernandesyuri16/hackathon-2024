const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Perguntas do questionário
  const questions = [
    { text: "Eu não me sinto particularmente satisfeito com o jeito que sou", invertScore: true },
    { text: "Sou uma pessoa muito interessada em outras pessoas", invertScore: false },
    { text: "Sinto que a vida é muito gratificante", invertScore: false },
    { text: "Tenho sentimentos muito afetivos em relação a quase todos", invertScore: false },
    { text: "Raramente acordo me sentindo cansado", invertScore: true },
    { text: "Eu não estou, particularmente, otimista em relação ao futuro", invertScore: true },
    { text: "Sinto que a maioria das minhas experiências são divertidas", invertScore: false },
    { text: "Estou sempre comprometido e envolvido com várias iniciativas", invertScore: false },
    { text: "A vida é boa", invertScore: false },
    { text: "Eu não acho que o mundo seja um bom lugar para viver", invertScore: true },
    { text: "Eu me encontro, sempre sorrindo muito", invertScore: false },
    { text: "Estou bem satisfeito com tudo em minha vida", invertScore: false },
    { text: "Eu não me sinto uma pessoa atraente", invertScore: true },
    { text: "Existe uma lacuna entre o que gostaria de fazer e o que faço", invertScore: true },
    { text: "Estou muito feliz", invertScore: false },
    { text: "Eu encontro beleza e harmonia nas coisas", invertScore: false },
    { text: "Sempre consigo provocar alegria nas pessoas", invertScore: false },
    { text: "Sempre encontro tempo para tudo que quero realizar", invertScore: false },
    { text: "Sinto que não tenho controle da minha vida", invertScore: true },
    { text: "Sinto-me capaz de levar diversas iniciativas adiante", invertScore: false },
    { text: "Eu me considero uma pessoa mentalmente alerta", invertScore: false },
    { text: "Muitas vezes me sinto experimentando alegria e euforia", invertScore: false },
    { text: "Sinto que não é fácil tomar decisões, em várias situações", invertScore: true },
    { text: "Sinto não ter um significado e propósito em minha vida", invertScore: true },
    { text: "Sinto que tenho um nível elevado de energia", invertScore: false },
    { text: "Eu geralmente, exerço uma boa influência sobre os acontecimentos", invertScore: false },
    { text: "Não costumo me divertir com outras pessoas", invertScore: true },
    { text: "Não me sinto, particularmente, uma pessoa saudável", invertScore: true },
    { text: "Não tenho, particularmente, lembranças felizes do meu passado", invertScore: true }
  ];

  // Insere perguntas sem validação
  for (const question of questions) {
    await prisma.question.create({
      data: question, // Cria a pergunta
    });
  }

  // Escala Likert (1 a 6)
  const choices = [
    { value: 1, label: "Discordo completamente" },
    { value: 2, label: "Discordo moderadamente" },
    { value: 3, label: "Discordo minimamente" },
    { value: 4, label: "Concordo minimamente" },
    { value: 5, label: "Concordo moderadamente" },
    { value: 6, label: "Concordo completamente" }
  ];

  // Insere escolhas sem validação
  for (const choice of choices) {
    await prisma.choice.create({
      data: choice, // Cria a escolha
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
