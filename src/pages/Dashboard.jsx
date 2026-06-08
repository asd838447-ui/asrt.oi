import React, { useState, useEffect, useRef } from 'react';

import { lessonsData as defaultLessons } from '../lessonsData';

export default function Dashboard({ user, navigate, onLogout }) {
  const [showLessons, setShowLessons] = useState(() => {
    return localStorage.getItem('activeSubject') === 'chemistry';
  });

  const handleChemistryClick = () => {
    setShowLessons(true);
    localStorage.setItem('activeSubject', 'chemistry');
  };
  const [showBioOverlay, setShowBioOverlay] = useState(false);
  const [lessons, setLessons] = useState([]);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      try {
        const parsed = JSON.parse(storedLessons);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sort by ID ascending
          const sorted = [...parsed].sort((a, b) => a.id - b.id);
          setLessons(sorted);
        } else {
          localStorage.setItem('lessons', JSON.stringify(defaultLessons));
          setLessons(defaultLessons);
        }
      } catch (e) {
        localStorage.setItem('lessons', JSON.stringify(defaultLessons));
        setLessons(defaultLessons);
      }
    } else {
      localStorage.setItem('lessons', JSON.stringify(defaultLessons));
      setLessons(defaultLessons);
    }
  }, []);

  useEffect(() => {
    if (showBioOverlay) {
      // Focus the close button when overlay opens to ensure accessibility
      closeBtnRef.current?.focus();
    }
  }, [showBioOverlay]);

  const handleLessonSelect = (lesson) => {
    if (!lesson.isUnlocked) return;
    navigate(`lesson/${lesson.id}`);
  };

  const handleKeyDown = (e) => {
    if (showBioOverlay && e.key === 'Tab') {
      // Trap focus inside the overlay by preventing tab from moving focus elsewhere
      e.preventDefault();
      closeBtnRef.current?.focus();
    }
  };

  return (
    <div className="page-dashboard" onKeyDown={handleKeyDown}>
      <div className="header">
        <span>Вы вошли как: <strong>{user?.username}</strong> ({user?.role})</span>
        <button 
          data-testid="logout-btn" 
          onClick={onLogout}
          tabIndex={showBioOverlay ? -1 : 0}
        >
          Выйти
        </button>
        {user?.role === 'admin' && (
          <button 
            data-testid="admin-panel-btn" 
            onClick={() => navigate('admin')}
            tabIndex={showBioOverlay ? -1 : 0}
          >
            Админ Панель
          </button>
        )}
      </div>

      <h2>Выберите предмет</h2>
      <div className="subjects">
        <button 
          data-testid="subject-chemistry-btn" 
          className="subject-btn chemistry"
          onClick={handleChemistryClick}
          tabIndex={showBioOverlay ? -1 : 0}
        >
          <svg className="subject-icon chemistry-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="8" className="nucleus" />
            <ellipse cx="50" cy="50" rx="35" ry="12" strokeWidth="1.5" transform="rotate(30 50 50)" />
            <circle cx="50" cy="50" r="3" className="electron electron-1" />
            <ellipse cx="50" cy="50" rx="35" ry="12" strokeWidth="1.5" transform="rotate(90 50 50)" />
            <circle cx="50" cy="50" r="3" className="electron electron-2" />
            <ellipse cx="50" cy="50" rx="35" ry="12" strokeWidth="1.5" transform="rotate(150 50 50)" />
            <circle cx="50" cy="50" r="3" className="electron electron-3" />
          </svg>
          <h4>Химия</h4>
        </button>
        <button 
          data-testid="subject-biology-btn" 
          className="subject-btn biology"
          onClick={() => setShowBioOverlay(true)}
          tabIndex={showBioOverlay ? -1 : 0}
        >
          <svg className="subject-icon biology-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="dna-strand">
              <line x1="30" y1="20" x2="70" y2="20" strokeWidth="1.5" className="rung rung-1" />
              <line x1="33" y1="32" x2="67" y2="32" strokeWidth="1.5" className="rung rung-2" />
              <line x1="40" y1="44" x2="60" y2="44" strokeWidth="1.5" className="rung rung-3" />
              <line x1="48" y1="56" x2="52" y2="56" strokeWidth="1.5" className="rung rung-4" />
              <line x1="40" y1="68" x2="60" y2="68" strokeWidth="1.5" className="rung rung-5" />
              <line x1="33" y1="80" x2="67" y2="80" strokeWidth="1.5" className="rung rung-6" />
              
              <path d="M30 20C40 28 45 40 50 56C55 72 60 76 67 80" strokeWidth="3" strokeLinecap="round" className="backbone backbone-1" />
              <path d="M70 20C60 28 55 40 50 56C45 72 40 76 33 80" strokeWidth="3" strokeLinecap="round" className="backbone backbone-2" />
              
              <circle cx="30" cy="20" r="4" />
              <circle cx="70" cy="20" r="4" />
              <circle cx="33" cy="32" r="4" />
              <circle cx="67" cy="32" r="4" />
              <circle cx="40" cy="44" r="4" />
              <circle cx="60" cy="44" r="4" />
              <circle cx="40" cy="68" r="4" />
              <circle cx="60" cy="68" r="4" />
              <circle cx="33" cy="80" r="4" />
              <circle cx="67" cy="80" r="4" />
            </g>
          </svg>
          <h4>Биология</h4>
        </button>
      </div>

      {showBioOverlay && (
        <div 
          data-testid="biology-lock-overlay" 
          className="overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div 
            className="overlay-content" 
            style={{ 
              background: 'var(--bg-color, white)', 
              color: 'var(--text-color, black)', 
              padding: '20px', 
              borderRadius: '8px' 
            }}
          >
            <h3>Раздел в разработке</h3>
            <p>Биология (В разработке)</p>
            <button 
              ref={closeBtnRef}
              data-testid="biology-overlay-close" 
              onClick={() => setShowBioOverlay(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {showLessons && (
        <div className="lessons-section">
          <h3>Учебный план: Химия</h3>
          <div data-testid="lesson-list" className="lesson-list">
            {lessons.map(lesson => (
              <div 
                key={lesson.id} 
                data-testid={`lesson-item-${lesson.id}`}
                className={`lesson-item ${lesson.isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => handleLessonSelect(lesson)}
                style={{ 
                  cursor: lesson.isUnlocked ? 'pointer' : 'not-allowed'
                }}
              >
                <h4>{lesson.title}</h4>
                <p>День: {lesson.weekDay} | Время: {lesson.hours} ч</p>
                {!lesson.isUnlocked && (
                  <span data-testid={`lesson-lock-${lesson.id}`} className="lock-icon">
                    🔒 Заблокировано
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
