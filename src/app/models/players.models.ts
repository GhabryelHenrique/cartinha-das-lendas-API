import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
    name: string
    nickname: string
    image: string
    age: number
    position: string
    rating: number
    team: string
    variation: number
    lastUpdate: Date
    ratingHistory: History[]
    chatRatingAverage: number
    chatRatings: ChatRating[]
    chatRatingHistory: History[]
}

export interface History {
    date: Date
    rating: number
    variation: number
}

export interface ChatRating {
    date: Date
    rating: number
    user: string
    userEmail: string
}

const PlayerSchema: Schema = new Schema({
    name: {type: String, require: true},
    nickname: {type: String, require: true, unique: true},
    image: {type: String, require: true},
    age: {type: Number, require: true},
    position: {type: String, require: true},
    rating: {type: Number, require: true},
    team: {type: String, require: true},
    variation: {type: Number, require: true},
    lastUpdate: {type: Date, require: true},
    history: {type: [{
        date: {type: Date, require: true},
        rating: {type: Number, require: true},
        variation: {type: Number, require: true}
    }], require: true},
    chatRatingAverage: {type: Number, require: true},
    chatRatings: {type: [{
        date: {type: Date, require: true},
        rating: {type: Number, require: true},
        user: {type: String, require: true},
        userEmail: {type: String, require: true}
    }], require: true},
    chatRatingHistory: {type: [{
        date: {type: Date, require: true},
        rating: {type: Number, require: true},
        variation: {type: Number, require: true}
    }], require: true}
})

export default mongoose.model<IPlayer>('Player', PlayerSchema);