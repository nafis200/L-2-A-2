import { z } from 'zod';

export const UserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(50, { message: 'Name must be 50 characters or less' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});
