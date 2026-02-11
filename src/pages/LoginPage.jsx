// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, BookOpen, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    const result = await login(formData.email, formData.password);

    setLoading(false);

    if (result.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/courses');
      }
    } else {
      setErrors({ submit: result.error || 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <div className="auth-icon">
              <BookOpen size={32} />
            </div>
            <h1>تسجيل الدخول</h1>
            <p>أهلاً بك مرة أخرى! سجل دخولك للمتابعة</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label className="input-label">البريد الإلكتروني</label>
              <div className="input-icon">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'error' : ''}`}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="input-error">{errors.email}</p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">كلمة المرور</label>
              <div className="input-icon">
                <Lock size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'error' : ''}`}
                  placeholder="أدخل كلمة المرور"
                />
              </div>
              {errors.password && (
                <p className="input-error">{errors.password}</p>
              )}
            </div>

            {errors.submit && (
              <div className="alert alert-danger">
                {errors.submit}
              </div>
            )}

            <div className="forgot-password">
              <Link to="#">نسيت كلمة المرور؟</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-full"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>

            <p className="auth-footer">
              ليس لديك حساب؟{' '}
              <Link to="/register">سجل الآن</Link>
            </p>
          </form>

          <div className="demo-info">
            <div className="demo-header">
              <AlertCircle size={20} />
              <span>حسابات تجريبية:</span>
            </div>
            <div className="demo-accounts">
              <p><strong>أدمن:</strong> admin@smartweb.com</p>
              <p><strong>طالب:</strong> أي بريد آخر</p>
              <p className="demo-note">كلمة المرور: أي شيء (للتجربة فقط)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}