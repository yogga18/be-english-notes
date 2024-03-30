import { Request, Response } from 'express';
import IChelloWorld from './IChelloWorld';
import { getTesting } from '../../models/testing/TestingModel';

class TestingController implements IChelloWorld {
  index = async (req: Request, res: Response): Promise<any> => {
    try {
      const row = await getTesting(); // Menunggu hasil dari getTesting

      console.log(row);

      return res.status(200).json({
        message: 'success',
        data: row,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };
}

export default new TestingController();
