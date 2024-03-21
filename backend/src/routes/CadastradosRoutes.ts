import { Router } from 'express';
import CadastradoController from '../controllers/CadastradosController';
import CadastradosAniversariantesController from '../controllers/CadastradosAniversariantesController';

const cadastradosRouter = Router();

const cadastradoController = new CadastradoController();
const cadastradosAniversariantes = new CadastradosAniversariantesController();


cadastradosRouter.get('/selecionar/:id', cadastradoController.readCadastrado);
cadastradosRouter.get('/selecionar', cadastradoController.readCadastrados);
cadastradosRouter.post('/cadastrar', cadastradoController.createCadastrado);
cadastradosRouter.put('/atualizar/:id', cadastradoController.updateCadastrado);
cadastradosRouter.delete('/deletar/:id', cadastradoController.deleteCadastrado);
cadastradosRouter.get('/selecionar/aniversariantes/mes', cadastradosAniversariantes.readAniversariantesDoMes);
cadastradosRouter.get('/selecionar/aniversariantes/dia', cadastradosAniversariantes.readAniversariantesDoDia);

export default cadastradosRouter;
