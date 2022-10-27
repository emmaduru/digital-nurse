const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {user_schema} = require("../utils/schema");
const {hash_password} = require("../utils/helpers")

const register_page = (req, res) => {
    return res.render("auth/register");
}

const register = async (req, res) => {
    try {
        await user_schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        const hashed_password = await hash_password(req.body.password);
        await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashed_password
        });
        return res.status(201).json({ success: true, message: "User successfully created." })
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Email Address is already associated with an account.";
        }
        return res.status(500).json({success: false, message: err.message})
    }
}

const login_page = (req, res) => {
    return res.render("auth/login")
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}).select("+password");
        
        if (user) {
            const auth = await bcrypt.compare(req.body.password, user.password);
            if (auth) {
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                    expiresIn: 60 * 30
                })
                res.cookie("digital_nurse_jwt", token, {
                    maxAge: 1000 * 60 * 30,
                    httpOnly: true
                })
                return res.status(200).json({success: true, message: "Logged In Successfully."})
            }
        }
        throw new Error("Invalid Username or Password.")
    } catch (err) {
        return res.status(500).json({success: false, message: err.message})
    }
}

const logout = (req, res) => {
    res.cookie("digital_nurse_jwt", "", {
        maxAge: 1
    });
    res.redirect("/login")
}

const change_password_page = (req, res) => {
    res.render("auth/change_password")
}

const change_password = async (req, res) => {
    try {
        console.log(res.locals.user)
        const user = await User.findById(res.locals.user._id).select("+password");
        const auth = await bcrypt.compare(req.body.old_password, user.password);
        if (auth) {
            const hashed_password = await hash_password(req.body.password)
            await User.findByIdAndUpdate(res.locals.user._id, {password: hashed_password});
            return res.status(201).json({success: true, message: "Password successfully updated."})
        }
        throw new Error("The Password entered is not correct.")
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

module.exports = {
    register_page,
    register,
    login_page,
    login,
    logout,
    change_password_page,
    change_password
}