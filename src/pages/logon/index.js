import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './style.css'; 

import logoImg from '../../assets/logo.svg'
import heroImg from '../../assets/heroes.png'

import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');

    const History = useHistory();

    async function handleLogin(e){
         e.preventDefault(); // faz-se isso em todo formulário do react

         try {
             const response = await api.post('sessions', {id});

             localStorage.setItem('ongId', id);
             localStorage.setItem('ongName', response.data.name);

            History.push('/profile');

         } catch (error) {
             alert('falha no Login, tente novamente');
         }
    }

    return (
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Be the Hero Logo"/>
                <form onSubmit={handleLogin}>
                    <h1>faça seu Logon</h1>

                    <input 
                    placeholder='Sua ID' 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className='button'>Entrar</button>   

                    <Link to="/register" className='back-link'>
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
           </section>
           <img src={heroImg} alt="Heroes"/>
       </div>
    );
}