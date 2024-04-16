import { Request, Response } from 'express';
declare const GetUserTags: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const DeleteTag: (req: Request, res: Response) => Promise<void>;
export { GetUserTags, DeleteTag };
