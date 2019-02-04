import { User } from '../models/User';
import { SessionFactory } from '../util/session-factory';

export class UserDao {

    public async getAllUsers(): Promise<User[]> {
        const client = await SessionFactory.getConnectionPool().connect();

        const result = await client.query('SELECT * from "user"');

        client.release();

        return result.rows;
    }

}






