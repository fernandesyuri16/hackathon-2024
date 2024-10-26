import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope} from 'react-icons/fa';
import './Login.css';
import '../App.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Defina o estado de erro
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      // Se o login for bem-sucedido, redireciona para login-success
      if (response.data.message === 'Login bem-sucedido') {

        const userId = response.data.userId;

        navigate('/questions', { state: { userId } });
      }
    } catch (err) {
      // Exibe erro caso as credenciais estejam erradas
      setError(err.response?.data?.message || 'Erro ao fazer login ', {error});
    }
  };

  return (
    <div className="form-login">
      <div className="grid">
        <form onSubmit={handleLogin} className="form login">
          <h2 className="text--center">Login</h2>
          <div className="form__field">
            <label htmlFor="login__username">
            <FaEnvelope className="icon" /> {/* Ícone de usuário */}
              <span className="hidden">Email</span>
            </label>
            <input
              id="login__username"
              type="email"
              className="form__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__password">
              <FaLock className='icon'/>
              <span className="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              className="form__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <input type="submit" value="Login" />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>

        <p className="text--center">
          Não tem uma conta? <a href="/register">Cadastre-se</a>{' '}
          <svg className="icon">
            <use xlinkHref="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
    </div>
  );
}

export default Login;
