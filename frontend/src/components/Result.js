import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css';

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result } = location.state || {};

    if (!result || !result.feedback) {
        return (
            <div className="result-container">
                <div className="grid">
                    <p>Nenhum resultado disponível.</p>
                </div>
            </div>
        );
    }

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="result-container">
            <div className="grid-results">
                <h2>Seu Resultado</h2>
                <p className="feedback">{result.feedback}</p>
                <button className="go-home-button" onClick={handleGoHome}>
                    Ir para Início
                </button>
            </div>
        </div>
    );
}

export default Result;
