const fs= require('fs');
const { uptime } = require('process');

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
    } 
    else if(unit<=0)
    {
        return { status: 400, message: "Unit should be greater than zero" };
    }else {
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
    const removedNotes= notes.filter((note)=> note.title!==title)
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
// const readNotes =(title)=>
// {   const notes=loadNotes()
//     //console.log('Your note is:')
//     const foundNote =notes.find((note)=> note.title===title)
//     if(foundNote){
//        // console.log("price:",foundNote.price," unit:",foundNote.unit)
//     }
// }

const readNotes = (title) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        return { status: 200, message: `Books details are: Price: ${duplicateNote.price} , Unit: ${duplicateNote.unit}` };
    } 
    else {
        return { status: 400, message: "Book not present in the database" };
    }
};

//Update the details in database
const updateNotes = (title,price,unit) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        fs.readFile('notes.json', 'utf8', (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].title === title) {
                    notes[i].price = price;
                    notes[i].unit = unit;
                    break;
                }
            }
            fs.writeFile('notes.json', JSON.stringify(notes), 'utf8', (err) => {
                if (err) throw err;
                console.log('The file has been updated!');
            });
        });
        
        return { status: 200, message: `Books details of title ${duplicateNote.title} are Updated` };
    } 
    else {
        return { status: 400, message: "Book not present in the database" };
    }
};

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
    loadNotes:loadNotes,
    updateNotes: updateNotes
}