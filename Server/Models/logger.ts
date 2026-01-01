import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const UserSchema=new Schema(
    {   
        user:{
            type:String,
            required:true
        },
        operation:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },{
        versionKey:false,
        timestamps: true
    }
);

const loggerModel = model("logger", UserSchema);

export default loggerModel;