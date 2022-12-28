const mongoose = require("mongoose")
const commentScheme = new mongoose.Schema({
    blogId: {
        type: mongoose.Types.ObjectId,
        ref: "blogs",
        required: true,
      },
      userId:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
      },
    comment: {
        type: String,
        required: true
    }
}, 
 {timestamps:true}
)
module.exports = mongoose.model('comment', commentScheme);
