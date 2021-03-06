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

    async submit(
        author: number,
        amount: number,
        description: string,
        type: number) {
        const client = await connectionPool.connect();
        const text = `INSERT INTO reimbursement (author, amount, datesubmitted, dateresolved,
            description, resolver, status, "type")
            VALUES  (
                ${author}, ${+amount}, ${Math.round((new Date()).getTime() / 1000)}, 0,
                '${description}', 4, 1, ${type});`;
        console.log(text);
        try {
            const result = await client.query(text);
        } catch (err) {
            console.log(err.stack);
        } finally {
            client.release(); // release connection
        }
    }
}








