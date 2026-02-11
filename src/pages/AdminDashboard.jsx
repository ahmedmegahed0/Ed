// src/pages/AdminDashboard.jsx
import { useState } from 'react';
import { Users, Check, X, Trash2, Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phone: '01012345678',
      isActive: true,
      registeredAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'فاطمة حسن',
      email: 'fatima@example.com',
      phone: '01098765432',
      isActive: false,
      registeredAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'محمود إبراهيم',
      email: 'mahmoud@example.com',
      phone: '01123456789',
      isActive: true,
      registeredAt: '2024-01-18'
    },
    {
      id: '4',
      name: 'سارة أحمد',
      email: 'sarah@example.com',
      phone: '01234567890',
      isActive: false,
      registeredAt: '2024-01-22'
    },
    {
      id: '5',
      name: 'يوسف عبدالله',
      email: 'youssef@example.com',
      phone: '01145678901',
      isActive: true,
      registeredAt: '2024-01-16'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && student.isActive) ||
      (filterStatus === 'inactive' && !student.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const toggleStudentStatus = (studentId) => {
    setStudents(students.map(student =>
      student.id === studentId
        ? { ...student, isActive: !student.isActive }
        : student
    ));
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setStudents(students.filter(s => s.id !== studentToDelete.id));
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const stats = {
    total: students.length,
    active: students.filter(s => s.isActive).length,
    inactive: students.filter(s => !s.isActive).length
  };

  return (
    <div className="admin-page">
      <Navbar />

      <div className="container admin-container">
        <div className="page-header">
          <h1>لوحة تحكم الإدارة</h1>
          <p>إدارة حسابات الطلاب وتفعيل الاشتراكات</p>
        </div>

        <div className="stats-grid">
          {/* <div className="stat-card">
             <div className="stat-content">
              <div>
                <p className="stat-label">إجمالي الطلاب</p>
                <p className="stat-value">{stats.total}</p>
              </div>
              <div className="stat-icon blue">
                <Users size={28} />
              </div>
            </div> 
          </div> */}

           {/* <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">حسابات نشطة</p>
                <p className="stat-value green">{stats.active}</p>
              </div>
              <div className="stat-icon green">
                <Check size={28} />
              </div>
            </div>
          </div>  */}

           {/* <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">في انتظار التفعيل</p>
                <p className="stat-value orange">{stats.inactive}</p>
              </div>
              <div className="stat-icon orange">
                <X size={28} />
              </div>
            </div>
          </div>  */}
        </div>

        <div className="filters-card">
          <div className="filters-content">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="ابحث بالاسم، البريد أو رقم الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-box">
              <Filter size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">جميع الحسابات</option>
                <option value="active">النشطة فقط</option>
                <option value="inactive">غير المفعلة فقط</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-card">
          <div className="table-responsive">
            <table className="students-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>رقم الهاتف</th>
                  <th>تاريخ التسجيل</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-results">
                      لا توجد نتائج
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <p className="student-name">{student.name}</p>
                      </td>
                      <td className="student-email">{student.email}</td>
                      <td className="student-phone">{student.phone}</td>
                      <td className="student-date">{student.registeredAt}</td>
                      <td>
                        <span className={`badge ${student.isActive ? 'badge-success' : 'badge-warning'}`}>
                          {student.isActive ? '● نشط' : '● غير مفعل'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {student.isActive ? (
                            <button
                              onClick={() => toggleStudentStatus(student.id)}
                              className="action-btn deactivate"
                              title="إلغاء التفعيل"
                            >
                              <X size={18} />
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleStudentStatus(student.id)}
                              className="action-btn activate"
                              title="تفعيل الحساب"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteClick(student)}
                            className="action-btn delete"
                            title="حذف الحساب"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDeleteModal && studentToDelete && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon delete">
                <Trash2 size={32} />
              </div>
              <h2>تأكيد الحذف</h2>
              <p>
                هل أنت متأكد من حذف حساب <strong>{studentToDelete.name}</strong>؟
              </p>
              <p className="warning-text">⚠️ هذا الإجراء لا يمكن التراجع عنه</p>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="btn btn-danger"
              >
                حذف الحساب
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}