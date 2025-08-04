'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const router = useRouter();

  const register = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // успешная регистрация
        router.push(`/profile?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      } else {
        // ошибка, которую вернул сервер
        alert(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      // @ts-ignore
      alert('Ошибка клиента или сети: ' + error.message);
    }
  };



  const login = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        router.push(`/profile?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      } else {
        alert(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка при логине:', error);
      // @ts-ignore
      alert('Ошибка клиента или сети: ' + error.message);
    }
  };


  return (
      <main style={styles.main}>
        <h1 style={styles.title}>Next.js JWT Auth</h1>
        <div style={styles.form}>
          <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              style={styles.input}
          />
          <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              style={styles.input}
          />
          <div style={styles.buttonGroup}>
            <button onClick={register} style={styles.button}>Register</button>
            <button onClick={login} style={styles.button}>Login</button>
          </div>
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
    marginBottom: 30,
    color: '#333'
  },
  form: {
    width: '100%',
    maxWidth: 400,
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10
  },
  button: {
    padding: 10,
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer'
  }
};
