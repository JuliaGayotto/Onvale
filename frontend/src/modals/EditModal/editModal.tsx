// EditModal.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import "./index.css";
import Axios from 'axios';
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";

interface EditModalProps {
  onClose: () => void;
  itemId: number | null;
}

interface UserData {
  id: number;
  nome: string;
  empresa: string;
  data_nascimento: string;
  telefone: string;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, itemId }) => {
  const [clientData, setClientData] = useState<UserData>({
    id: 0,
    nome: "",
    empresa: "",
    data_nascimento: "",
    telefone: ""
  });

  useEffect(() => {
    if (itemId) {
      Axios.get(`http://localhost:3000/cadastrados/selecionar/${itemId}`)
        .then(response => {
          setClientData(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar dados do cliente:", error);
        });
    }
  }, [itemId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:3000/cadastrados/atualizar/${itemId}`, clientData)
      .then(response => {
        toast.success("Cliente atualizado com sucesso!")
        onClose();
      })
      .catch(error => {
        toast.error("Erro ao atualizar o cliente.")
      });
  };

  return (
    <div className="modal-overlay">
      <div id="modal">
        <div className="modal-title">
          <h1><strong>Editar Cliente</strong></h1>
        </div>
        <div id="div-cadastro">
          <label htmlFor="nome">Nome:</label>
          <input type="text" name="nome" id="nome" value={clientData.nome} onChange={handleChange} />
          <label htmlFor="empresa">Empresa:</label>
          <input type="text" name="empresa" id="empresa" value={clientData.empresa} onChange={handleChange} />
          <div id="duplo-cadastro">
            <div id="cadastro-duplo">
              <label htmlFor="data-nascimento">Data de Nascimento:</label>
              <input type="date" name="data_nascimento" id="data-nascimento" value={clientData.data_nascimento} onChange={handleChange} />
            </div>
            <div id="cadastro-duplo">
              <label htmlFor="tel">Telefone:</label>
              <IMaskInput mask=" +00 (00) 00000-0000" placeholder='Telefone' value={clientData.telefone} onChange={handleChange} type="text" name="telefone" id="tel" />
            </div>
          </div>
        </div>
        <div id="buttons">
          <button id="cancelar" onClick={onClose}>Cancelar</button>
          <button id="atualizar" onClick={handleUpdate}><strong>Atualizar</strong></button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
