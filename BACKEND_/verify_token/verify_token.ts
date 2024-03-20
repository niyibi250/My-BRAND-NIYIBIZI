import express, {Request,Response} from 'express';

import jwt from 'jsonwebtoken'

const verfy_token= function(req:Request, res:Response, next: () => void)
{
    try{
          const {token} = req.body
          if(!token)
          {
            return res.status(401).json({msg:'No provided token access denied'})
          }
          
          jwt.verify(token, 'eric1234', (err:Error | null, data:any)=>
          {
            if(err)
            {
              return res.status(404).json({msg:'the token is wrong',err})
            }
            console.log(data)
          })

          next()
    }
    catch(error){
        res.status(401).json({message:'token not verified',error})
    }
}

export default verfy_token