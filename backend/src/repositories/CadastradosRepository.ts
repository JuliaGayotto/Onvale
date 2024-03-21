import { ICadastrados } from "../interfaces/ICadastrados";
import { Cadastrado } from "../entities/Cadastrados";
import { Op, Sequelize} from 'sequelize';

export default class CadastradosRepository {

    async findAll() {
        try {
            return await Cadastrado.findAll({
                order: [
                    ['nome', 'ASC'] 
                ]
            });
        } catch (error) {
            console.error(error);
        }
    }
    

    async findAniversariantesDoMes() {
        try {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
    
            const aniversariantes = await Cadastrado.findAll({
                attributes: ['nome', 'data_nascimento'],
                where: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('data_nascimento')), currentMonth),
                    ],
                },
                order: [
                    ['nome', 'ASC'] 
                ]
            });
    
            return aniversariantes;
        } catch (error) {
            console.error(error);
        }
    }

    async findAniversariantesDoDia() {
        try {
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentMonth = currentDate.getMonth() + 1;
    
            const aniversariantes = await Cadastrado.findAll({
                attributes: ['nome', 'data_nascimento'],
                where: {
                    [Op.and]: [
                        Sequelize.literal(`DAY(data_nascimento) = ${currentDay}`),
                        Sequelize.literal(`MONTH(data_nascimento) = ${currentMonth}`)
                    ]
                },
                order: [
                    ['nome', 'ASC'] 
                ]
            });
    
            return aniversariantes;
        } catch (error) {
            console.error(error);
        }
    }
    
    async findById(id: number) {
        try {
            return await Cadastrado.findByPk(id);
        } catch (error) {
            console.error(error);
        }
    }

    async create(cadastrado: ICadastrados) {
        try {
            return await Cadastrado.create({
                nome: cadastrado.nome,
                empresa: cadastrado.empresa,
                data_nascimento: cadastrado.data_nascimento,
                telefone: cadastrado.telefone
            });
        } catch (error) {
            console.error(error);
        }
    }

    async update(cadastrado: ICadastrados) {
        try {
            return await Cadastrado.update(
                {
                    id: cadastrado.id,
                    nome: cadastrado.nome,
                    empresa: cadastrado.empresa,
                    data_nascimento: cadastrado.data_nascimento,
                    telefone: cadastrado.telefone,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        id: cadastrado.id,
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }


    async delete(cadastradoId: number) {
        try {
          return await Cadastrado.destroy({where: { id: cadastradoId }});
        } catch (error) {
            console.error(error);
        }
    }
}
