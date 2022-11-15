const { response } = require('express');
const campanhas = require('../DB/models/campanhaModel')


module.exports = {


    async read(req, res){
        const campanhaList = await campanhas.find()
        return res.json(campanhaList)
    },

    async create(req, res){
        console.log(req.body)

        const {name, body, data} = req.body

        if(!name || !body){
            return res.status(400).json({error: "Necessário um nome/corpo da campanha!"
            });
        }

        const campanhaCreated = await campanhas.create({
            name,
            body,
            data
        })

        return res.json(campanhaCreated)
        //console.log(name)
        //console.log(body)
        //console.log(data)
    },

    async delete(req, res){
        const {id} = req.params

        const campanhaDeleted = await campanhas.findOneAndDelete({_id:id});

        if (campanhaDeleted){
            return res.json(campanhaDeleted)
        }

        return res.status(401).json({error: 'Não foi encontrado o registro'})
    },

    async update(req, res){
        const {id} = req.params
        const {name, body, data} = req.body

        const campanha = await campanhas.findOne({_id : id})

        if(body){
            campanha.name = name
            campanha.body = body
            campanha.data = data

            await campanha.save();
        }

        return res.json(campanha)
    }
}