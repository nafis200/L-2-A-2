
import { Model } from 'mongoose';
import type { USER_ROLE } from './user.constant';
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  profileImg?: string;
  status: 'in-progress' | 'blocked';
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
    ): Promise<boolean>;
  }
  
  export type TUserRole = keyof typeof USER_ROLE;