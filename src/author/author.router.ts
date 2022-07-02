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

//POST:create an Author(ADD)
// params: firstName, Lastname
authorRouter.post(
    "/"
,body("firstName").isString(),
body("lastName").isString()
,async(request:Request,response:Response)=>{
     const error = validationResult(request);
 if (!error.isEmpty()){
    return response.status(400).json({errors:error.array()})
 }
 try{
    const  author = request.body
    const newAuthor = await AuthorService.createAuthor(author)
    return response.status(201).json(newAuthor)
 }catch(error:any){
    return response.status(500).json(error.message)
 }
});

//PUT:updating an Author(update)
// params: firstName, Lastname
authorRouter.put("/:id",
body("firstName").isString(),
body("lastName").isString(),
async(request:Request,response:Response)=>{
    const error = validationResult(request);
    if (!error.isEmpty()){
        return response.status(400).json({errors:error.array()})
     }
     const id:number = parseInt(request.params.id,10)
     try{
         const author =request.body
         const updateAuthor= await AuthorService.updateAuthor(author,id)
         return response.status(200).json(updateAuthor)
     }catch(error:any){
        return response.status(500).json(error.message) 
     }
}
);
//DELETE :Delete an author based on the Id
authorRouter.delete("/:id ",async(request:Request,response:Response)=>{
    const id:number= parseInt(request.params.id,10);
    try{
        await AuthorService.deleteAuthor(id);
        return response.status(204).json("Author is successesfully deleted" )

    }catch(error:any){
        return response.status(500).json(error.message);
    }
})