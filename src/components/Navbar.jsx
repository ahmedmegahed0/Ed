// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <BookOpen size={28} />
            </div>
            <div className="logo-text">
              <h1>Smart Web</h1>
              <p> منصه تعليم الاحياء والجولوجيا   </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            {user ? (
              <>
                <Link to="/courses" className="nav-link">
                  الكورسات
                </Link>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-link">
                    <Settings size={18} />
                    لوحة التحكم
                  </Link>
                )}
                
                <div className="user-info">
                  <div className="user-details">
                    <p className="user-name">{user.name}</p>
                    <p className="user-status">
                      {user.isActive ? (
                        <span className="status-active">● حساب نشط</span>
                      ) : (
                        <span className="status-inactive">● حساب غير مفعل</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="theme-toggle" title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                <button onClick={handleLogout} className="btn-logout">
                  <LogOut size={18} />
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="theme-toggle" title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <Link to="/login" className="btn btn-secondary">
                  تسجيل الدخول
                </Link>
                <Link to="/register" className="btn btn-primary">
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                  <p className="user-status">
                    {user.isActive ? (
                      <span className="status-active">● حساب نشط</span>
                    ) : (
                      <span className="status-inactive">● حساب غير مفعل</span>
                    )}
                  </p>
                </div>
                
                <Link 
                  to="/courses" 
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الكورسات
                </Link>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                )}

                <button 
                  onClick={toggleTheme}
                  className="mobile-link"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={18} />
                      <span>الوضع الليلي</span>
                    </>
                  ) : (
                    <>
                      <Sun size={18} />
                      <span>الوضع النهاري</span>
                    </>
                  )}
                </button>
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="mobile-link logout-link"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={toggleTheme}
                  className="mobile-link"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={18} />
                      <span>الوضع الليلي</span>
                    </>
                  ) : (
                    <>
                      <Sun size={18} />
                      <span>الوضع النهاري</span>
                    </>
                  )}
                </button>

                <Link 
                  to="/login" 
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
                <Link 
                  to="/register" 
                  className="mobile-link primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}