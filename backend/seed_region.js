const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Lista de CEPs que você quer popular no banco `Region`
const ceps = [14409206, 14403416, 14409105, 14406767]; // Adicione quantos CEPs precisar

// Função para obter cidade e bairro a partir do CEP
async function fetchLocationByCep(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    const { localidade: city, bairro: neighborhood } = response.data;
    return { city, neighborhood };
  } catch (error) {
    console.error(`Erro ao buscar dados do CEP ${cep}:`, error.message);
    return { city: null, neighborhood: null };
  }
}

// Função principal para popular a tabela `Region`
async function seedRegion() {
  for (const cep of ceps) {
    try {
      const { city, neighborhood } = await fetchLocationByCep(cep);

      // Verifica se os dados de cidade e bairro foram encontrados
      if (!city || !neighborhood) {
        console.log(`Dados não encontrados para o CEP ${cep}.`);
        continue;
      }

      // Registra o CEP, cidade, bairro e um score fictício para exemplificação
      await prisma.region.create({
        data: {
          cep: cep, // Remove o hífen do CEP, se necessário
          score: parseFloat((Math.random() * 10).toFixed(2)), // Score fictício
          city,
          neighborhood,
        },
      });
      console.log(`Dados registrados para o CEP ${cep}.`);
    } catch (error) {
      console.error(`Erro ao registrar dados para o CEP ${cep}:`, error.message);
    }
  }

  // Encerra a conexão com o Prisma
  await prisma.$disconnect();
}

// Executa a função `seedRegion`
seedRegion()
  .then(() => console.log('Seed concluído com sucesso.'))
  .catch((error) => console.error('Erro ao executar o seed:', error));
