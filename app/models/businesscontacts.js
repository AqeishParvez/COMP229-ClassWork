import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BusinessContactsSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String,
    city: String,
    province: String,
    postalcode: String,
    phonenumber: Number,
    email: String,
}, {
    timestamps: true,
    collection: "businesscontacts"
});

export default mongoose.model("BusinessContacts", BusinessContactsSchema);