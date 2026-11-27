import { Request, Response, NextFunction } from "express";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userData,
        });
    } catch (error) {
        next(error);
    }
};


export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: {
                accessToken: null,
                user: null,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        res.status(200),json({
            success: true,
            message: "Current user retrieved successfully",
            data: req.user ?? null,
        });
    } catch (error) {
        next(error);
    }
};


export const refreshToken =  async (
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            data: {
                accessToken: null,
            },
        });
    } catch (error) {
        next(error);
    }
};
