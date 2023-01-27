const express =require('express')
const router =express.Router()
const path=require('path')
const notes= require('../../notes.js')
const Joi = require('@hapi/joi')


router.get('/',(req,res)=>res.send(notes.loadNotes()))

const schema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().integer().required(),
    unit: Joi.number().integer().required()
})

router.post('/', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const addNoteResponse = notes.addNote(req.body.title, parseInt(req.body.price), parseInt(req.body.unit));
        
        if (addNoteResponse.status === 400) {
            res.status(400).json({ error: addNoteResponse.message });
        }
        if(addNoteResponse.status === 200) {
            res.status(200).json({ message: addNoteResponse.message });
        } 
       
    }
})
// router.post('/:title', (req, res) => {
//     const { error } = schema1.validate(req.body);
//     if (error) {
//         res.status(400).json({ error: error.details[0].message })
//     } else {
//         notes.removeNote(req.body.title)
//         res.json({ message: `Note with title ${title} removed.` });
       
//     }
// })





// router.post('/',(req,res)=>{

//     const title= req.body.title
//     const unit= req.body.unit
//     const price= req.body.price
//     res.send(req.body)
// })



module.exports= router