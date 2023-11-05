import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class JWT {
    private secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET as string;
    }

    public assignToken(payload: Object) {
        return jsonwebtoken.sign(payload, this.secret, { expiresIn: process.env.TOKEN_EXPIRESIN });
    }

    public verifyToken(token: string) {
        return jsonwebtoken.verify(token, this.secret);
    }
}

export default new JWT();
