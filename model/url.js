import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
        visitedHistory: [
            {
                timestamps: {type: Number}
            }
        ],
        owner:{
            type:mongoose.Schema.ObjectId,
            ref: 'User',
        }
    },{
        timestamps: true
    }
)

export const URL = mongoose.model('URL', urlSchema)