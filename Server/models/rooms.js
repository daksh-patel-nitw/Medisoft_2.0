import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const UserSchema=new Schema(
    {   
        type:{
            type:String,
            required:true
        },
        dep:{
            type:String,
            required:true
        },
        floor:{
            type:Number,
            required:true
        },
        room_no:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        maxPatients:{
            type:Number,
            required:true
        },
        number_of_patients:{
            type:Number,
            default:0
        },
        occupied:{
            type:String,
            default:'No'
        }
    },{
        versionKey:false,
        timestamps:true
    }
);

const room = model("room", UserSchema);

export default room;