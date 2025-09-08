import { connectDb } from '../config/db'

export default async function checkingCursoID(nameCurso:string){
    const db = await connectDb();
    try {
        const [rows]:any = await db.query(`select id from cursos where LOWER(nome_do_curso) = LOWER(?)`, [nameCurso]);
        if(rows.length === 0) return console.log("Não encontrado no banco de dados!");

        return rows[0].id;
    } catch (error) {
        return console.error(`Erro interno do servidor ao encontar o id do curso, error: ${error}`);
    }
}