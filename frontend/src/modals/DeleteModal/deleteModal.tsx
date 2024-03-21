import React from "react";
import "./index.css"
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import Axios from 'axios';
import { toast } from 'react-toastify';

interface ModalProps {
  onClose: () => void;
  itemId: number | null;
}

const Modal: React.FC<ModalProps> = ({ onClose, itemId }) => {

  const handleDelete = async () => {
    try {
      await Axios.delete(`http://localhost:3000/cadastrados/deletar/${itemId}`);
      toast.success("Cliente deletado com sucesso!");
    } catch (error) {
      toast.error('Erro ao cadastrar.');
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div id="modal">
        <div className="deleteModal-title">
          <h2>Ao confirmar a exclusão do(a) cadastrado(a) esta ação não poderá ser desfeita.</h2>
        </div>
        <div className="div-botoes">
          <div className="cancelar">
            <MdCancel color='#EB3223' size={50} onClick={onClose} />
            <p>Cancelar</p>
          </div>
          <div className="confirmar">
            <FaCircleCheck color="#75F94C" size={41} onClick={handleDelete} />
            <p>Confirmar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
