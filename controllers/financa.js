const sequelize = require("sequelize");
const model = require("../models");
const financa = model.Financa;
const Op = sequelize.Op;

module.exports = {
    async create(request, response) {
        try {
            const { data, categoria_id, titulo, valor } = request.body;
            const Financa = await financa.create({ data, categoria_id, titulo, valor });
            return response.json({msg: "Finança criada com sucesso"});
        } catch (error) {
            return response.json({msg: "Não foi possível criar a finança " + error})
        }
    },
    async update(request, response) {
        try {
            const { id } = request.params;
            const { data, categoria_id, titulo, valor } = request.body;
            const Financa = await financa.update({data, categoria_id, titulo, valor}, {where: {id}});
            return response.json({msg: "Finança atualizada com sucesso"});
        } catch (error) {
            return response.json({msg: "Não foi possível atualizar a finança " + error})
        }
    },
    async findAll(request, response) {
        try {
            const { page } = request.params;
            const limit = 5;
            const Financa = await financa.findAndCountAll({
                include: {all: true},
                order: [["data","ASC"]],
                limit: limit,
                offset: parseInt(page)
            });
            return response.json(Financa);
        } catch (error) {
            return response.json({msg: "Não foi possível recuperar as finanças " + error})
        }
    },
    async findAllDate(request, response) {
        try {
            const { page, dateStart, dateEnd } = request.params;
            const limit = 5;
            const Financa = await financa.findAndCountAll({
                include: {all: true},
                order: [["data","ASC"]],
                limit: limit,
                offset: parseInt(page),
                where: {
                    data: {
                        [Op.gte]: dateStart,
                        [Op.lte]: dateEnd
                    }
                }
            });
            return response.json(Financa);
        } catch (error) {
            return response.json({msg: "Não foi possível recuperar as finanças " + error})
        }
    },

    async findByCategory(request, response) {
        try {
            const {category, page} = request.params;
            const limit = 5;
            const Financa = await financa.findAndCountAll({
                include: {all: true},
                order: [["data","ASC"]],
                limit: limit,
                offset: parseInt(page),
                where: {
                    categoria_id: category
                }
            });
            return response.json(Financa);
        } catch(error) {
            return response.json({msg: "Não foram encontradas finanças para esta categoria. " + error});
        }
    },

    async sumByCategory(request, response) {
        try {
            const {category} = request.params;
            let balance = 0;
            const Financa = await financa.findAll({
                where: {
                    categoria_id: category
                }
            });
            if (Financa.length === 0) {
                return response.json({saldo: balance});
            }
            for (f of Financa) {
                balance+= f.valor;
            }
            return response.json({saldo: balance});

        } catch (error) {
            return response.json({msg: "Não foi possível exibir saldo da categoria. " + error});
        }
    },

    async delete(request, response) {
        try {
            const {id} = request.params;
            const Financa = await financa.destroy({
                where: {
                    id: id
                }
            });
            return response.json({msg: "Finança excluída com sucesso!"});
        } catch(error) {
            return response.json({msg: "Não foi possível excluir a finança. " + error})
        }
    }
}