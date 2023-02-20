import mongoose, { Schema, Document } from 'mongoose';


export interface ISuperUser extends Document {
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    cellPhone: number
}

const SuperUserSchema: Schema = new Schema({
    name: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    createdAt: {type: Date, require: true},
    updatedAt: {type: Date, require: true},
    cellPhone: {type: Number, require: true}
})

export default mongoose.model<ISuperUser>('SuperUser', SuperUserSchema)