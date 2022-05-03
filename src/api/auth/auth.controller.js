const authService = require('../auth/auth.service');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: async (req,res,next) =>{
        try{
            const DTO = await authService.signUp(req.body);
            res.status(200).json(DTO);
        }catch(error){
            next(error);
        }
    },
    signIn: async (req,res,next) =>{
        try{
            const DTO = await authService.signIn(req.body);
            res.cookie('token', DTO.token);
            delete DTO.token;
            res.status(200).json(DTO);
        }catch(error){
            next(error);
        }
    },

    forgetPassword: async (req, res, next) => {
        try {
            const DTO = await authService.forgetPassword(req.body);
            res.json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res ,next) => {
        try{
        const DTO = await authService.resetPassword(req.body);
        res.json(DTO);
        }catch(error){
            next(error);
        }
    },
    // testCookie: (req,res,next) => {
    //     res.cookie("token","hahahaha").status(200);
    //     next();
    // },
    tokenTest: (req,res,next) => {
        try {
            res.status(200).json({
                ditmemay: "ditmenay",
            });
        } catch (error) {
            next(error)
        }
    }
}