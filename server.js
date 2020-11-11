//CHAMAR BIBLIOTECAS
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const validation = require('./validation')
const service = require('./service')

//utilizar body-parser como json
app.use(bodyParser.json())
/* EXEMPLO FUNCAO
const minhaFuncao = (x,y) => {
    console.log(`A soma de ${x} e ${y} é: ${x + y}`)
}*/
app.listen(3000, () =>{
    console.log('notes-api is running at 3000')
    })
// ROTAS
//GET
app.get('/notes', async (req,res) => {
    const note = await service.listNotes()
    res.send(note)
})

app.get('/getNote/:id', async(req,res) => {
    const note = await service.getNote(req.params.id)
    res.send(note)
})
 
//DELETE
app.delete('/deleteNote/:id', async(req,res) => {
    const note = await service.deleteNote(req.params.id)
    if(note.status === 200) res.send('Note deleted')
    else res.send ('Cannot find note')
})
//PUT 
app.put('/updateNote/:id', async(req,res) => {
    const note = await service.getNote(req.params.id)
    if (note === null || note === undefined) res.send("Note doesn't exist")
    else {
        const validatedObj = await validation.validate(req.body)
        if(validatedObj.status !== 200) {
            res.send(validatedObj.error)
        } else {

            const validatedNote = {
                title: req.body.title,
                note: req.body.note,
                updatedAt: new Date()
            }
            
            const updatedNote = await service.updateNote(req.params.id, validatedNote)
            res.send(updatedNote)

        }
    }
}
)
//POST
app.post('/createnote', async(req,res) => {

    const validatedObj = await validation.validate(req.body)
    if(validatedObj.status !== 200) {
        res.send(validatedObj.error)
    } else {
        const note = await service.createNote(req.body)
        res.send(note) 
    }
})
