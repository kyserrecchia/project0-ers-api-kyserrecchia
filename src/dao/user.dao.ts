import { User } from '../models/user';
import { connectionPool } from '../util/connection-util';

export class UserDao {

    async findById(id: number): Promise<User> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" inner join "role" on "user"."role"="role".roleid  WHERE "user".userid = $1',
                [id]
            );
            const sqlUser = result.rows[0]; // there should only be 1 record
            if (sqlUser) {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            } else {
                return undefined;
            }
        } finally {
            client.release(); // release connection
        }
    }

    async findAll(): Promise<User[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user"'
            );
            return result.rows.map(sqlUser => {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findAllWithRole(): Promise<User[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" inner join "role" on "user"."role"="role".roleid'
            );
            return result.rows.map(sqlUser => {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findByRole(role: number): Promise<User[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM "user" WHERE "role" = $1',
                [role]
            );
            return result.rows.map(sqlUser => {
                return {
                    userId: sqlUser.userid,
                    username: sqlUser.username,
                    password: '', // don't send back the passwords
                    firstName: sqlUser.firstname,
                    lastName: sqlUser.lastname,
                    email: sqlUser.email,
                    role: sqlUser.role
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async save(user: User): Promise<User> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                `INSERT INTO users (username, password, firstname, lastname)
                    VALUES  ($1, $2, $3, $4)
                    RETURNING user_id`,
                [user.username, user.password, user.firstName, user.lastName]
            );
            if (result.rows[0]) {
                const id = result.rows[0].user_id;
                return {
                    ...user,
                    userId: id
                };
            } else {
                return undefined;
            }

        } finally {
            client.release(); // release connection
        }
    }
}








