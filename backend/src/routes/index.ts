import { Router, Request, Response } from "express";
import cadastradosRouter from "./CadastradosRoutes";


const routes = Router();

routes.use("/cadastrados", cadastradosRouter)
routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;