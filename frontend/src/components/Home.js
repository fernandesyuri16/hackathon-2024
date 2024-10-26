import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const userId = sessionStorage.getItem('userId'); // Obtém o userId do estado de navegação
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      const fetchHistory = async () => {
        try {
          // Chama a rota para obter o histórico completo do usuário
          const response = await axios.get(`http://localhost:3000/api/result/${userId}/history`);
          setHistory(response.data);
        } catch (err) {
          setError('Erro ao carregar histórico');
        }
      };
      fetchHistory();
    }
  }, [userId]);

  return (
    <div className="dashboard">
      <h2>Bem-vindo ao Dashboard</h2>

      {error && <p className="error">{error}</p>}

      <div className="dashboard-section">
        <h3>Histórico de Resultados</h3>
        <ul className="history-list">
          {history.length > 0 ? (
            history.map((result, index) => (
              <li key={index} className="history-item">
                <p><strong>Data:</strong> {new Date(result.date).toLocaleDateString()}</p>
                <p><strong>ID da Pergunta:</strong> {result.questionId}</p>
                <p><strong>Resposta:</strong> {result.response}</p>
              </li>
            ))
          ) : (
            <p>Nenhum histórico encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
