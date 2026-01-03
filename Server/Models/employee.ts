import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const UserSchema = new Schema(
    {
        eid: {
            type: String,
            required: true,
            index: true
        },
        fname: {
            type: String,
            required: true
        },
        middlename: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            length: 10,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            length: 6,
            required: true
        },
        gender: {
            type: String,
            enum: ['M', 'F', 'O'],
            required: true
        }, 
        degree: String,
        college: String,
        role: String,
        dep: String,
        timings: { type: [String], default: undefined },
        questions: { type: [String], default: undefined },
        pph: Number,
        price: Number,
        opd: String
    }, {
    versionKey: false,
    timestamps: true
}
);

export const employeeModel = model("employee", UserSchema);

