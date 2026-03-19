import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function CreateUser() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setMessage('Account successfully created! (Notice: Using signup from the browser might have logged you out if email required confirmation, or just created the user)');
      setEmail('');
      setPassword('');
      window.location.reload(); // Reload immediately to handle internal auth state switches
    } catch (error) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-secondary)', border: '1px dashed var(--accent)', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px' }}>Admin Panel: Add CRM User</h3>
      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input 
          type="email" 
          placeholder="New User Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-input"
          style={{ padding: '8px', fontSize: '12px', width: '100%' }}
          required 
        />
        <input 
          type="password" 
          placeholder="New User Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="search-input"
          style={{ padding: '8px', fontSize: '12px', width: '100%' }}
          required 
        />
        <button 
          type="submit" 
          className="btn btn-primary btn-sm"
          disabled={loading}
        >
          {loading ? 'Creating...' : '+ Create User'}
        </button>
      </form>
      {message && <div style={{ fontSize: '11px', marginTop: '10px', color: 'var(--accent)' }}>{message}</div>}
    </div>
  );
}
