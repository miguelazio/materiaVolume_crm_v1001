import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Registration successful! Please check your email for verification (if enabled) or try logging in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ letterSpacing: '1px', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-primary)' }}>MateriaVolume CRM</h1>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Email</label>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="search-input"
              style={{ width: '100%', padding: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '4px' }}
              required 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              placeholder="Your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="search-input"
              style={{ width: '100%', padding: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '4px' }}
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ padding: '10px', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? (isSignUp ? 'Signing up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
          
          <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '10px', color: 'var(--text-primary)' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 'bold', padding: 0 }}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
        {message && <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: 'var(--accent)' }}>{message}</p>}
      </div>
    </div>
  );
}
