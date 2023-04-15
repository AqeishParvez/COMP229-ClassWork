import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
    data: []
}, {
    timestamps: true,
    collection: "results"
});

export default mongoose.model("Results", ResultsSchema);