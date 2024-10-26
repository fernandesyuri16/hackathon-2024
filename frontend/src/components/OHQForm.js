import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function OHQForm({ onResult }) {
    const location = useLocation();
    const { userId } = location.state || {}; // Obtém userId do estado da navegação
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();


    // Labels descritivos para as opções de resposta
    const responseLabels = [
        { value: 1, label: "Discordo completamente" },
        { value: 2, label: "Discordo moderadamente" },
        { value: 3, label: "Discordo minimamente" },
        { value: 4, label: "Concordo minimamente" },
        { value: 5, label: "Concordo moderadamente" },
        { value: 6, label: "Concordo completamente" }
    ];

    useEffect(() => {
    async function fetchQuestions() {
        try {
        const res = await fetch('http://localhost:3000/api/ohq');
        if (!res.ok) throw new Error(`Erro: ${res.status} - ${res.statusText}`);
        const data = await res.json();
        setQuestions(data);
        } catch (error) {
        console.error('Erro ao buscar questões:', error);
        }
    }
    fetchQuestions();
    }, []);

    const handleChange = (questionId, value) => {
    setResponses({ ...responses, [questionId]: parseInt(value, 10) });
    };

    const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    };

    const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const responseData = {
            userId,
            responses: Object.entries(responses).map(([questionId, response]) => ({
            questionId: parseInt(questionId, 10),
            response,
            }))
        };

        try {
            // Envia os dados com axios
            await axios.post('http://localhost:3000/api/submit', responseData);

            // Obtém o resultado do questionário após a submissão
            const resultRes = await axios.get(`http://localhost:3000/api/result/${userId}`);
            navigate('/result', { state: { result: resultRes.data } });
        } catch (error) {
            console.error('Erro ao enviar respostas:', error);
        }
    };


    const currentQuestion = questions[currentQuestionIndex];

    return (
    <form onSubmit={handleSubmit}>
        {currentQuestion ? (
        <div key={currentQuestion.id}>
            <label>
            {`${currentQuestionIndex + 1}. ${currentQuestion.text}`}
            </label>
            <div>
            {responseLabels.map(({ value, label }) => (
                <label key={value} style={{ display: "block", margin: "5px 0" }}>
                <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={value}
                    checked={responses[currentQuestion.id] === value}
                    onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                />
                {label}
                </label>
            ))}
            </div>
        </div>
        ) : (
        <p>Carregando perguntas...</p>
        )}

        <div>
        {currentQuestionIndex > 0 && (
            <button type="button" onClick={handlePrevQuestion}>
            Anterior
            </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
            <button
            type="button"
            onClick={handleNextQuestion}
            disabled={!responses[currentQuestion?.id]}
            >
            Próxima
            </button>
        ) : (
            <button type="submit" disabled={Object.keys(responses).length < questions.length}>
            Enviar Respostas
            </button>
        )}
        </div>
    </form>
    );
}
