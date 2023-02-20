import mongoose, { Schema, Document } from 'mongoose';

export interface ITeams extends Document {
    name: string
    image: string
    players: string[]
    createdAt: Date
    updatedAt: Date
    rating: number,
}

const TeamSchema: Schema = new Schema({
    name: {type: String, require: true, unique: true},
    image: {type: String, require: true},
    players: {type: [String], require: true},
    createdAt: {type: Date, require: true},
    updatedAt: {type: Date, require: true},
    rating: {type: Number, require: true},
})

export default mongoose.model<ITeams>('Team', TeamSchema)