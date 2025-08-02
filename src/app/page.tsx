'use client';
import { useState } from "react";
import Profile from '../page/Profile';
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<any>(null);

  const register = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  const login = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
     // alert('Login successful!');
      <Profile/>
    } else {
      alert(data.error);
    }
  };

  const loadProfile = async () => {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setProfile(data.user || null);
    alert(JSON.stringify(data));
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
            <button onClick={loadProfile} disabled={!token} style={{
              ...styles.button,
              backgroundColor: token ? '#4CAF50' : '#aaa',
              cursor: token ? 'pointer' : 'not-allowed'
            }}>
              Load Profile
            </button>
          </div>
        </div>

        {profile && (
            <div style={styles.profileBox}>
              <h3>Profile:</h3>
              <pre style={styles.profileText}>{JSON.stringify(profile, null, 2)}</pre>
            </div>
        )}
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
  },
  profileBox: {
    marginTop: 30,
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 400
  },
  profileText: {
    fontSize: 14,
    color: '#333'
  }
};
