import React, {useState} from 'react'; // para pagar o status
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './style.css';
// hook precisa começao com leta maiúscula Register estava com letra minuscula e deu erro

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const History = useHistory();

    async function handleRegister(e){
        e.preventDefault(); // Ele não deixa o evento padrão acontecer, que seria o reload da pagina
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try {
            const response = await api.post('ongs',data); // por padrão o axio envia em formato JSON, então não precisamos tratar 
            
            alert(`Seu ID de acesso: ${response.data.id}`); // colocando crase no lugar de aspas podemos enviar variáveis junto ao texto usando $
            History.push('/');
        } catch (error) {

            alert('Erro no cadastro, tente novamente.');
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero Logo"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre  na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                
                    <Link to="/" className='back-link'>
                        <FiArrowLeft size={16} color="#e02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                   
                    <input placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    
                    <input type="email" placeholder="E-mail"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     />

                    <input placeholder="Whatsapp"
                     value={whatsapp}
                     onChange={e => setWhatsapp(e.target.value)}
                     />

                    <div className="input-group">
                        <input placeholder="Cidade"
                         value={city}
                         onChange={e => setCity(e.target.value)}
                         />

                        <input placeholder="UF" style={{ width: 80 }}
                         value={uf}
                         onChange={e => setUf(e.target.value)}
                         />

                    </div>
                    <button type="submit" className="button">Registrar</button>
                </form>
            </div>
        </div>
    )
}