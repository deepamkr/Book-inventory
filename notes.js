const fs= require('fs')

// the main function for the adding the data
// const addNote = (title,price,unit)=>
// {
//     const notes=loadNotes()
    
//     // const duplicateNotes = notes.filter((note)=>note.title===title)
//     const duplicateNote = notes.find((note)=>note.title===title)
    
//     if (!duplicateNote) 
//     {
//         notes.push({
//             title: title,
//             price: price,
//             unit: unit,
//         })
//         saveNotes(notes)
//         console.log('New book added!')
//     }
//     else{
        
//         console.log('Book title already present!')
//     }
    
// }
const addNote = (title, price, unit) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        return { status: 400, message: "Book title already taken" };
    } else {
        notes.push({
            title: title,
            price: price,
            unit: unit,
        });
        saveNotes(notes);
        return { status: 200, message: "New book added!" };
    }
};

const removeNote =(title)=>
{
    const notes=loadNotes()
    const removedNotes= notes.filter((note)=> note.title!==title || note.body!==body)
    //console.log(removedNotes,notes)
    if(removedNotes.length===notes.length)
    {
        console.log(('Title Not available'))
    }
    else{
        saveNotes(removedNotes)
        console.log('Title removed')
    }
    
    //console.log(title)
}
const listNotes =()=>
{
    const notes=loadNotes()
    notes.forEach(note => {
         console.log(note.title,":", note.price, note.unit)
        
    })
}
const readNotes =(title)=>
{   const notes=loadNotes()
    console.log('Your note is:')
    const foundNote =notes.find((note)=> note.title===title)
    if(foundNote){
        console.log(foundNote.body)
    }
}
// function made for saving the data reusable function

// const saveNotes=(notes)=>{

//     const dataJSON = JSON.stringify(notes)// json.stringify to convert to json 
//     fs.writeFileSync('notes.json',dataJSON) // ** probably replace the file woth new content
// }


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFile('notes.json', dataJSON, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The file has been saved!");
      }
    });
  };
  

//for loading the data
const loadNotes= ()=>
{   
    try{
        const dataBuffer= fs.readFileSync('notes.json')
        const dataJSON= dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e)
    {
        return []
    }
        
    
}

module.exports ={
    
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
    loadNotes:loadNotes
}