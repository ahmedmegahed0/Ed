// src/components/Footer.jsx
import { BookOpen, Facebook, Instagram, Youtube, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    facebook: 'https://www.facebook.com/YourPage',  // غير اللينك هنا
    instagram: 'https://www.instagram.com/YourProfile',  // غير اللينك هنا
    youtube: 'https://www.youtube.com/@YourChannel',  // غير اللينك هنا
    tiktok: 'https://www.tiktok.com/@YourAccount'  // غير اللينك هنا
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo & Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <BookOpen size={32} />
              <span>Smart Web</span>
            </div>
            <p className="footer-description">
              منصة تعليمية متخصصة في تدريس مادة الأحياء والجولوجيا للمرحله الثانوية مع د. احمد مجاهد 
            </p> <br />
              <p className="footer-description">
              للعطل الفني يرجي التواصل  عبر واتساب عبر الرقم الاتي 
                <br /><br />
                 <li>
                <Phone size={20} />
                <span>  <b> 01067688524 </b>   </span>
              </li>
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">روابط سريعة</h3>
            <ul className="footer-links">
              <li><Link to="/">الصفحة الرئيسية</Link></li>
              <li><Link to="/courses">الكورسات</Link></li>
              <li><Link to="/register">إنشاء حساب</Link></li>
              <li><Link to="/login">تسجيل الدخول</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">تواصل معنا</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={18} />
                <span>01022082238  </span>
              </li>
              <li>
                <Mail size={18} />
                <span>info@smartweb.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="social-media">
              <h4>تابعنا على</h4>
              <div className="social-icons">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-icon facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-icon instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                  className="social-icon youtube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="social-icon tiktok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© {currentYear} Smart Web - جميع الحقوق محفوظة | د. محمد عصام</p>
        </div>
      </div>
    </footer>
  );
}