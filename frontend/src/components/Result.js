import React from 'react';
import { useLocation } from 'react-router-dom';

function Result() {
    const location = useLocation();
    const { result } = location.state || {};

    if (!result) {
        return <p>Nenhum resultado disponível.</p>;
    }

    return (
        <div>
            <h2>Resultado do Questionário:</h2>
            <p>{JSON.stringify(result)}</p>
        </div>
    );
}

export default Result;
