//  import { Author } from "@prisma/client"
import {db} from "../utils/db.server"

type Author={
    id:number;
    firstName:string;
    lastName:string;
     createdAt:Date;
};


 export const listAuthors = async():Promise<Author[]>=>{
    return db.author.findMany({
        select:{
            id:true,
            firstName:true,
            lastName:true,
            createdAt :true,
        },
    });

 };

 export const getAuthor =async (id:number):Promise<Author | null> =>{
 return db.author.findUnique({
    where:{
        id,
    },
 })
    
 }