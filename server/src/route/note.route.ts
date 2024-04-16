import express from 'express'

import {
    GetUserNotes,
    CreateNote,
    GetNoteById,
    UpdateNote,
    DeleteNote
} from '../controller/note.controller'

const router = express.Router()

router.get('/notes/user/:id', GetUserNotes)

router.post('/note', CreateNote)

router.get('note/:id', GetNoteById)

router.patch('/note/:id', UpdateNote)

router.delete('/note/:id', DeleteNote)

export { router as noteRouter }