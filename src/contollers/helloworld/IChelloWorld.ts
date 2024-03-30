import { Request, Response } from 'express';

interface IChelloWorld {
  index(req: Request, res: Response): Response | Promise<Response>; // GET all data
  //   create(req: Request, res: Response): Response | Promise<Response>; // POST data
  //   show(req: Request, res: Response): Response | Promise<Response>; // GET data by id
  //   update(req: Request, res: Response): Response | Promise<Response>; // PUT data by id
  //   delete(req: Request, res: Response): Response | Promise<Response>; // DELETE data by id
}

export default IChelloWorld;
