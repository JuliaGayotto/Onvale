import { Request, Response } from "express";
import { Cadastrado } from "../entities/Cadastrados"
import { ICadastrados } from "../interfaces/ICadastrados";
import CadastradosRepository from "../repositories/CadastradosRepository";

const cadastradosRepository = new CadastradosRepository();

export default class Cadastrados {
    async readCadastrado(Request: Request, Response: Response) {
        try {
            const idCadastrado = parseInt(Request.params.id);
            const cadastrado = await cadastradosRepository.findById(idCadastrado);
            Response.status(200).json(cadastrado);
        } catch(error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async readCadastrados(Request: Request, Response: Response) {
        try {
            const cadastrados = await cadastradosRepository.findAll();
            Response.status(200).json(cadastrados);
        } catch(error) {
            console.error(error);
            Response.status(500).json('Internal Server error');
        }
    }

    async createCadastrado(Request: Request, Response: Response) {
        try {
            const cadastrado: ICadastrados = Request.body;
            await cadastradosRepository.create(cadastrado);
            Response.status(201).send(cadastrado);
        } catch (error) {
            Response.status(500).send({ error: 'Internal Server error', message: error.message });
        }
    }

    async updateCadastrado(Request: Request, Response: Response) {
        try {
            const cadastrado: ICadastrados = Request.body;
            await cadastradosRepository.update(cadastrado);
            Response.status(200).json(cadastrado);
        } catch (error) {
            Response.status(500).send('Internal Server error');
        }
    }

    async deleteCadastrado(Request: Request, Response: Response) {
        try {
            const idCadastrado = parseInt(Request.params.id);
            const cadastradoDeletado = await cadastradosRepository.delete(idCadastrado);
            Response.status(200).json(cadastradoDeletado);
        } catch (error) {
        Response.status(500).send('Internal Server error');
        }
    }
}

