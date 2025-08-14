import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';

const mockSignup = async (name, email, password) => {
  // Replace with real API call
  if (email && password && name) {
    return { token: 'mock-jwt-token', user: { name, email } };
  }
  throw new Error('Signup failed');
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await mockSignup(form.name, form.email, form.password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setLoading(false);
      navigate('/explore');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <section className="explore-section" style={{maxWidth: 400, margin: '2rem auto'}}>
        <h3 className="section-title">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1rem'}}>
            <label>Name</label>
            <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} style={{width: '100%'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <label>Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} style={{width: '100%'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <label>Password</label>
            <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} style={{width: '100%'}} />
          </div>
          {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
        </form>
        <div style={{marginTop: '1rem'}}>
          <span>Already have an account? <Link to="/login">Sign In</Link></span>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;