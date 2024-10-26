const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const ohqRoutes = require('../routes/ohqForm.js'); // Ajuste o caminho conforme necessário

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Permitir requisições de qualquer origem
app.use(express.json());

// Rota para listar usuários
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Rota para criar um usuário
app.post('/api/users', async (req, res) => {
  const { name, email, password, hasInsurance, familySize} = req.body;

  try {
    console.log('1')    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('2')
    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPassword, familySize, hasInsurance},
    });
    console.log('3')
    res.status(201).json(newUser);
    console.log('4')
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const userId = user.id;

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.json({ message: 'Login bem-sucedido', userId});
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Configurar as rotas do questionário OHQ
app.use('/api', ohqRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
