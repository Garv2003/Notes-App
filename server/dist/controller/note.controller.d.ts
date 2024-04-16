import { Request, Response } from 'express';
declare const GetUserNotes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const CreateNote: (req: Request, res: Response) => Promise<void>;
declare const GetNoteById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const UpdateNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const DeleteNote: (req: Request, res: Response) => Promise<void>;
export { GetUserNotes, CreateNote, GetNoteById, UpdateNote, DeleteNote };
