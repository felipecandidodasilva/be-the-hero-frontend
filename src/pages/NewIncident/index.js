import React, {useState} from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
          await api.post('incidents', data, {
              headers: {
                  Authorization: ongId,
              }
          });
          history.push('/profile')  ;

        } catch (error) {
            alert('Erro ao salvar o caso, tente novamente');
        }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero Logo"/>

                <h1>Cadastrar novo caso</h1>
                <p>descreva o cado detalhadamente para encontrar um herói para resolver isso.</p>
            
                <Link to="/profile" className='back-link'>
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar para home.
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Titulo do caso"
                />

                <textarea  
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Descrição"
                />

                <input 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="valor em reais"
                />

                <button type="submit" className="button">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}