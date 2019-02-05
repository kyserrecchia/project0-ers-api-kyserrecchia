import { User } from '../models/user';
import { connectionPool } from '../util/connection-util';
import { Reimbursement } from '../models/reimbursement';

export class ReimDao {

    async findByStatus(status: number): Promise<Reimbursement[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM reimbursement WHERE status = $1',
                [status]
            );
            return result.rows.map(reim => {
                return {
                    reimbursementId: reim.reimbursementId,
                    author: reim.author,
                    amount: reim.amount,
                    dateSubmitted: reim.dateubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findAll(): Promise<Reimbursement[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM reimbursement'
            );
            return result.rows.map(reim => {
                return {
                    reimbursementId: reim.reimbursementId,
                    author: reim.author,
                    amount: reim.amount,
                    dateSubmitted: reim.dateubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
                };
            });
        } finally {
            client.release(); // release connection
        }
    }

    async findByAuthor(author: number): Promise<Reimbursement[]> {
        const client = await connectionPool.connect();
        try {
            const result = await client.query(
                'SELECT * FROM reimbursement WHERE author = $1',
                [author]
            );
            return result.rows.map(reim => {
                return {
                    reimbursementId: reim.reimbursementId,
                    author: reim.author,
                    amount: reim.amount,
                    dateSubmitted: reim.dateubmitted,
                    dateResolved: reim.dateresolved,
                    description: reim.description,
                    resolver: reim.resolver,
                    status: reim.status,
                    type: reim.type
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








