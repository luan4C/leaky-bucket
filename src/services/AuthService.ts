import {comparePassword, generateToken, hashPassword } from '../utils/authUtils'
import Identity from '../models/auth/identity';
export class AuthService {
    private static _users: Identity[] = [
        {
            id: '5f8fc30e-f181-4f8b-b8a4-ee09a0d53cdf',
            name: 'John Doe',
            username: 'johndoe',
            passwordhash: hashPassword("johnismyname123")
        }
    ]; 

    public autheticateUser(username: string, password: string): string | null {
        const user = AuthService._users.find(user => user.username === username);
        if (!user) {
            return null;
        }
        if(comparePassword(password,user.passwordhash))
            return generateToken(user);
    
        return null;
    }

}


export default new AuthService();