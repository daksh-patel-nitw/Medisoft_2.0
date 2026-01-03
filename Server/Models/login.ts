import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        mid: {
            type: String,
            required: true
        },
        email:String,
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        security_phrase: String,
        dep: String,
        first:{
            type:Boolean,
            default:true
        }
    },
    {
        versionKey: false
    }
);

export const loginModel = model("login", UserSchema);

