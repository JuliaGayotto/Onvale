import { Request, Response } from "express";
import CadastradosRepository from "../repositories/CadastradosRepository";

const cadastradosRepository = new CadastradosRepository();

export default class TipoParametroController {
    async readAniversariantesDoMes(Request: Request, Response: Response) {
        try {
            const cadastrados = await cadastradosRepository.findAniversariantesDoMes();
            Response.status(200).json(cadastrados);
        } catch(error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async readAniversariantesDoDia(Request: Request, Response: Response) {
        try {
            const cadastrados = await cadastradosRepository.findAniversariantesDoDia();
            Response.status(200).json(cadastrados);
        } catch(error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

}
