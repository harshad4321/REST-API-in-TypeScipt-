import { type } from "os";
import { db } from "../utils/db.server";

type BookRead = {
    id:number;
    title:string;
    datePublished:Date;
    isFiction:boolean;
    authorId:number;
};
export  const listBooks =async():Promise<BookRead[]> => {
 return db.book.findMany({
 select:{
    id:true,
    title:true,
    datePublished:true,
    isFiction:true,
    authorId:true,
 }
 })
}