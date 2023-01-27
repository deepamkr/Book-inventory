const express =require('express')
const path=require('path')

const app =express();

//Body parser middleware


app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/member',require('./routes/api/member'))
app.use('/api/delete',require('./routes/api/delete'))
app.use('/api/read',require('./routes/api/read'))

const PORT =process.env.PORT|| 4000;
app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`)
})