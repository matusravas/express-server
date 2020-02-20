const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId },
    login: { type: String, lowercase: true, unique: true },
    name: { type: String },
    password: { type: String },
    mail: { type: String },
    birthday: { type: Date },
    createdAt: { type: Date },
    posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }]  //Todo check populate method mongoose
    //Todo reference posts here
}, {
    versionKey: false
})

// UserSchema.methods.getStringDate = function () {
//     return this.createdAt.toLocaleDateString();
// }

UserSchema.pre("save", function (next) {
    // let now = Date.now();
    this.updatedAt = Date.now();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('Users', UserSchema);