//  import { Author } from "@prisma/client"
import {db} from "../utils/db.server"
import { authorRouter } from "./author.router";

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

 //Get

 export const getAuthor =async (id:number):Promise<Author | null> =>{
 return db.author.findUnique({
    where:{
        id,
    },
    // select :{
    //     id:true,
    //     firstName:true,
    //     lastName:true,
    //     createdAt :true,
    // },
 });
    
 };
// create
 export const createAuthor = async(
    author:Omit<Author, "id" >
    ):Promise<Author>=>{
 const{firstName,lastName}= author;
  return db .author.create({
 data:{
    firstName,
    lastName,
 },
 select :{
    id:true,
        firstName:true,
        lastName:true,
        createdAt :true,
 },
  });
 };

//update 
 
  export const updateAuthor = async(author:Omit<Author,"id">, id :number):Promise<Author>=>{
    const {firstName,lastName}=author;
    return db.author.update({
where:{
    id,

},
data:{
    firstName,
    lastName
},
select:{
    id:true,
    firstName:true,
    lastName:true,
    createdAt :true,
      },
    });
  };

// delete

  export  const  deleteAuthor = async(id:number):Promise<void>=>{
    await db.author.delete({
        where:{
            id,
        },
    })
  }