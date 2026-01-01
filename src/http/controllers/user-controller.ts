import type { Request, Response } from "express";
import {registerValidator} from '../validators/register-validator.js'
import { ZodError } from "zod";
import { hashPassword } from "../../utils/hash-password.js";


export class UserController{
    async register(req: Request, res: Response) {
        try{
            const data = registerValidator.parse(req.body)
            const password = data.password

            const hashedPassword = await hashPassword(password)

            console.log({password})
            console.log({hashedPassword})

        
            res.status(201).json({
            message: "User OK"
        })
        } catch (error) {
            if(error instanceof ZodError) {
                res.status(400).json({
            errors: error
            })
            } else {
                res.status(500).json(
                    {error}
                )
            }
        }
    }
}