import { Request, Response } from 'express';
import ICNotes from './ICNotes';
import { RowDataPacket } from 'mysql2';
import { checkUserById } from '../../models/Auth/AuthModel';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../../models/Notes/NotesModel';

class NotesControllers implements ICNotes {
  index = async (req: Request, res: Response): Promise<Response> => {
    const { id_user } = req.params;

    try {
      const [rows] = await checkUserById(id_user);
      const usernameCheck: RowDataPacket[] = <RowDataPacket[]>rows;

      // Check username is already exist
      if (usernameCheck[0]?.id_user === parseInt(id_user)) {
        const notes = await getAllNotes(id_user);

        return res.status(200).json({
          success: true,
          message: 'GET all data success',
          data: notes,
        });
      } else {
        return res.status(400).json({
          message: 'User dosent exist',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error getting all notes.',
        data: [],
      });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { id_user } = req.params;
    const { title, terjemahan, word } = req.body;

    try {
      const [rows] = await checkUserById(id_user);
      const usernameCheck: RowDataPacket[] = <RowDataPacket[]>rows;

      // Check username is already exist
      if (usernameCheck[0]?.id_user === parseInt(id_user)) {
        const data = await createNote(id_user, title, terjemahan, word);

        return res.status(200).json({
          success: true,
          message: 'Notes successfully created',
          data: data,
        });
      } else {
        return res.status(400).json({
          message: 'User dosent exist',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error getting all notes.',
        data: [],
      });
    }
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { id_note, id_user } = req.params;

    try {
      const [rows] = await checkUserById(id_user);
      const usernameCheck: RowDataPacket[] = <RowDataPacket[]>rows;

      // Check username is already exist
      if (usernameCheck[0]?.id_user === parseInt(id_user)) {
        const note = await getNoteById(id_note, id_user);

        return res.status(200).json({
          success: true,
          message: 'Get one note by id success',
          data: note,
        });
      } else {
        return res.status(400).json({
          message: 'User dosent exist',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error getting note by id.',
      });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id_user, id_note, title, terjemahan, word } = req.body;

    try {
      const [rows] = await checkUserById(id_user);
      const usernameCheck: RowDataPacket[] = <RowDataPacket[]>rows;

      // Check username is already exist
      if (usernameCheck[0]?.id_user === parseInt(id_user)) {
        const data = await updateNote(
          id_user,
          id_note,
          title,
          terjemahan,
          word
        );

        return res.status(200).json({
          success: true,
          message: 'Note updated successfully',
          data: data,
        });
      } else {
        return res.status(400).json({
          message: 'User dosent exist',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error getting note by id.',
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id_user, id_note } = req.params;

    try {
      const [rows] = await checkUserById(id_user);
      const usernameCheck: RowDataPacket[] = <RowDataPacket[]>rows;

      // Check username is already exist
      if (usernameCheck[0]?.id_user === parseInt(id_user)) {
        const data = await deleteNote(id_note, id_user);

        return res.status(200).json({
          success: true,
          message: 'GET all data',
          data: data,
        });
      } else {
        return res.status(400).json({
          message: 'User dosent exist',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error getting note by id.',
        data: [],
      });
    }
  };
}

export default new NotesControllers();
