// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, BookOpen, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01 ويتكون من 11 رقم)';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
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
    
    const result = await register(
      formData.name,
      formData.email,
      formData.phone,
      formData.password
    );

    setLoading(false);

    if (result.success) {
      setSuccessMessage('تم إنشاء حسابك بنجاح! الرجاء انتظار تفعيل الحساب من قبل الإدارة');
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
    } else {
      setErrors({ submit: result.error || 'حدث خطأ، حاول مرة أخرى' });
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
            <h1>إنشاء حساب جديد</h1>
            <p>املأ البيانات التالية للتسجيل في المنصة</p>
          </div>

          {successMessage && (
            <div className="alert alert-success">
              <AlertCircle size={20} />
              <div>
                <p className="alert-title">تم التسجيل بنجاح!</p>
                <p className="alert-message">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label className="input-label">الاسم الكامل</label>
              <div className="input-icon">
                <User size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'error' : ''}`}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              {errors.name && (
                <p className="input-error">{errors.name}</p>
              )}
            </div>

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
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && (
                <p className="input-error">{errors.email}</p>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">رقم الهاتف</label>
              <div className="input-icon">
                <Phone size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field ${errors.phone ? 'error' : ''}`}
                  placeholder="01012345678"
                />
              </div>
              {errors.phone && (
                <p className="input-error">{errors.phone}</p>
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

            <div className="input-group">
              <label className="input-label">تأكيد كلمة المرور</label>
              <div className="input-icon">
                <Lock size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
              {errors.confirmPassword && (
                <p className="input-error">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.submit && (
              <div className="alert alert-danger">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-full"
            >
              {loading ? 'جاري التسجيل...' : 'إنشاء حساب'}
            </button>

            <p className="auth-footer">
              لديك حساب بالفعل؟{' '}
              <Link to="/login">تسجيل الدخول</Link>
            </p>
          </form>

          <div className="info-box">
            <div className="info-header">
              <AlertCircle size={20} />
              <span>ملاحظة هامة:</span>
            </div>
            <p>
              بعد التسجيل، سيكون حسابك غير مفعل. يرجى التواصل مع الإدارة وإتمام الاشتراك عبر فودافون كاش لتفعيل حسابك.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}