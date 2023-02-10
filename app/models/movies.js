import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: String,
    year: Number,
    director: String,
    genre: String,
    runtime: Number

}, {
    timestamps: true,
    collection: "movies"
});

export default mongoose.model("Movies", MovieSchema);