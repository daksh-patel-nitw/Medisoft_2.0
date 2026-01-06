import { ClientSession } from "mongoose";
import { requireString,assertObject, requirePassword } from "../commonValidation";

export interface SignUpEmployeeDTO{
    eid?:string,
    pid?:string,
    name:string,
    role:string,
    password:string,
    security_phrase?:string,
    dep?:string,
    session?:ClientSession
};

export const createSignUpEmployeeDTO=(input:SignUpEmployeeDTO,field:string)=>{
    const body = assertObject(input);
    return {
        [field]:requireString(body,field,{minLength:7}),
        name:requireString(body,'name',{maxLength:15,minLength:2,allow:'letters'}),
        role:requireString(body,'role',{maxLength:15,minLength:2,allow:'letters'}),
        password:requirePassword(body,'password'),
        security_phrase:requirePassword(body,'security_phrase'),
        dep:requireString(body,'dep',{maxLength:15,minLength:2,allow:'letters'})    
    }
}

