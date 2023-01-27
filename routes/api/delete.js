const express =require('express')
const router =express.Router()
const path=require('path')
const notes= require('../../notes.js')
const Joi = require('@hapi/joi')


router.get('/',(req,res)=>res.send(notes.loadNotes()))


const schema1 = Joi.object({
    title: Joi.string().required(),
    
})

router.post('/', (req, res) => {
    const { error } = schema1.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message })
    } else {
        notes.removeNote(req.body.title)
        res.json({ message: `Note with title ${req.body.title} removed.` });
       
    }
})

module.exports= router