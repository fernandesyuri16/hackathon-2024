const express = require('express');
const axios = require('axios');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    console.error('Erro ao buscar dados do CEP:', error.message);
    return { city: null, neighborhood: null };
  }
}

// Rota para calcular o score e registrar na tabela `Region`
router.post('/calculate', async (req, res) => {
  const {id: userId} = req.body;

  console.log(req.body);

  try {
    // Busca o CEP do usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { cep: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Obter o score mais recente do usuário (ajuste conforme a estrutura do seu banco)
    const feedback = await prisma.feedback.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { score: true },
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Nenhum score encontrado para o usuário.' });
    }

    // Busca cidade e bairro usando a função `fetchLocationByCep`
    const { city, neighborhood } = await fetchLocationByCep(user.cep);

    // Registra `cep`, `score`, `city` e `neighborhood` na tabela `Region`
    await prisma.region.create({
      data: {
        cep: user.cep,
        score: feedback.score.toFixed(2),
        city,
        neighborhood,
      },
    });

    res.json({ message: 'Dados registrados com sucesso.', score: feedback.score, cep: user.cep });
  } catch (error) {
    console.error('Erro ao registrar dados na tabela Region:', error);
    res.status(500).json({ error: 'Erro ao registrar dados.' });
  }
});

module.exports = router;
