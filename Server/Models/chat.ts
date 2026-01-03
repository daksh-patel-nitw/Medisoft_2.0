import mongoose from 'mongoose';

const Schema=mongoose.Schema;
const UserSchema=new Schema(
    { 
        from:{
            type:String,
            required:true,
        },
        to:{
            type:String,
            requires:true,
        },
        message:{
            type:String,
            requires:true,
        },
        //read, unread,
        status:{
            type:String,
            enum:['R','UR','O'],
            required:true
        }
    }
);

export const Chat=mongoose.model("login",UserSchema);
