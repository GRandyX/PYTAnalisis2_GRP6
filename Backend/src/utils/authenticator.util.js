import bcrypt from 'bcrypt';

export class Authenticator {
    static async hashPass(contra){
        const saltRounds = 10
        return bcrypt.hash(contra, saltRounds)
    } 

    static async comparePass(contra, encrypPass){
        console.log(encrypPass)
        return bcrypt.compare(contra, encrypPass)
    }
}