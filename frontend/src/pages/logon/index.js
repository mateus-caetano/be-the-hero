import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import './styles.css'

import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

export default function Logon() {

    const [ id, setId ] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try{
            const res = await api.post('sessions', { id })
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', res.data.name)

            history.push('/profile')
        } catch(err) {
            alert('Falha no login, tente novamente')
        }
    }

    return(
        <div className="logon">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <a className="back-link" href="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </a>
                </form>
            </section>
            <img src={herosImg} alt="heroes" />
        </div>
    )
}