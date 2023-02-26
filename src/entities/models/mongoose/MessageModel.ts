import { Schema, model } from "mongoose";
import { MessageEntity } from "../../message";

const MessageSchema = new Schema({
    device:{
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    date :{
        type : Date,
        required: true
    },
    data: {
        type: Array<String>,
        required: true
    }
});

export const MessageModel = model<MessageEntity>('Message', MessageSchema);