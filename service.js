const connection = require ('./config/connection')
const ObjectID = require('mongodb').ObjectID

const createNote = async(reqBody) =>{
   const client = await connection()
   await client.connect()

   try {
    const note = await client.db('notes-api').collection('notes').insertOne(reqBody)
    return{
        note : note.ops
    }
    }
   catch (error) {
    throw(error)
    }
    finally {
    client.close()

    }
}

const listNotes = async () => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('notes-api').collection('notes').find().toArray()
        return note
    }
    catch (error) {
    throw(error)
        }
        finally {
        client.close()
    
        }
}

const getNote = async (id) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('notes-api').collection('notes').findOne({
            _id: ObjectID(id)
        })
        return note
    }
    catch (error) {
    throw(error)
        }
        finally {
        client.close()
    
        }
}

const deleteNote = async (id) => {
    const client = await connection()
    await client.connect();
    try {
        const note = await client.db('notes-api').collection('notes').deleteOne({
            _id: ObjectID(id)
        })
        return {
            status : 200
        }
    }
    catch (error) {
    throw(error)
        }
        finally {
        client.close()
    
        }
}
// 
const updateNote = async (id, note) => {
    const client = await connection()
   await client.connect()

   try {
    const updateNote = await client.db('notes-api').collection('notes').updateOne({
        _id: ObjectID(id)
    }, {
        $set: note
    },
    ) 

    const getNote = await client.db('notes-api').collection('notes').findOne({
        _id: ObjectID(id)
    })
    return getNote   

}
   catch (error) {
    throw(error)
    }
    finally {
    client.close()

    }
}


module.exports = {
    createNote,
    listNotes,
    getNote,
    deleteNote,
    updateNote
}