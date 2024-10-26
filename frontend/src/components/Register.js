import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativa o estado de carregamento

    try {
      console.log('Cadastrando:', name, email, password);

      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar.');
      }

      console.log('Cadastro bem-sucedido!');
      setName(''); // Limpa o campo de nome
      setEmail(''); // Limpa o campo de email
      setPassword(''); // Limpa o campo de senha
      navigate('/home'); // Redireciona para a página de login após o cadastro
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      alert('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="form-register">
      <div className="grid">
        <form onSubmit={handleRegister} className="form login">
          <h2 className="text--center">Cadastro</h2>

          <div className="form__field">
            <label htmlFor="register__name">
              <FaUser className="icon" />
              <span className="hidden">Nome</span>
            </label>
            <input
              id="register__name"
              type="text"
              className="form__input"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="register__email">
              <FaEnvelope className="icon" />
              <span className="hidden">Email</span>
            </label>
            <input
              id="register__email"
              type="email"
              className="form__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="register__password">
              <FaLock className="icon" />
              <span className="hidden">Senha</span>
            </label>
            <input
              id="register__password"
              type="password"
              className="form__input"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <input 
              type="submit" 
              value={loading ? "Cadastrando..." : "Cadastrar"} 
              disabled={loading} // Desabilita o botão enquanto carrega
            />
          </div>
        </form>

        <p className="text--center">
          Já tem uma conta? <a href="/">Faça login</a> <FaArrowRight className="icon" />
        </p>
      </div>
    </div>
  );
}

export default Register;
