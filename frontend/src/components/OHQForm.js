import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './OHQForm.css';
import '../App.css';

export default function OHQForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
                const res = await axios.get('http://localhost:3000/api/ohq');
                setQuestions(res.data);
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
            await axios.post('http://localhost:3000/api/submit', responseData);
            const resultRes = await axios.get(`http://localhost:3000/api/result/${userId}`);
            navigate('/result', { state: { result: resultRes.data } });
        } catch (error) {
            console.error('Erro ao enviar respostas:', error);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="form-ohq">
            <div className="grid">
                <form onSubmit={handleSubmit} className="form">
                    {currentQuestion ? (
                        <div className="question-container" key={currentQuestion.id}>
                            <label className="question-label">
                                {`${currentQuestionIndex + 1}. ${currentQuestion.text}`}
                            </label>
                            <div id='question-response'>
                                {responseLabels.map(({ value, label }) => (
                                    <label key={value} className="radio-option">
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

                    <div className="form__field text--center">
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
            </div>
        </div>
    );
}
