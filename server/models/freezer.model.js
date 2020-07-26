//create the blueprint to establish model
const mongoose = require('mongoose');
// const errMsgRequired = "{PATH} is required.";
const errMsgRequired = "Entry Required!";
const errMsgMinLength = "{PATH} must be at least {MINLENGTH} characters.";

const FreezerSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, errMsgRequired],
        },
        item: {
            type: String,
            required: [true, errMsgRequired],
            minlength: [3, errMsgMinLength],
        },
        qty: {
            type: String,
            required: [true, errMsgRequired],
        },
        in_date: {
            type: Date,
            required: [true, errMsgRequired],
            // required: [true, "In Date is required."],
        },
        out_date: {
            type: Date,
        },
        comment: {
            type: String,
        }
    },
    { timestamps: true}
);

//construct model applying schema, then export model
const Freezer = mongoose.model("Freezer",FreezerSchema);
module.exports = Freezer;