import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { users } from '@/lib/users';

export async function GET(req: Request) {
    const auth = req.headers.get('authorization'); // ждем: Bearer TOKEN
    if (!auth) {
        return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const token = auth.split(' ')[1];
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('No secret');

        const decoded = jwt.verify(token, secret) as { id: number };
        const user = users.find(u => u.id === decoded.id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user: { id: user.id, email: user.email } });
    } catch (e) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
