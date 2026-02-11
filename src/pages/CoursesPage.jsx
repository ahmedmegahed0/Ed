// src/pages/CoursesPage.jsx
import { useState } from 'react';
import { Play, Lock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CoursesPage.css';

export default function CoursesPage() {
  const { user, isLessonCompleted, markLessonComplete, getChapterProgress, getCourseProgress } = useAuth();
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});

  const courses = [
    {
      id: 1,
      title: 'أحياء الصف الثالث الثانوي',
      description: 'كورس شامل لمنهج الأحياء للثانوية العامة',
      icon: '🧬',
      chapters: [
        {
          id: 'ch1',
          title: 'الباب الأول: التركيب والوظيفة في الكائنات الحية',
          lessons: [
            { id: 'v1', title: 'الدرس الأول: الدعامة في الكائنات الحية', duration: '45 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_1/preview' },
            { id: 'v2', title: 'الدرس الثاني: الحركة في الكائنات الحية', duration: '50 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_2/preview' },
            { id: 'v3', title: 'الدرس الثالث: التنسيق الهرموني', duration: '55 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_3/preview' }
          ]
        },
        {
          id: 'ch2',
          title: 'الباب الثاني: التكاثر والنمو',
          lessons: [
            { id: 'v4', title: 'الدرس الأول: الانقسام الميتوزي', duration: '40 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_4/preview' },
            { id: 'v5', title: 'الدرس الثاني: الانقسام الميوزي', duration: '45 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_5/preview' },
            { id: 'v6', title: 'الدرس الثالث: التكاثر في النبات', duration: '50 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_6/preview' }
          ]
        },
        {
          id: 'ch3',
          title: 'الباب الثالث: الوراثة',
          lessons: [
            { id: 'v7', title: 'الدرس الأول: قوانين مندل', duration: '60 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_7/preview' },
            { id: 'v8', title: 'الدرس الثاني: الوراثة الجزيئية', duration: '55 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_8/preview' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'جيولوجيا الصف الثالث الثانوي',
      description: 'كورس متكامل لمنهج الجيولوجيا للثانوية العامة',
      icon: '🌍',
      chapters: [
        {
          id: 'ch4',
          title: 'الباب الأول: علم الجيولوجيا ومادة الأرض',
          lessons: [
            { id: 'v9', title: 'الدرس الأول: علم الجيولوجيا وأهميته', duration: '40 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_9/preview' },
            { id: 'v10', title: 'الدرس الثاني: المعادن', duration: '45 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_10/preview' },
            { id: 'v11', title: 'الدرس الثالث: الصخور', duration: '50 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_11/preview' }
          ]
        },
        {
          id: 'ch5',
          title: 'الباب الثاني: التراكيب الجيولوجية',
          lessons: [
            { id: 'v12', title: 'الدرس الأول: الفوالق', duration: '45 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_12/preview' },
            { id: 'v13', title: 'الدرس الثاني: الطيات', duration: '40 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_13/preview' }
          ]
        },
        {
          id: 'ch6',
          title: 'الباب الثالث: الزلازل والبراكين',
          lessons: [
            { id: 'v14', title: 'الدرس الأول: الزلازل', duration: '55 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_14/preview' },
            { id: 'v15', title: 'الدرس الثاني: البراكين', duration: '50 دقيقة', driveLink: 'https://drive.google.com/file/d/SAMPLE_ID_15/preview' }
          ]
        }
      ]
    }
  ];

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleVideoClick = (video) => {
    if (!user.isActive) {
      setShowInactiveModal(true);
    } else {
      setSelectedVideo(video);
    }
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="courses-page">
      <Navbar />

      <div className="container courses-container">
        {!user.isActive && (
          <div className="inactive-alert">
            <AlertCircle size={24} />
            <div>
              <h3>حسابك غير مفعل</h3>
              <p>
                للوصول إلى الفيديوهات التعليمية، يرجى التواصل مع الإدارة وإتمام الاشتراك عبر فودافون كاش.
              </p>
              <p><strong>رقم التواصل:</strong> 01012345678</p>
            </div>
          </div>
        )}

        <div className="page-header">
          <h1>الكورسات التعليمية</h1>
          <p>اختر الكورس المناسب وابدأ رحلتك التعليمية</p>
        </div>

        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-section">
              <div className="course-header">
                <div className="course-icon-large">{course.icon}</div>
                <div>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                </div>
              </div>

              {/* Chapters */}
              <div className="chapters-list">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id} className="chapter-item">
                    <button 
                      onClick={() => toggleChapter(chapter.id)}
                      className="chapter-header"
                    >
                      <h3>{chapter.title}</h3>
                      <span className="chapter-toggle">
                        {expandedChapters[chapter.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>

                    {expandedChapters[chapter.id] && (
                      <div className="lessons-list">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            onClick={() => handleVideoClick(lesson)}
                            className={`lesson-card ${!user.isActive ? 'locked' : ''}`}
                          >
                            <div className="lesson-icon">
                              {user.isActive ? (
                                <Play size={20} />
                              ) : (
                                <Lock size={20} />
                              )}
                            </div>
                            <div className="lesson-info">
                              <h4>{lesson.title}</h4>
                              <p>{lesson.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inactive Modal */}
      {showInactiveModal && (
        <div className="modal-backdrop" onClick={() => setShowInactiveModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon inactive">
                <Lock size={32} />
              </div>
              <h2>حسابك غير مفعل</h2>
              <p>للوصول إلى المحتوى التعليمي، يجب تفعيل حسابك أولاً</p>
            </div>

            <div className="activation-steps">
              <h3>خطوات التفعيل:</h3>
              <ol>
                <li>تواصل مع الإدارة على الرقم: <strong>01012345678</strong></li>
                <li>قم بتحويل قيمة الاشتراك عبر فودافون كاش</li>
                <li>أرسل إيصال الدفع للإدارة</li>
                <li>انتظر تفعيل حسابك (خلال 24 ساعة)</li>
              </ol>
            </div>

            <button
              onClick={() => setShowInactiveModal(false)}
              className="btn btn-primary btn-full"
            >
              فهمت
            </button>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && user.isActive && (
        <div className="modal-backdrop" onClick={closeVideoPlayer}>
          <div className="modal video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h2>{selectedVideo.title}</h2>
              <button onClick={closeVideoPlayer} className="close-btn">×</button>
            </div>
            
            <div className="video-container">
              <iframe
                src={selectedVideo.driveLink}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            <div className="video-footer">
              <p>⚠️ هذا المحتوى محمي بحقوق الملكية الفكرية</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}