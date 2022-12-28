const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone:Number,
    tokens:[
        {
            token:String
        }
    ],
    blogs:[{type:mongoose.Types.ObjectId,ref:"blogs"}],

    

}
);
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
       console.log(error)
    }
}

module.exports=mongoose.model('users',userSchema);
