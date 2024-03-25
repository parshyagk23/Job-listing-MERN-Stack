const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, mobile } = req.body
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                errormessage: 'Bad request'
            })
        }
        const isExistingUser = await User.findOne({ email: email });

        if (isExistingUser) {
            return res
                .status(409)
                .json({ errormessage: 'User already exists' })
        }
        const hashedpassword = await bcrypt.hash(password, 10)

        const userData = new User({
            name,
            email,
            password: hashedpassword,
            mobile
        })
        await userData.save()
        res.json({ message: "User register successfully" })

    } catch (error) {
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(400)
                .json({ errormessage: 'Bad request invalid Credentials!' })
        }
        const UserDetails = await User.findOne({ email: email })

        if (!UserDetails) {
            return res
                .status(401)
                .json({ errormessage: 'invalid Credentials!' })
        }

        const passwardMatches = bcrypt.compare(password, UserDetails.password)

        if (!passwardMatches) {
            return res
                .status(401)
                .json({ errormessage: 'invalid Credentials!' })

        }
        const token = jwt.sign(
            {userId:UserDetails?._id , name: UserDetails?.name},
            process.env.SECRET_CODE,
            {expiresIn:'24h'}
            )
        res.json(
            { message: 'User Login SuccessFully',
              token,
              name:UserDetails?.name  ,
              userId:UserDetails?._id
            }
            )


    } catch (error) {
        next(error)
    }
}

const getUserDetails = async(req,res, next)=>{
    try {
        const {id} =req.params

        const UserDetails = await User.find({_id:id})

        if(!UserDetails){
            return res.status(400).json({
                errormessage: 'Bad request'
            })
        }

        res.json({data:UserDetails})

    } catch (error) {
        next(error)
    }
}

module.exports = { registerUser, userLogin, getUserDetails }