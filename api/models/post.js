const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    text: Number,
    createdAt: Date,
    updatedAt: Date,
    available: Boolean,
    // fans: [{ type: Schema.Types.ObjectId, ref: 'Users' }] //Todo check populate method mongoose
}, { versionKey: false })


PostSchema.pre("save", function (next) {
    let now = Date.now();
    this.updatedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Posts", PostSchema);