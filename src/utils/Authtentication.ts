import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authtentication {
  public static Authtentication = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  public static passwordCompare = async (
    text: string,
    encryptedText: string
  ): Promise<boolean> => {
    let result = await bcrypt.compare(text, encryptedText);

    return result;
  };

  public static generateToken = (
    id_user: number,
    username: string,
    password: string,
    role: string,
    is_login: string,
    full_name: string,
    gender: string,
    b_day: string,
    udcr: string,
    udch: string,
    email: string,
    phone_number: string
  ): string => {
    const secretKey: string = process.env.JWT_SERCRET_KEY || 'secret';

    // exp in 24 hours
    const expiredIn: number = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    const token = jwt.sign(
      {
        id_user,
        username,
        password,
        role,
        is_login,
        full_name,
        gender,
        b_day,
        udcr,
        udch,
        email,
        phone_number,
      },
      secretKey,
      {
        expiresIn: expiredIn,
      }
    );

    return token;
  };
}

export default Authtentication;
