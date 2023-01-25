const express =require('express')
const path=require('path')
const bodyParser = require('body-parser');
const app =express();

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/member',require('./routes/api/member'))

const PORT =process.env.PORT|| 4000;
app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`)
})