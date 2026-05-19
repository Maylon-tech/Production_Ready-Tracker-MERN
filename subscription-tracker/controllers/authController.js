import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { JWT_EXPIRES_IN, JWT_SECRETE} from '../config/env.js'

// POST request
export const signUp = async (req, res, next) => {
    // Implement sign up login here...
    const session = await mongoose.startSession() // Atomic Operations - 
    session.startTransaction()

    try {
        // Logic to create a new user
        const { name, email, password } = req.body  // destructure from BODY (input layout on frontend.)
        // Check if a user already Exist
        const existingUser = await User.findOne({ email })  // 1 st Database Call
        if (existingUser) {
            const error = new Error('User already exist.!')
            error.statusCode = 409
            throw error
        }
        // Hashing password - secure password when save on database.
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{  // Create DOc to save on database                            
            name, 
            email,
            password: hashedPassword
        }], { session })
        
        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRETE,
            { expiresIn: JWT_EXPIRES_IN }
        )

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: 'User Created Successfully.',
            data: {
                token,
                user: newUser[0],
            }
        })

    } catch (error) {  // IF something went wrong...
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    // Implement sign in login here...
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
 
        if (!user) {
            const error = new Error(('User not found...'))
            error.statusCode = 404
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            const error = new Error(('Invalid...'))
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRETE,
            {expiresIn: JWT_EXPIRES_IN}
        )

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            }
        })

    } catch (error) {
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    // Implement sign out login here...
    
}