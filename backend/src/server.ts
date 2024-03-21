import express, { Request, Response, Router } from 'express'
import routes from './routes';
import cors from 'cors';
import './config/enviroument'
import configuracaoCors from './config/cors';
import { Cadastrado } from './entities/Cadastrados';

const PORT = process.env.PORT?? 3000;
const app = express();

app.use(express.json());
app.use(cors(configuracaoCors.configcors()));

app.use(routes);

(async () => {
    try {
      await Cadastrado.sync({ alter: true });
    } catch (error) {
      console.log('Erro ao sincronizar');
    }
})();

app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT} no ambiente ${process.env.NODE_ENV}`);
})  