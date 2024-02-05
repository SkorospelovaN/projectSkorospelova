import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import cors from 'cors'
import { change } from "./controllers/change.js";
import multer from 'multer'
import path from "path";

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})

app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

app.post('/reg', register)

app.post('/auth', auth)

app.post('/change', change)

app.post('/add/', upload.single('mediaValue'), async(req, res) => {
    const mediaValue = req.file.filename
    const {date, place, number, comm, id} = req.body
    const stat = 'В процессе'
    console.log(mediaValue)
    const data = await sql`insert into Requests(date, place, media, number, comm, stat, user_id) values (${date}, ${place}, ${`http://localhost:5000/${mediaValue}`}, ${number}, ${comm}, ${stat}, ${id})`
    res.sendStatus(200)
})

const start = async () => {

    
    app.listen(PORT, () => {
        console.log(`СЕРВАК ФУРЫЧИТ ТУТ http://localhost:${PORT}`);
    })
}

start()