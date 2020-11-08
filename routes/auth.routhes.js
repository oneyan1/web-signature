const {Router} = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const router = Router();
const User = require("../models/User");

// /api/auth/register
router.post(
    "/register",
    //validacja emailu i hasła
    [
        check("email", "Wrong format email").isEmail(),
        check("password", "Wrong format of password, min size password is 6 symbols").isLength({min:6})
    ],
    async ( req, res)=>{
    try{
        // return status 400 jeśli walidacja nie przeszła i objekt błedów nie jest pusty
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data in the registration"
            })
        }
        // проверка емайла на уже существующий в базе, если существует вернить 400
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if(candidate){
          return res.status(400).json({message: "User with this email address already exists"});
        }
        // хеширование пароля и создание юзера
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "User created"});

    }catch(e){
        res.status(500).json({message: "Ups, connection wrong! Please, try reconnecting.."});
    }
});

// /api/auth/login
router.post(
    "/login", 
    [
        check("email", "Incorrect email").normalizeEmail().isEmail(),
        check("password", "Write a password").exists()
    ],
    async ( req, res)=>{
    try{
        //валидация ошибок емаела и пароля
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data in the login"
            })
        }

        //проверка существует ли такой пользователь
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isMath = await bcrypt.compare(password, user.password);
        if(!isMath){
            return res.status(400).json({message: "Password incorrect"});
        }
        //создание jwt токена
        const token = jwt.sign(
            { userId: user.id },
            config.get("jwtSecret"),
            { expiresIn: "1h" }
        );

        //логин удался
        res.json({token, userId: user.id});

    }catch(e){
        res.status(500).json({message: "Ups, connection wrong! Please, try reconnecting.."});
    }
});

module.exports = router;
