const express = require("express")
const User = require("./DB/user")
const Blog = require("./DB/blog")
const Comment = require("./DB/comment")
const bcrypt = require("bcryptjs")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const authenticate = require('./middleware/authenticate')
const { default: mongoose } = require("mongoose")
dotenv.config({ path: './config.env' })
const multer = require("multer")
const blog = require("./DB/blog")

/// img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/public/uploads")
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}. ${file.originalname}`)
    }
})

// img filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

require('./DB/connection')
const PORT = process.env.PORT

const app = express()
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json());
app.use(cookieParser())
app.use("./client/public/uploads", express.static("./client/public/uploads"));



//Signup API

app.post('/signup', async (req, res) => {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
        return res.status(422).json({ error: "please fill all input fields" })
    }
    try {

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: "email already exist" })
        }


        const register = new User({ username, email, password, phone })
        await register.save()
        res.status(201).json({ message: "USer Registered", register })

    } catch (err) {
        conole.log(err)
    }



})





//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "PLZ fill the input fields" })
    }
    const userLogin = await User.findOne({ email: email })
    if (userLogin) {
        const match = await bcrypt.compare(password, userLogin.password)
        token = await userLogin.generateAuthToken()
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })
        if (!match) {
            res.status(400).json({ message: "Invalid Credentials" })
        } else {
            const result = {
                userLogin,
                token
            }
            res.status(201).json({ status: 201, result })
            // res.json({message:"User Signin Succesfully",result})

        }

    } else {
        res.status(400).json({ message: "invalid credentials" })
    }


})











app.get('/getname', async (req, res) => {
    const user = await User.find()
    res.status(200).json({ user: user })
})


app.get('/user', authenticate, async (req, res) => {
    try {
        const ValidUserOne = await User.findOne({ _id: req.userId })
        res.status(201).json({ status: 201, ValidUserOne })
    } catch (error) {
        res.status(401).json({ status: 401, error })

    }
})






//Add BLog

app.post('/addblog', upload.single("image"), async (req, res) => {
    const { title, description, user ,slug} = req.body
    const { filename } = req.file
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (err) {
        console.log(err)
    }
    if (!existingUser) {
        res.status(400).json({ message: "Unable to find user by This id" })
    }
    const blog = new Blog({
        title: title,
        description: description,
        slug:slug,
        image: filename,
        user: user
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })
        existingUser.blogs.push(blog)
        await existingUser.save({ session })
        await session.commitTransaction()
        // await blog.save()
    } catch (err) {
        console.log(err)
    }
    res.status(200).json({ blog })
})




//for fetching all blogs
app.get('/all-blogs', async (req, res) => {
    const blog = await Blog.find().populate('user')
    res.send( blog )
})
//for recent post 
app.get('/recent-post', async (req, res) => {
    const abd = await Blog.find({}).select(["title","slug"])
    res.send( abd )
})


//for getting single blog on single page
app.get('/all-blogs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Blog.findOne({ slug: id }).populate(['user','comments'])
        return res.status(200).json({ post })
    } catch (error) {
        console.log(error)
    }

})



//get Blog by id

app.get('/blog/:id', async (req, res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")
    } catch (err) {
        console.log(err)
    }
    if (!userBlogs) {
        res.status(400).json({ message: "No Blogs Found" })
    } else {
        res.status(200).json({ user: userBlogs })
    }

})

//for search blog
app.get("/search/:key", async (req, resp) => {
    let result = await Blog.find({
        "$or": [
            {
                title: { $regex: req.params.key }  
            },
            {
                description: { $regex: req.params.key }
            },
            
            
            
        ]
    }).populate('user');
    resp.send(result);
})


//for edit
app.get('/getblog/:id',async(req,res)=>{
    let result = await Blog.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({message:"Nothing Found"})
    }
})

//update blog
app.put('/updateBlog/:id', upload.single("image"),async(req,res)=>{
   const {title,description}=req.body
   const {filename } = req.file
    let result =await Blog.updateOne(
        {_id:req.params.id},
        {
            $set:{
            title:title,
            description:description,
            image:filename
        }
        }
        )
        res.send(result)
})


//delete blog

app.delete("/deleteblog/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await Blog.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




app.post('/comment', async (req, res) => {
    const { blogId, userId, comment } = req.body
   
    let existblog;
    try {
        existblog = await Blog.findById(blogId)
    } catch (err) {
        console.log(err)
    }
    if (!existblog) {
        res.status(400).json({ message: "Unable to find Blog by This id" })
    }
    const blog = new Comment({
        comment: comment,
        blogId: blogId,
        userId:userId
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })
        existblog.comments.push(blog)
        await existblog.save({ session })
        await session.commitTransaction()
        // await blog.save()
    } catch (err) {
        console.log(err)
    }
    // res.status(200).json({ blog })
})

// fetching comment
app.get('/get-comment', async (req, res) => {
    try {
        const comment = await Comment.find().populate('userId')
    res.send({ comment })
    } catch (error) {
        console.log(error)
    }
})

app.get('/comment/:id', async (req, res) => {
    const blogId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await Blog.findOne({slug:blogId}).populate({
            path:"comments",
            populate:{
                path:"userId"
            }
        })
    } catch (err) {
        console.log(err)
    }
    if (!userBlogs) {
        res.status(400).json({ message: "No comment Found" })
    } else {
        res.status(200).json({ comments: userBlogs })
    }

})










app.listen(PORT, () => console.log(`My Server Started at PORT ${PORT}`))












//Login API


// app.post("/login", async (req, res) => {
//     // console.log(req.body);

//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(422).json({ error: "fill all the details" })
//     }

//     try {
//        const userValid = await User.findOne({email:email});

//         if(userValid){

//             const isMatch = await bcrypt.compare(password,userValid.password);

//             if(!isMatch){
//                 res.status(422).json({ error: "invalid details"})
//             }else{

//                 // token generate
//                 const token = await userValid.generateAuthtoken();

//                 // cookiegenerate
//                 res.cookie("usercookie",token,{
//                     expires:new Date(Date.now()+9000000),
//                     httpOnly:true
//                 });

//                 const result = {
//                     token
//                 }
//                 res.status(201).json({status:201,result})
//             }
//         }

//     } catch (error) {
//        console.log(error)
//     }
// });
