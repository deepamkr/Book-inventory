const express =require('express')
const router =express.Router()
const path=require('path')
const notes= require('../../notes.js')
const Joi = require('@hapi/joi')


router.get('/',(req,res)=>res.send(notes.loadNotes()))


router.get('/',(req,res)=>res.send(notes.loadNotes()))

const schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().integer().required(),
    unit: Joi.number().integer().required()
})

router.post('/', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } 
    else{
    
    const  updateNotesResponse= notes.updateNotes (req.body.title,req.body.price,req.body.unit);
    if (updateNotesResponse.status === 400) {
        return res.status(400).json({ error: updateNotesResponse.message });
    }
    if(updateNotesResponse.status === 200) {
        return res.status(200).json({ message: updateNotesResponse.message });
    } 
}
})

module.exports= router