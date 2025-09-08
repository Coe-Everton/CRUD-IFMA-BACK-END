import { connectDb } from "../config/db";
import { RowDataPacket } from "mysql2/promise";

export default async function checkPersonInDB(CPF:string) {
  const db = await connectDb();

  const [dicente] = await db.query<RowDataPacket[]>(`SELECT id FROM dicentes WHERE cpf = ?`, [CPF]);

  if(dicente[0]){
    console.log("❗CPF já cadastrado no banco de dados de dicentes");
    return true;
  }

  const [docente] = await db.query<RowDataPacket[]>(`SELECT id FROM docentes WHERE cpf = ?`, [CPF]);

  if(docente[0]){
    console.log("❗CPF já cadastrado no banco de dados de docentes");
    return true;
  }

  return false;
}