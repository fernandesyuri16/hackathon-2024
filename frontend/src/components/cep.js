import React, { useState } from 'react';
import axios from 'axios';
import './cep.css'; // Estilização opcional

export default function CepValidator() {
    const [cep, setCep] = useState('');
    const [cepData, setCepData] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [error, setError] = useState('');

    const handleCepChange = (e) => {
        setCep(e.target.value);
    };

    const handleCepSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (response.data.erro) {
                    throw new Error('CEP não encontrado.');
                }
                setCepData(response.data);
                setShowPopup(false); // Fecha o pop-up após o envio
            } catch (error) {
                setError(error.message || 'Erro ao obter dados do CEP. Tente novamente.');
            }
        } else {
            setError('CEP deve ter 8 dígitos');
        }
    };

    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Validação de CEP</h3>
                        <form onSubmit={handleCepSubmit}>
                            <input
                                type="text"
                                value={cep}
                                onChange={handleCepChange}
                                placeholder="Digite seu CEP"
                                required
                            />
                            <button type="submit">Enviar</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            )}
            {cepData && (
                <div className="cep-data">
                    <h4>Dados do CEP</h4>
                    <pre>{JSON.stringify(cepData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
