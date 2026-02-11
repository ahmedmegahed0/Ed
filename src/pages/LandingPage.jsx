// src/pages/LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import { Video, Users, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartLearning = () => {
    if (user) {
      navigate('/courses');
    } else {
      navigate('/register');
    }
  };

  const courses = [
    {
      id: 1,
      title: 'أحياء الصف الثالث الثانوي',
      description: 'كورس شامل لمنهج الأحياء للصف الثالث الثانوي - إعداد قوي للثانوية العامة',
      icon: '🧬',
      color: 'blue'
    },
    {
      id: 2,
      title: 'جيولوجيا الصف الثالث الثانوي',
      description: 'كورس متكامل لمنهج الجيولوجيا للصف الثالث الثانوي مع شرح مبسط',
      icon: '🌍',
      color: 'green'
    }
  ];

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                🎓 منصة تعليمية متخصصة
              </div>
              <h1 className="hero-title">
                تعلم الأحياء والجيولوجيا مع
                <span className="gradient-text">د. احمد مجاهد</span>
              </h1>
              <p className="hero-subtitle">مدرس الأحياء والجيولوجيا</p>
              <p className="hero-description">
                شرح مبسط وشامل لمنهج الأحياء والجيولوجيا للصف الثالث الثانوي
                <br />
                مع أسلوب تعليمي مميز وتمارين عملية
              </p>
              <div className="hero-buttons">
                <button 
                  onClick={handleStartLearning}
                  className="btn btn-primary btn-large"
                >
                  {user ? 'الذهاب للكورسات' : 'سجل الآن مجاناً'}
                </button>
                <button 
                  onClick={() => navigate('/courses')}
                  className="btn btn-secondary btn-large"
                >
                  تصفح الكورسات
                </button>
              </div>
            </div>

            <div className="hero-image">
              <div className="image-container">
                <div className="image-placeholder">
                  <Users size={120} />
                </div>
              </div>
              <div className="stat-card stat-1">
                <div className="stat-icon videos">
                  <Video size={20} />
                </div>
                <div>
                  <p className="stat-number">300+</p>
                  <p className="stat-label">فيديو تعليمي</p>
                </div>
              </div>
              <div className="stat-card stat-2">
                <div className="stat-icon students">
                  <Users size={20} />
                </div>
                <div>
                  <p className="stat-number">1500+</p>
                  <p className="stat-label">طالب</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <Video size={32} />
              </div>
              <h3>محتوى تفاعلي</h3>
              <p>فيديوهات عالية الجودة بشرح مبسط وواضح</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green">
                <Award size={32} />
              </div>
              <h3>متابعة مستمرة</h3>
              <p>دعم فني وتعليمي طوال رحلتك الدراسية</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon purple">
                <BookOpen size={32} />
              </div>
              <h3>محتوى شامل</h3>
              <p>تغطية كاملة للمنهج مع تمارين وحلول</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <h2>الكورسات المتاحة</h2>
            <p>اختر الكورس المناسب لك</p>
          </div>

          <div className="courses-grid-two">
            {courses.map((course) => (
              <div key={course.id} className={`course-card-large ${course.color}`}>
                <div className="course-icon-large">{course.icon}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button 
                  onClick={handleStartLearning}
                  className="btn btn-primary btn-full"
                >
                  ابدأ التعلم
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>ابدأ رحلتك التعليمية الآن</h2>
            <p>انضم لآلاف الطلاب الذين حققوا التفوق في الثانوية العامة</p>
            <button 
              onClick={handleStartLearning}
              className="btn btn-light btn-large"
            >
              {user ? 'الذهاب للكورسات' : 'سجل مجاناً الآن'}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}