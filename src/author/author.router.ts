import express, { response } from "express"
import type{Request,Response} from "express";
import{body,validationResult} from "express-validator";


import* as AuthorService from "./author.service";
import { request } from "http";

export const authorRouter = express.Router();

//Get : list of all Authors:

authorRouter.get("/",async(request:Request,response:Response)=>{
    try{
        const authors=await AuthorService.listAuthors();
        return response.status(200).json(authors)

    }catch(error:any){
       return response.status(500).json(error.message)
    }
})
//GET : A SINGLE AUTHOR BT ID 
authorRouter.get("/:id",async(request:Request,response:Response)=>{
    const id : number  = parseInt(request.params.id,10);
    try{
        const author = await AuthorService.getAuthor(id)
        if(author){
            return response.status(200).json(author)
        }
      return response.status(404).json("Author not found")
    }catch(error:any){
        return response.status(500).json(error.message)
    }
})