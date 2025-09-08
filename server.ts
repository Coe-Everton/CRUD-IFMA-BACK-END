import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db'
import generatorID from './utils/generatorID';
import getFormattedDate from "./utils/getFormattedDate";
import generatorCodigoSuap from "./utils/generatorCodigoSuap";
import checkingCursoID from "./utils/checkingCursoID";
import checkPersonInDB from "./utils/checkPersonInDB";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173","http://localhost:8080"],
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true
    })
);

app.get("/", async (req, res) => {
    const db = await connectDb();

    const [rows] = await db.query("show tables")
    res.json(rows);
})

app.get("/cursos", async (req, res) => {
    const db = await connectDb();

    const [rows] = await db.query("select * from cursos")
    res.json(rows);
})

app.get("/dicentes", async (req, res) => {
    const db = await connectDb();

    const [rows] = await db.query("select * from dicentes")
    res.json(rows);
})

app.get("/docentes", async (req, res) => {
    const db = await connectDb();

    const [rows] = await db.query("select * from docentes")
    res.json(rows);
})

// POST

app.post("/cursos", async (req, res) => {
    try {
        const db = await connectDb();
        const createAt = getFormattedDate();
        const id = generatorID();
        const { nameCurso } = req.body;

        const [rows] = await db.query(`INSERT INTO cursos (id, nome_do_curso, data_de_criacao) VALUES (?, ?, ?)`, [id, nameCurso, createAt]);

        res.status(200).json({ message: "Novo curso criado com suceso!", data: rows });

    } catch (error) {
        res.status(500).json({ error: `Erro interno ao criar curso, error: ${error}` });
    }
})

app.post("/docentes", async (req, res) => {
    try {
        console.log(req.body)
        const db = await connectDb();
        const createAt = getFormattedDate();
        const id = generatorID();
        const { nameDocente, CPF, nivelDeGraduacao, senhaDoSuap } = req.body;
        const codigo_do_suap = generatorCodigoSuap(nameDocente);

        const [rows] = await db.query(`INSERT INTO docentes (id, nome, cpf, nivel_de_graduacao, codigo_do_suap, senha_do_suap, data_de_criacao) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, nameDocente, CPF, nivelDeGraduacao, codigo_do_suap, senhaDoSuap, createAt]);

        res.status(200).json({ message: "Novo docente criado com suceso!", data: rows });

    } catch (error) {
        res.status(500).json({ error: `Erro interno ao criar docente, error: ${error}` });
    }
})

app.post("/dicentes", async (req, res) => {
    try {
        const db = await connectDb();
        const createAt = getFormattedDate();
        const id = generatorID();
        const { nameDicente, CPF, senhaDoSuap, curso} = req.body;
        const curso_id = await checkingCursoID(curso);
        const codigo_do_suap = generatorCodigoSuap(nameDicente);

        if(!curso_id){
          console.log("Curso não existe no banco de dados!!!");
          res.status(500).json({ error:"Curso não existe no banco de dados" });
          return
        }

        if(await checkPersonInDB(CPF)){
          res.status(500).json({ error: `CPF já cadastrado`})
          return;
        }

        const [rows] = await db.query(`INSERT INTO dicentes (id, nome, cpf, curso_id, codigo_do_suap, senha_do_suap, data_de_criacao) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, nameDicente, CPF, curso_id, codigo_do_suap, senhaDoSuap, createAt]);

        res.status(200).json({ message: "Novo dicente criado com suceso!", data: rows });

    } catch (error) {
        res.status(500).json({ error: `Erro interno ao criar dicente, error: ${error}` });
    }
})

//DELETE

app.delete("/:fromPage/:id", async (req, res) => {
    try {
        const db = await connectDb();
        const { fromPage, id } = req.params;

        const [rows] = await db.query(`DELETE FROM ${fromPage} WHERE ID = (?)`, [id]);
        
        res.status(200).json({ message: `${fromPage} - id:${id} exlcuido com sucesso!`, data: rows });

    } catch (error) {
         res.status(500).json({ error: `Erro interno ao deletar algo, error: ${error}` });
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🔥 Servido up in port: ${PORT}`)
})
