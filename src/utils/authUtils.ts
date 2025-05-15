import { createHash } from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import Identity from '../models/auth/identity';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'f9bfe93f-fe19-4907-8cb9-ec8f4a646761';

export function hashPassword(password: string): string {
    const hash = createHash('sha256').update(password).digest('hex');
    return hash;
}

export function comparePassword(password: string, hashedPassword: string): boolean {
    const hash = createHash('sha256').update(password).digest('hex');
    return hashedPassword === hash;
}

export function verifyToken(token: string): any {
    try {
        
        const decoded = jsonwebtoken.verify(token, PRIVATE_KEY);
        
        return decoded;
    } catch (error) {
        return null;
    }
}
export function generateToken(user: Identity): string {
    const token = jsonwebtoken.sign({
        username: user.username,
        user: user.name,
        id: user.id
     }, PRIVATE_KEY, {expiresIn: '1h'});
     return token;  
}

