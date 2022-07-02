// import { Author } from "@prisma/client";
// import { type } from "os";
import { db } from "../utils/db.server";
import  type{Author} from "../author/author.service"

type BookRead = {
    id:number;
    title:string;
    datePublished:Date;
    isFiction:boolean;
    author:Author;
    // authorId:number;
};
 type BookWrite ={
    title:string;
    datePublished:Date;
    isFiction:boolean;
    authorId:number;
   
 }
export  const listBooks =async():Promise<BookRead[]> => {
 return db.book.findMany({
 select:{
    id:true,
    title:true,
    datePublished:true,
    isFiction:true,
    author:{
        select:{
            id:true,
            firstName:true,
            lastName:true,
            createdAt :true,
        }
    },
    // authorId:true,
 }
 })
}
//GET BOOKS
export const getBook= async(id:number):Promise<BookRead | null>=>{
    return db.book.findUnique({
        where:{
            id,
        },
        select:{
            id:true,
            title:true,
            datePublished:true,
            isFiction:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    createdAt :true,
          
              },
            },
        },
    });
} ;

//CREARE Books
export const createBook = async(book:BookWrite):Promise<BookRead>=>{
    const {title,authorId,datePublished,isFiction}=book;
    const parsedDate: Date=new Date(datePublished);


    return db.book.create({
        data:{
            title,
            authorId,
            isFiction,
            datePublished:parsedDate,

        },
        
        select:{
            id:true,
            title:true,
            datePublished:true,
            isFiction:true,
            author:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    createdAt :true,
          
              },
            },
        },
    })
}
//UPDATE BOOKS
export const updateBook = async(
    book:BookWrite,
    id:number
    ):Promise<BookRead>=>{
     const{title,isFiction,datePublished,authorId}=book      ;
return db.book.update({
    where:{
        id,
    },
    data:{
        title,
        authorId,
        isFiction,
        datePublished,
    },

    select:{
        id:true,
        title:true,
        datePublished:true,
        isFiction:true,
        author:{
            select:{
                id:true,
                firstName:true,
                lastName:true,
                createdAt :true,
      
          },
        },
    },
})
}

// DELETE Books

export const deleteBook = async(id:number):Promise<void>=>{
    await db.book.delete({
        where:{
            id,
        },
    });
};