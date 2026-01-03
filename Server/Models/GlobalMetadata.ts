import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const UserSchema=new Schema(
    {   
        name:{
            type:String,
            required:true
        },
        content:{
            type:mongoose.Schema.Types.Mixed,
            required:true
        }
    },{
        versionKey:false,
        timestamps: true
    }
);

export const GlobalMetadataModel = model("globalMetadata", UserSchema);