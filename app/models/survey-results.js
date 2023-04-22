import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SurveyResultsSchema = new Schema({
    surveyId: String,
    json: Object
    
}, {
    timestamps: true,
    collection: "survey-results"
});

export default mongoose.model("Survey Results", SurveyResultsSchema);