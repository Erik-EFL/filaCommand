import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required',
  }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
