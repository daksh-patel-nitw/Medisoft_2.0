import { ClientSession } from "mongoose";
import { requireString,assertObject, requirePassword } from "../commonValidation";

export interface SignUpEmployeeDTO{
    eid:string,
    name:string,
    role:string,
    password:string,
    security_phrase?:string,
    dep?:string,
    session?:ClientSession
};

export const createSignUpEmployeeDTO=(input:unknown)=>{
    const body = assertObject(input);
    return {
        eid:requireString(body,'eid',{minLength:7}),
        name:requireString(body,'name',{maxLength:15,minLength:2,allow:'letters'}),
        role:requireString(body,'role',{maxLength:15,minLength:2,allow:'letters'}),
        password:requirePassword(body,'password'),
        security_phrase:requirePassword(body,'security_phrase'),
        dep:requireString(body,'dep',{maxLength:15,minLength:2,allow:'letters'})    
    }
}

