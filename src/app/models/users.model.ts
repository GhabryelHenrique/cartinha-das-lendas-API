import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string
    email: string
    nickname: string
    password: string
    avatar: string
    birthDate: Date
    createdAt: Date
    updatedAt: Date
    ratings: Ratings[]
}

export interface Ratings {
    date: Date
    rating: number
    player: string
}

const UserSchema: Schema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    nickname: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String, require: true},
    birthDate: {type: Date, require: true},
    createdAt: {type: Date, require: true},
    updatedAt: {type: Date, require: true},
    ratings: {type: [{
        date: {type: Date, require: true},
        rating: {type: Number, require: true},
        player: {type: String, require: true}
    }], require: true}
})

export default mongoose.model<IUser>('User', UserSchema)