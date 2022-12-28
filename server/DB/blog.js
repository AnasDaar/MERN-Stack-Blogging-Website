const mongoose = require ('mongoose')
// const {ObjectId} = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug:{
      type:String,
      required:true
    },
    image: {
      type: String,
      required: true,

    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comments:[{type:mongoose.Types.ObjectId,ref:"comment"}],


  },
  {timestamps:true}
  );
  
  module.exports=mongoose.model('blogs',blogSchema);
