// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt'); // Para comparar senhas criptografadas
const jwt = require('jsonwebtoken'); // Para criar o token JWT
const User = require('../models/User'); // Modelo do usuário
const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Procura o usuário no banco de dados
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Compara a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gera um token JWT se as credenciais estiverem corretas
    const token = jwt.sign({ userId: user._id }, 'token', { expiresIn: '1h' });
    res.json({ token, message: 'Login bem-sucedido' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
