const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // Instancia única para reuso

// Rota para obter todas as questões do questionário
router.get('/ohq', async (req, res) => {
    try {
        const questions = await prisma.question.findMany();
        res.json(questions);
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        res.status(500).json({ error: 'Falha ao buscar questões.' });
    }
});

// Rota para registrar respostas no banco de dados
router.post('/submit', async (req, res) => {
    const { userId, responses } = req.body;

    const prisma = new PrismaClient();

    try {
        // Certifique-se de que userId está definido antes de continuar
        if (!userId) {
        return res.status(400).json({ error: "userId é necessário" });
        }

        // Mapear as respostas com userId e questionId
        await prisma.oHQResponse.createMany({
        data: responses.map((response) => ({
            userId: userId,
            question: response.questionId,  // Confere questionId aqui
            response: response.response,
        })),
        });

        res.send({ message: 'Respostas registradas com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar respostas:', error);
        res.status(500).json({ error: 'Houve uma falha ao registrar as respostas.', error });
    }
});


// Rota para calcular e retornar o resultado do questionário
router.get('/result/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
        const responses = await prisma.oHQResponse.findMany({ where: { userId } });
        const score = calculateOHQScore(responses);
        const feedback = generateFeedback(score);
        res.json({ score, feedback });
    } catch (error) {
        console.error('Erro ao calcular o resultado:', error);
        res.status(500).json({ error: 'Falha no cálculo do resultado.' });
    }
});

// Função para calcular o score
function calculateOHQScore(responses) {
    const adjustedResponses = responses.map(response => {
        if ([1, 5, 6, 10, 13, 14, 19, 23, 24, 27, 28, 29].includes(response.question)) {
            return 7 - response.response;
        }
        return response.response;
    });
    return adjustedResponses.reduce((acc, val) => acc + val, 0) / 29;
}

// Função para gerar feedback com base no score
function generateFeedback(score) {
    if (score < 2) return 'Não Feliz';
    if (score < 5) return 'Moderadamente Feliz';
    return 'Muito Feliz';
}

module.exports = router;
