const authService = require('../auth/auth.service');
const jwt = require('jsonwebtoken');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const DTO = await authService.signUp(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    signIn: async (req, res, next) => {
        try {
            const DTO = await authService.signIn(req.body);
            res.cookie('token', DTO.token, {
                sameSite: 'none',
                secure: true,
                httpOnly: true,
                maxAge: 3600000 * 24,
            });
            delete DTO.token;
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    signOut: async (req, res, next) => {
        try {
            res.clearCookie('token');
            res.status(200).json({
                statusCode: 200,
                message: 'Signed out successfully',
            });
        } catch (error) {
            next(error);
        }
    },
    forgetPassword: async (req, res, next) => {
        try {
            const DTO = await authService.forgetPassword(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const DTO = await authService.resetPassword(req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const DTO = await authService.updatePassword(req.user.id, req.body);
            res.cookie('token', DTO.token);
            delete DTO.token;
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
