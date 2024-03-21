import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import { IMaskInput } from "react-imask";
import { toast } from 'react-toastify';
import logoPequeno from "../../assets/logoPequeno.png"
import { MdContactPage, MdDeleteForever, MdPersonAddAlt1 } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import EditModal from "../../modals/EditModal/editModal"; 
import DeleteModal from "../../modals/DeleteModal/deleteModal"; 
import "./index.css"
import  Axios  from 'axios';

interface UserData {
    id: number;
    nome: string;
    empresa: string;
    data_nascimento: string;
    telefone: string
}

export default function Cadastrados() {
    const [list, setList] = useState<UserData[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const fetchData = useCallback(() => {
      Axios.get("http://localhost:3000/cadastrados/selecionar")
          .then((resp) => {
              const dados = resp.data;
              const novoDados: UserData[] = [];
              for (const k in dados) {
                  const novoDado: UserData = {
                      id: dados[k].id,
                      nome: dados[k].nome,
                      empresa: dados[k].empresa,
                      data_nascimento: dados[k].data_nascimento,
                      telefone: dados[k].telefone
                  };
                  novoDados.push(novoDado)
              }
              setList(novoDados);
          })
          .catch((error) => {
              toast.error("Erro ao buscar dados da lista. Por favor, tente novamente mais tarde.");
          });
  }, []);

  useEffect(() => {
      fetchData();
  }, [fetchData]);

    const openModal = (id: number, modalType: string) => {
        setSelectedItemId(id);
        if (modalType === 'editModal') {
            setShowEditModal(true);
        } else if (modalType === 'deleteModal') {
            setShowDeleteModal(true);
        }
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        fetchData()
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        fetchData();
    }

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
              <div className='content'>
                <h1>Nenhum cliente foi cadastrado...</h1>
              </div>
            ) : (
              <div className="content">
                <h1>Clientes Cadastrados</h1>
                <div id='container-list'>
                    <div id="titles-list">
                        <p>Nome</p>
                        <p>Ações</p>
                    </div>
                    <div id="grupo-itens">
                      {typeof list !== 'undefined' && list.map((value) => (
                          <div key={value.id} id="list-item">
                              <div id="item-label">{value.nome}</div>
                              <div id="item-action">
                                  <MdContactPage color='#2F44FF' size={41} onClick={() => openModal(value.id, 'editModal')} />
                                  <MdDeleteForever color="#F42020" size={41} onClick={() => openModal(value.id, 'deleteModal')} />
                              </div>
                          </div>
                      ))}
                    </div>
                </div>
              </div>
            )}
          </main>
          {showEditModal && <EditModal onClose={closeEditModal} itemId={selectedItemId} />}
          {showDeleteModal && <DeleteModal onClose={closeDeleteModal} itemId={selectedItemId} />}
        </div>
      );
}
