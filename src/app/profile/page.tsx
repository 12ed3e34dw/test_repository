'use client';

import { useSearchParams } from 'next/navigation';

export default function Profile() {
    const params = useSearchParams();
    const email = params.get('email');
    const password = params.get('password');

    return (
        <main style={styles.main}>
            <h1 style={styles.title}>Profile</h1>
            <div style={styles.box}>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Password:</strong> {password}</p>
            </div>
        </main>
    );
}

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f9f9f9',
        padding: 20,
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        marginBottom: 20,
        color: '#333'
    },
    box: {
        background: '#fff',
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: 400
    }
};
