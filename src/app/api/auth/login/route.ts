import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '@/lib/users';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = users.find(u => u.email === email);

    if (!user) {
        return NextResponse.json({ error: 'Недействительные учетные данные' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return NextResponse.json({ error: 'Недействительные учетные данные' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '30d' });

    return NextResponse.json({ token });
}
