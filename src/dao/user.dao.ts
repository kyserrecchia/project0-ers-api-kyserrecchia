import { User } from '../models/User';
import { SessionFactory } from '../util/session-factory';

export class UserDao {

    public async getAllUsers(): Promise<User[]> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect();

        const result = await client.query('SELECT * from "user"');

        return result.rows;
    }

}
