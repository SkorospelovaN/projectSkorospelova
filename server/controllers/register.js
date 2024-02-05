import { sql } from "../db.js";
import bcrypt from 'bcryptjs'

//контроллер регистрации
export const register = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {fio, email, password, phone} = req.body;
    
    //кандидат это переменная в которую попытаемся найти и записать пользователя с таким никнеймом
    const candidate = await sql`select * from Users where email = ${email} limit 1`[0]
    //если мы нашли пользователя с таким ником, то отправляем пользователю обратно ошибку что пользователь уже существует
    if (candidate) {
        res.status(400).send("Пользователь уже существует")
    }
    //хешируем пароль
    console.log(req.body);
    const hashPassword = bcrypt.hashSync(password, 7)
    //вытаскиваем из базы роль для пользователя так как у нас связка таблиц
    //создаем нового пользователя
    await sql`insert into Users(fio, email, password, phone, role) values(${fio}, ${email}, ${hashPassword}, ${phone}, 'USER')`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Пользователь успешно зарегистрирован"})
}