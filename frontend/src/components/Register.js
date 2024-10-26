import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import './Register.css';
import axios from 'axios';
import logo from './logo.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cep, setCep] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false); // Estado para "Possui convênio?"
  const [familySize, setFamilySize] = useState(''); // Estado para "Número de pessoas na família"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Cadastrando:', name, email, password, cep, hasInsurance, familySize);
      const obj = {name, email, password, cep, familySize, hasInsurance }

      const response = await axios.post('http://localhost:3000/api/users', obj);

      console.log('Cadastro bem-sucedido!');
      setName('');
      setEmail('');
      setPassword('');
      setHasInsurance(false);
      setFamilySize(0);
      navigate('/home');
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      alert('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-register">
      <div className="grid">
        <div className="logo-container">
          <img src={logo} alt="LifeScore Logo" className="logo" />
        </div>
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

          {/* Campo de Seleção para "Possui Convênio?" */}
          <div className="form__field">
            <label htmlFor="register__hasInsurance">Possui Convênio?</label>
            <select
              id="register__hasInsurance"
              type="boolean"
              className="form__input"
              value={hasInsurance}
              onChange={(e) => setHasInsurance(Boolean(e.target.value))}
              required
            >
              <option value="">Selecione</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>

          {/* Campo para CEP */}
          <div className="form__field">
            <label htmlFor="register__familySize">CEP</label>
            <input
              id="register__familySize"
              type="number"
              className="form__input"
              value={cep}
              onChange={(e) => setCep(Number(e.target.value))}
              required
            />
          </div>

          {/* Campo para Número de Pessoas na Família */}
          <div className="form__field">
            <label htmlFor="register__familySize">Número de Pessoas na Família</label>
            <input
              id="register__familySize"
              type="number"
              className="form__input"
              placeholder="Ex: 4"
              value={familySize}
              onChange={(e) => setFamilySize(Number(e.target.value))}
              required
            />
          </div>

          <div className="form__field">
            <input
              type="submit"
              value={loading ? "Cadastrando..." : "Cadastrar"}
              disabled={loading}
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
