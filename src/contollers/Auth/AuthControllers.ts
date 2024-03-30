import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import Authtentication from '../../utils/Authtentication';
import {
  checkUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../../models/Auth/AuthModel';
import {
  checkValidation,
  insertValidation,
} from '../../models/Validation/ValidationModel';

class AuthControllers {
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      let {
        username,
        password,
        full_name,
        gender,
        b_day,
        email,
        phone_number,
      } = req.body;
      const is_login: string = 'off line';
      const role: string = 'user';

      const [rows] = await checkUser(username);
      const usernameCheck: RowDataPacket[] = <RowDataPacket[]>rows;

      // Check username is already exist
      if (usernameCheck[0]?.username === username) {
        return res.status(400).json({
          message: 'Username already exists',
        });
      }

      const hashedPassword: string = await Authtentication.Authtentication(
        password
      );

      const regisUser: any = await registerUser(
        username,
        hashedPassword,
        role,
        is_login,
        full_name,
        gender,
        b_day
      );

      if (regisUser.signal) {
        const validationUser = await insertValidation(
          regisUser.result.insertId,
          email,
          phone_number
        );

        if (validationUser.signal) {
          return res.status(200).json({
            success: true,
            message: 'User created successfully',
          });
        } else {
          return res.status(400).json({
            message: 'Failed to register user',
          });
        }
      } else {
        return res.status(400).json({
          message: 'Failed to register user',
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      let { username, password } = req.body;

      const [rows] = await checkUser(username);

      if (Array.isArray(rows) && rows.length > 0) {
        const user = rows[0] as RowDataPacket;

        let userPwdCompare = await Authtentication.passwordCompare(
          password,
          user.password
        );

        if (userPwdCompare) {
          const resultLogin = await loginUser(username, 'online');

          if (resultLogin) {
            const getValidation = await checkValidation(user.id_user);
            const data = getValidation[0] as RowDataPacket;

            let token = Authtentication.generateToken(
              user.id_user,
              user.username,
              user.password,
              user.role,
              'online',
              user.full_name,
              user.gender,
              user.b_day,
              user.udcr,
              user.udch,
              data[0].email,
              data[0].phone_number
            );

            return res.status(200).send({
              success: true,
              message: 'Login success',
              data: token,
            });
          } else {
            return res.status(400).send({
              success: false,
              message: 'Failed to login',
              data: {},
            });
          }
        } else {
          return res.status(400).send({
            success: false,
            message: 'Wrong password',
            data: {},
          });
        }
      }

      return res.status(400).send({
        success: false,
        message:
          'Make sure your username is correct or maybe you are not registered',
      });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      let { username } = req.body;

      await logoutUser(username, 'off line');

      req.app.locals.credential = null;

      return res.status(200).send({
        success: true,
        message: 'Logout success',
      });
    } catch (error) {
      console.error('Error logging out:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
}

export default new AuthControllers();
