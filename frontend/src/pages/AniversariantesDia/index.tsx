import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { IMaskInput } from "react-imask";
import { toast } from 'react-toastify';
import logoPequeno from "../../assets/logoPequeno.png"
import { MdContactPage, MdDeleteForever, MdPersonAddAlt1 } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import "./index.css"
import  Axios  from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

interface UserData {
    id: number;
    nome: string;
    empresa: string;
    data_nascimento: string;
    telefone: string
}

export default function AniversariantesDia() {
    const [list, setList] = useState<UserData[]>([]);

    useEffect(() => {
        Axios.get("http://localhost:3000/cadastrados/selecionar/aniversariantes/dia").then((resp) => {
            var dados = resp.data
            var novoDados: UserData[] = [];
            let total_count = 0;
            for (var k in dados) {

                var novoDado: UserData = {
                    id: dados[k].id,
                    nome: dados[k].nome,
                    empresa: dados[k].empresa,
                    data_nascimento: dados[k].data_nascimento,
                    telefone: dados[k].telefone
                };
                novoDados.push(novoDado)
            }
            setList(novoDados);
        });
    }, [])

    return (
        <div id="container">
          <nav id="nav">
            <div>
              <div className="div-logoPequeno">
                <img src={logoPequeno} alt="Logo onvale pequeno: um O estilizado com um v dentro" />
              </div>
              <div className="icones-paginas">
                <Link to="/"><MdPersonAddAlt1 color="white" size={55} /></Link>
                <Link to="/cadastrados"><FaAddressBook color="white" size={55} /></Link>
                <Link to="/aniversariosMes"><FaRegCalendarAlt color="white" size={55} /></Link>
                <Link to="/aniversariosDia"><BiSolidBellRing color="white" size={55} /></Link>
              </div>
            </div>
          </nav>
          <main id="cadastrados">
            {list.length === 0 ? (
              <div className='content content-null'>
                <p>Nenhum aniversariante hoje</p>
              </div>
            ) : (
              <div className="content">
                <h1>Aniversariantes do Dia</h1>
                <div className='container-list'>
                    <div className="titles-list">
                        <p>Nome</p>
                        <p>Aniversário</p>
                    </div>
                    {typeof list !== 'undefined' && list.map((value) => (
                        <div key={value.id} className="list-item">
                            <div className="item-label">{value.nome}</div>
                            <div id="item-action">                              
                                <strong>{new Date(value.data_nascimento).getUTCDate().toString().padStart(2, '0')}/{(new Date(value.data_nascimento).getUTCMonth()+1).toString().padStart(2, '0')}/{new Date(value.data_nascimento).getUTCFullYear().toString()}</strong>  
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            )}
          </main>
        </div>
      );
}