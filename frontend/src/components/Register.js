import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaEnvelope} from 'react-icons/fa';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Cadastrando:', name, email, password);
      navigate('/'); // Redireciona para a página de login após o cadastro
    } catch (error) {
      console.error('Erro no cadastro:', error);
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
            <input type="submit" value="Cadastrar" />
          </div>
        </form>

        <p className="text--center">
          Já tem uma conta? <a href="/">Faça login</a> <FaArrowRight className="icon" /> {/* Ícone de seta */}
        </p>
      </div>
    </div>
  );
}

export default Register;
