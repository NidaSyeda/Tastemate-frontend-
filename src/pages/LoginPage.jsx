import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';
import { motion } from 'framer-motion';

const heroImage = 'https://unsplash.com/photos/a-couple-of-people-that-are-eating-some-food-W4gdGubIKng';

const mockLogin = async (email, password) => {
  // Replace with real API call
  if (email === 'user@example.com' && password === 'password') {
    return { token: 'mock-jwt-token', user: { name: 'Test User', email } };
  }
  throw new Error('Invalid credentials');
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await mockLogin(form.email, form.password);
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
        <h3 className="section-title">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1rem'}}>
            <label>Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} style={{width: '100%'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <label>Password</label>
            <input type="password" name="password" className="form-control" required value={form.password} onChange={handleChange} style={{width: '100%'}} />
          </div>
          {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <div style={{marginTop: '1rem'}}>
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
      </section>
      <motion.div className="hero-images">
        <img
          src={heroImage}
          alt="Delicious Food"
          className="hero-main-img"
        />
      </motion.div>
    </div>
  );
};

export default LoginPage;