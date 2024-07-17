import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { signJwt } from "../services/jwt_sign";

export const create = async (req: Request, res: Response) => {
    try {
        const body: IUser = req.body;
        const newUser = await User.create(body)
        return res.status(200).send({ pdata: newUser })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }

}

export const findOne = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const findUser = await User.findById(id)
        if (!findUser) return res.status(404).send({ message: "No User Found!" })
        return res.status(200).send({ data: findUser })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const body: IUser = req.body;
        body["role"] = "authorized"
        const newUser = await User.create(body)
        return res.status(200).send({ pdata: newUser })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = await User.findOne({email: body.email}).select('+password');
        if (!user) {
            return res.status(400).send({ message: "NO User Found" })
        }
        
        const isMatched = await bcrypt.compare(body.password, user.password);
        if(!isMatched) {
            return res.status(500).send({ message: "Invalid credentials" })
        }
        const token = signJwt(user);
        const { password, ...filtered_user } = user.toObject();
        return res.status(200).send({ token: token , user:filtered_user })
        
        
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}


export const getMe = async (req: Request, res: Response) => {
    try {
        const user_id = res.locals.user_id;
        const user = await User.findById(user_id);
        
       return res.status(200).send({data: user})
    } catch (error: any) {
        return res.status(500).send({data: error.message})
    }
}

export const update = async(req: Request, res: Response) => {
    try {
        const user_id = res.locals.user_id;
        
        const body:IUser = req.body;
        if (body.password) {
            // const hashPassword = await bcrypt.hash()
        }
        const user = await User.updateOne({_id: user_id}, body)

        
    } catch (error: any) {
        return res.status(500).send({data: error.message})
    }
}