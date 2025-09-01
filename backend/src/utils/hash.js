import bcrypt from 'bcryptjs';
export const hash = async (pwd)=> bcrypt.hash(pwd, 10);
export const match = async (pwd, h)=> bcrypt.compare(pwd, h);
