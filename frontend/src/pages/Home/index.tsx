import React, { ChangeEvent, useState } from "react";
import { Link } from 'react-router-dom';
import { IMaskInput } from "react-imask";
import { toast } from 'react-toastify';
import logoPequeno from "../../assets/logoPequeno.png"
import logo from "../../assets/logo.png"
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import "./index.css"
import  Axios  from 'axios';

export default function Home() {
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [nasc, setNasc] = useState('');
    const [tel, setTel] = useState('');

    function handleSubmit() {
        Axios.post("http://localhost:3000/cadastrados/cadastrar", {
          nome: nome,
          empresa: empresa,
          data_nascimento: nasc,
          telefone: tel
        }).then((response: any) => {
            toast.success('Cadastro feito com sucesso!');
            setNome('')
            setEmpresa('')
            setNasc('')
            setTel('')
        })
          .catch((error: any) => {
            console.error(error);
            toast.error('Erro ao cadastrar.');
          });
    }

    return (
       <div id="container">
        <nav id="nav">
            <div>
                <div className="div-logoPequeno">
                    <img src={ logoPequeno } alt="Logo onvale pequeno: um O estilizado com um v dentro" />
                </div>
                <div className="icones-paginas">
                    <Link to="/"><MdPersonAddAlt1 color="white" size={55}/></Link>
                    <Link to="/cadastrados"><FaAddressBook color="white" size={55}/></Link>
                    <Link to="/aniversariosMes"><FaRegCalendarAlt color="white" size={55}/></Link>
                    <Link to="/aniversariosDia"><BiSolidBellRing color="white" size={55}/></Link>
                </div>
            </div>
        </nav>
        <main>
            <div className="div-logo">
                <img id="logo" src={ logo } alt="Logo onvale: um O estilizado com um v dentro"/>
            </div>
            <div className="div-conteudo">
                <div className="div-cadastro">
                    <label htmlFor="nome">Nome:</label>
                    <input placeholder='Nome' type="text" name="nome" id="nome" className="input-cadastro" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    <label htmlFor="empresa">Empresa:</label>
                    <input placeholder='Email' value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="input-cadastro" type="text" name="empresa" id="empresa"/>
                    <div className="duplo-cadastro">
                        <div className="cadastro-duplo">
                            <label htmlFor="dataNascimento">Data de nascimento:</label>
                            <input placeholder='Data de nascimento' value={nasc} onChange={(e: ChangeEvent<HTMLInputElement>) => setNasc(e.target.value)} type="date" name="dataNascimento" id="dataNascimento"/>
                        </div>
                        <div className="cadastro-duplo">
                            <label htmlFor="telefone">Telefone:</label>
                            <IMaskInput mask=" +00 (00) 00000-0000" placeholder='Telefone' value={tel} onChange={(e: ChangeEvent<HTMLInputElement>) => setTel(e.target.value)} type="text" name="telefone" id="telefone"/>
                        </div>
                    </div>
                    <div className="button">
                        <button className="cadastro-submit" type="submit" onClick={() => handleSubmit()}><strong>Cadastrar</strong></button>
                    </div>
                </div>
            </div>
        </main>
       </div>
    )
}