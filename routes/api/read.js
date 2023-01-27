const express =require('express')
const router =express.Router()
const path=require('path')
const notes= require('../../notes.js')
const Joi = require('@hapi/joi')


router.get('/',(req,res)=>res.send(notes.loadNotes()))


const schema = Joi.object({
    title: Joi.string().required(),
    
})

// router.post('/', (req, res) => {

//     const { error } = schema1.validate(req.body);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message })
//     } else {
//         res.json({ message: `Note with title ${req.body.title} is.` })
//         const readNotesResponse = notes.readNotes(req.body.title)
//         if (readNotesResponse.status === 400) {
//             return res.status(400).json({ error: readNotesResponse.message });
//         }
//         if(readNotesResponse.status === 200) {
//             return res.status(200).json({ message:readNotesResponse.message });
//         } 
       
//     }
// })

router.post('/', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } 
    else{
    
    const  readNotesResponse= notes.readNotes(req.body.title);
    if (readNotesResponse.status === 400) {
        return res.status(400).json({ error: readNotesResponse.message });
    }
    if(readNotesResponse.status === 200) {
        return res.status(200).json({ message: readNotesResponse.message });
    } 
}
})


module.exports= router