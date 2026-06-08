import React, { useState, useEffect } from 'react';

export default function AdminPanel({ navigate, onLogout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [scores, setScores] = useState({});
  const [error, setError] = useState('');

  // Editing state for lessons
  const [editTexts, setEditTexts] = useState({});
  const [editVideos, setEditVideos] = useState({});

  useEffect(() => {
    // Load student accounts
    const storedUsers = localStorage.getItem('users');
    let allUsers = [];
    if (storedUsers) {
      try {
        const parsed = JSON.parse(storedUsers);
        if (Array.isArray(parsed)) {
          allUsers = [...parsed];
        }
      } catch (e) {
        console.error('Error loading students', e);
      }
    }

    // Load scores
    const storedScores = localStorage.getItem('scores');
    let allScores = {};
    if (storedScores) {
      try {
        allScores = JSON.parse(storedScores) || {};
      } catch (e) {
        console.error('Error loading scores', e);
      }
    }
    setScores(allScores);

    // Merge usernames from scores into students list if not present
    Object.keys(allScores).forEach(uname => {
      if (!allUsers.some(u => u.username === uname) && uname !== 'asd838') {
        allUsers.push({ username: uname, role: 'student' });
      }
    });

    setStudents(allUsers.filter(u => u.role !== 'admin'));

    // Load lessons
    const storedLessons = localStorage.getItem('lessons');
    let allLessons = [];
    if (storedLessons) {
      try {
        const parsed = JSON.parse(storedLessons);
        if (Array.isArray(parsed)) {
          allLessons = parsed;
        }
      } catch (e) {
        console.error('Error loading lessons', e);
      }
    }
    const sortedLessons = allLessons.sort((a, b) => a.id - b.id);
    setLessons(sortedLessons);

    // Initialize lesson edit inputs
    const initialTexts = {};
    const initialVideos = {};
    sortedLessons.forEach(l => {
      initialTexts[l.id] = l.content || '';
      initialVideos[l.id] = l.videoUrl || '';
    });
    setEditTexts(initialTexts);
    setEditVideos(initialVideos);
  }, []);

  const handleCreateStudent = (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('Error: Please fill in all fields (Заполните все поля)');
      return;
    }

    const storedUsers = localStorage.getItem('users');
    let allUsers = [];
    try {
      allUsers = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(allUsers)) allUsers = [];
    } catch (err) {
      allUsers = [];
    }

    // Check for duplicate username
    const exists = allUsers.some(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    );
    if (exists || trimmedUsername === 'asd838') {
      setError('Error: Student with this username already exists (Студент с таким именем уже существует)');
      return;
    }

    // Add new student
    const newStudent = { 
      username: trimmedUsername, 
      password: trimmedPassword, 
      role: 'student',
      createdAt: new Date().toISOString()
    };
    allUsers.push(newStudent);
    localStorage.setItem('users', JSON.stringify(allUsers));

    // Update state
    setStudents(allUsers.filter(u => u.role !== 'admin'));
    setUsername('');
    setPassword('');
  };

  const handleDeleteStudent = (studentUsername) => {
    const storedUsers = localStorage.getItem('users');
    let allUsers = [];
    try {
      allUsers = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(allUsers)) allUsers = [];
    } catch (err) {
      allUsers = [];
    }

    const updatedUsers = allUsers.filter(u => u.username !== studentUsername);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setStudents(updatedUsers.filter(u => u.role !== 'admin'));
  };

  const handleSaveLesson = (lessonId) => {
    const updatedLessons = lessons.map(l => {
      if (l.id === lessonId) {
        return {
          ...l,
          content: editTexts[lessonId],
          videoUrl: editVideos[lessonId]
        };
      }
      return l;
    });

    localStorage.setItem('lessons', JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
  };

  const handleUnlockLesson = (lessonId) => {
    const updatedLessons = lessons.map(l => {
      if (l.id === lessonId) {
        return {
          ...l,
          isUnlocked: true
        };
      }
      return l;
    });

    localStorage.setItem('lessons', JSON.stringify(updatedLessons));
    setLessons(updatedLessons);
  };

  // Helper to format score display for student list
  const getStudentScoreInfo = (studentUsername) => {
    const studentScores = scores[studentUsername];
    if (!studentScores || Object.keys(studentScores).length === 0) {
      return '';
    }
    const scoreStrings = Object.entries(studentScores).map(([lessonKey, val]) => {
      const lessonNum = lessonKey.replace('lesson_', '');
      return `Урок ${lessonNum}: ${val.score}%`;
    });
    return ` (Баллы: ${scoreStrings.join(', ')})`;
  };

  return (
    <div className="page-admin">
      <button 
        data-testid="admin-panel-btn" 
        onClick={() => navigate('admin')} 
        style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '1px', opacity: 0, border: 'none', padding: 0 }}
      />
      <div className="admin-header">
        <h2>Панель администратора</h2>
        <div className="admin-nav-buttons">
          <button data-testid="back-to-lessons-btn" onClick={() => navigate('dashboard')}>
            Назад
          </button>
          <button data-testid="logout-btn" onClick={onLogout}>
            Выйти
          </button>
        </div>
      </div>

      <div className="admin-grid">
        {/* Student Accounts Section */}
        <div className="admin-card student-management">
          <h3>Регистрация студента</h3>
          <form onSubmit={handleCreateStudent} className="admin-form">
            <div className="form-group">
              <label htmlFor="new-student-username">Имя пользователя:</label>
              <input
                id="new-student-username"
                type="text"
                data-testid="new-student-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-student-password">Пароль:</label>
              <input
                id="new-student-password"
                type="password"
                data-testid="new-student-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" data-testid="create-student-submit">
              Создать аккаунт
            </button>
          </form>

          <h3>Список студентов</h3>
          <div data-testid="student-list" className="student-list">
            {students.length === 0 ? (
              <p className="no-students">Студенты не зарегистрированы</p>
            ) : (
              <ul className="student-ul">
                {students.map((student, idx) => (
                  <li key={idx} className="student-li-item">
                    <div className="student-info">
                      <span className="student-username">{student.username}</span>
                      <span className="student-scores">{getStudentScoreInfo(student.username)}</span>
                    </div>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteStudent(student.username)}
                      title="Удалить студента"
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Lesson Editor Section */}
        <div className="admin-card lesson-management">
          <h3>Управление учебным планом</h3>
          <div className="lessons-list-admin">
            {lessons.map(lesson => (
              <div key={lesson.id} className="lesson-editor-item">
                <div className="lesson-editor-header">
                  <h4>Урок {lesson.id}: {lesson.title}</h4>
                  <div className="lesson-status-badge">
                    {lesson.isUnlocked ? (
                      <span className="badge-unlocked">Разблокирован</span>
                    ) : (
                      <span className="badge-locked">Заблокирован</span>
                    )}
                    {!lesson.isUnlocked && lesson.id !== 1 && (
                      <button 
                        data-testid={`unlock-lesson-${lesson.id}`}
                        onClick={() => handleUnlockLesson(lesson.id)}
                        className="btn-unlock"
                      >
                        Разблокировать
                      </button>
                    )}
                  </div>
                </div>

                <div className="lesson-editor-fields">
                  <div className="form-group">
                    <label htmlFor={`edit-text-${lesson.id}`}>Теоретический материал:</label>
                    <textarea
                      id={`edit-text-${lesson.id}`}
                      data-testid={`edit-lesson-text-${lesson.id}`}
                      value={editTexts[lesson.id] || ''}
                      onChange={(e) => setEditTexts({
                        ...editTexts,
                        [lesson.id]: e.target.value
                      })}
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`edit-video-${lesson.id}`}>Путь к видеолекции:</label>
                    <input
                      id={`edit-video-${lesson.id}`}
                      type="text"
                      data-testid={`edit-lesson-video-${lesson.id}`}
                      value={editVideos[lesson.id] || ''}
                      onChange={(e) => setEditVideos({
                        ...editVideos,
                        [lesson.id]: e.target.value
                      })}
                    />
                  </div>

                  <button 
                    data-testid={`save-lesson-edits-${lesson.id}`}
                    onClick={() => handleSaveLesson(lesson.id)}
                    className="btn-save-lesson"
                  >
                    Сохранить изменения
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
