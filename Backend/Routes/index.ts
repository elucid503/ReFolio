import type { Request, Response } from 'express';

export const get = (req: Request, res: Response) => {

    res.sendFile('index.html', { root: '../Frontend/Pages' })

};