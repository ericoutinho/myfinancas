const sequelize = require("sequelize");
const model = require("../models");
const categoria = model.Categoria;

module.exports = {
    async create(request, response) {
        try {
            const { descricao } = request.body;
            const Categoria = await categoria.create({ descricao:descricao });
            return response.json({msg: "Categoria criada com sucesso"});
        } catch (error) {
            return response.json({msg: "Não foi possível criar a categoria " + error})
        }
    },
    async update(request, response) {
        try {
            const { id } = request.params;
            const { descricao } = request.body;
            const Categoria = await categoria.update({descricao}, {where: {id}});
            return response.json({msg: "Categoria atualizada com sucesso"});
        } catch (error) {
            return response.json({msg: "Não foi possível atualizar a categoria " + error})
        }
    },
    async findAll(request, response) {
        try {
            const { page } = request.params;
            const limit = 5;
            const Categoria = await categoria.findAndCountAll({
                order: [["id","ASC"]],
                limit: limit,
                offset: parseInt(page)
            });
            return response.json(Categoria);
        } catch (error) {
            return response.json({msg: "Não foi possível recuperar as categorias " + error})
        }
    }
}