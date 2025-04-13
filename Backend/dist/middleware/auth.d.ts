import { NextFunction, Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const auth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
