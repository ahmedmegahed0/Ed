// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProgress = localStorage.getItem('progress');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: '123',
        email: email,
        name: 'محمد أحمد',
        phone: '01234567890',
        isActive: true,
        role: email === 'admin@smartweb.com' ? 'admin' : 'student'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'خطأ في تسجيل الدخول' };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        isActive: false,
        role: 'student'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'خطأ في إنشاء الحساب' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Progress Tracker Functions
  const markLessonComplete = (lessonId) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        completed: true,
        completedAt: new Date().toISOString()
      }
    };
    setProgress(newProgress);
    localStorage.setItem('progress', JSON.stringify(newProgress));
  };

  const isLessonCompleted = (lessonId) => {
    return progress[lessonId]?.completed || false;
  };

  const getChapterProgress = (lessons) => {
    const completed = lessons.filter(lesson => isLessonCompleted(lesson.id)).length;
    return {
      completed,
      total: lessons.length,
      percentage: Math.round((completed / lessons.length) * 100)
    };
  };

  const getCourseProgress = (chapters) => {
    let totalLessons = 0;
    let completedLessons = 0;
    
    chapters.forEach(chapter => {
      totalLessons += chapter.lessons.length;
      completedLessons += chapter.lessons.filter(lesson => 
        isLessonCompleted(lesson.id)
      ).length;
    });
    
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    progress,
    markLessonComplete,
    isLessonCompleted,
    getChapterProgress,
    getCourseProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};