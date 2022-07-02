import express from "express"
import type{Request,Response}from "express";
import { body ,validationResult} from "express-validator";

import * as BookService from "./book_service";
export const bookRouter = express.Router();


//GET :list all the BOOKS;
bookRouter.get("/",async(request:Request,response:Response)=>{
    try{
        const books =await BookService.listBooks()
        return response.status(200).json(books)

    }catch(error:any){
     return response.status(500).json(error.message)
    }
}) 