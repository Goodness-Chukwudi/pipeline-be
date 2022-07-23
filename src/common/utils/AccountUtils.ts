import RandomString, { GenerateOptions } from 'randomstring';
import bcrypt = require('bcryptjs');
import Jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { ILoginSession } from '../../models/user/login_session';
import { Request } from 'express';
import mongoose, { ClientSession } from 'mongoose';

class AccountUtils {


    public generateUUIDV4() {
        return uuidv4();
    }

    public static generateUUIDV4Static() {
        return uuidv4();
    }

    public getCode(length:number = 6, capitalize:boolean = false) {
        const options:GenerateOptions = {
            length: length,
            readable: true,
            charset: "alphanumeric",
        }
        if (capitalize) {
            options.capitalization = "uppercase";
        }
        return RandomString.generate(options);
    }

    public generateOTP(length:number = 6) {

        if (process.env.ENVIRONMENT == 'dev') {
            return "123456";
        }
        return this.getCode(length);
    }

    public getNumberCode(length:number = 6) {

        const options = {
            length: length,
            charset: "numeric"
        }
        return RandomString.generate(options);
    }

    public getAlphaCode(length:number = 6, capitalize:boolean = false) {
        const options:GenerateOptions = {
            length: length,
            charset: 'alphabetic'
        }
        if (capitalize) {
            options.capitalization = "uppercase";
        }
        return RandomString.generate(options);
    }

    public createLoginToken(loginSession: ILoginSession) {
        const data: any = {user: loginSession.user, uuid: loginSession.uuid, id: loginSession._id};
        const token = Jwt.sign({ data: data}, process.env.JWT_PRIVATEKEY!, { expiresIn: '24h' });
        return token;
    }

    public verifyToken(token: string, callback:(err: any, decoded: any) => void) {
        Jwt.verify(token, process.env.JWT_PRIVATEKEY!, (err, decoded) => {
            callback(err, decoded);
        });
    }
    
    createDefaultPassword() {
        return (process.env.ENVIRONMENT === "dev")? "password" : this.getCode();
    }

    public hashData(data: string): Promise<string>{
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(12);
                const hash = bcrypt.hash(data, salt);
                resolve(hash);
            } catch (error) {
                reject(error);
            }
        });       
    }

    getTokenFromRequest(req: Request) {
        const payload = req.headers.authorization || "";
        let jwt = "";
        if (payload) {
            if (payload.split(" ").length > 1) {
                jwt = payload.split(" ")[1];
                return jwt;
            }
        }
        return jwt;
    }

    createMongooseTransaction(): Promise<any> {
        return new Promise((resolve, reject) => {
            let session: ClientSession;
            mongoose.startSession()
                .then(_session => {
                    session = _session;
                    session.startTransaction();
                })
                .then(() => {
                    resolve(session);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default AccountUtils;
