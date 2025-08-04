import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { users } from '@/lib/users';

export async function POST(req: Request) {
    const { email, password } = await req.json();



    if (!email || !password) {
        return NextResponse.json({ error: 'Требуется адрес электронной почты и пароль' }, { status: 400 });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
        return NextResponse.json({ error: 'Пользователь уже существует' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: users.length + 1, email, password: hashedPassword });

    return NextResponse.json({ message: 'Пользователь успешно зарегистрирован' });
}
