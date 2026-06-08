import React, { useState, useEffect } from 'react';

export default function LessonDetail({ id, user, navigate, onLogout }) {
  const [lesson, setLesson] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [warning, setWarning] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const [pdfInteractive, setPdfInteractive] = useState(false);
  const [lessonsList, setLessonsList] = useState([]);

  const lessonId = parseInt(id, 10);

  useEffect(() => {
    if (showPdf) {
      const timer = setTimeout(() => {
        setPdfInteractive(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setPdfInteractive(false);
    }
  }, [showPdf]);

  useEffect(() => {
    setSelectedOption(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(null);
    setWarning('');

    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      try {
        const parsed = JSON.parse(storedLessons);
        if (Array.isArray(parsed)) {
          setLessonsList(parsed);
          const found = parsed.find(l => l.id === lessonId);
          if (found) {
            setLesson(found);
            // If the lesson has a quiz, let's parse it if it is a string
            if (typeof found.test === 'string') {
              try {
                found.test = JSON.parse(found.test);
              } catch (e) {
                found.test = { questions: [] };
              }
            }
          }
        }
      } catch (e) {
        console.error('Error loading lessons', e);
      }
    }
  }, [lessonId]);

  if (!lesson) {
    return <div className="loading">Загрузка урока...</div>;
  }

  // If the lesson is locked, do not render content to block unauthorized access
  if (!lesson.isUnlocked) {
    return (
      <div className="page-lesson-locked">
        <h2>Урок заблокирован</h2>
        <p>Пожалуйста, пройдите предыдущие уроки, чтобы разблокировать этот материал.</p>
        <button data-testid="back-to-lessons-btn" onClick={() => navigate('dashboard')}>
          Назад к списку
        </button>
      </div>
    );
  }

  // Parse questions safely
  let questions = [];
  if (lesson.test && Array.isArray(lesson.test.questions)) {
    questions = lesson.test.questions;
  }

  const handleOptionChange = (e) => {
    setSelectedOption(parseInt(e.target.value, 10));
    setWarning('');
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) {
      setWarning('Warning: please select an option (Выберите вариант ответа)');
      return;
    }

    const nextAnswers = [...userAnswers, selectedOption];
    setUserAnswers(nextAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Last question, compute score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        const ans = idx === questions.length - 1 ? selectedOption : nextAnswers[idx];
        if (ans === q.correctAnswer) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);

      const passed = finalScore >= 50;

      // Save score in localStorage
      if (user && user.username) {
        const storedScores = localStorage.getItem('scores');
        let scores = {};
        try {
          scores = storedScores ? JSON.parse(storedScores) : {};
        } catch (e) {
          scores = {};
        }

        if (!scores[user.username]) {
          scores[user.username] = {};
        }

        scores[user.username][`lesson_${lesson.id}`] = {
          score: finalScore,
          maxScore: 100,
          passed: passed,
          timestamp: new Date().toISOString()
        };

        localStorage.setItem('scores', JSON.stringify(scores));

        // Unlock the next lesson if passed
        if (passed) {
          const nextLessonId = lesson.id + 1;
          const updatedLessons = lessonsList.map(l => {
            if (l.id === nextLessonId) {
              return { ...l, isUnlocked: true };
            }
            return l;
          });
          localStorage.setItem('lessons', JSON.stringify(updatedLessons));
          setLessonsList(updatedLessons);
        }
      }
    }
  };

  const handleRetake = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(null);
    setWarning('');
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('user');
      navigate('login');
    }
  };

  return (
    <div className="page-lesson-detail">
      <div className="header">
        <button data-testid="back-to-lessons-btn" onClick={() => navigate('dashboard')}>
          Назад
        </button>
        <h2>{lesson.title}</h2>
        <button data-testid="logout-btn" onClick={handleLogout}>
          Выйти
        </button>
      </div>

      <div className="content-container">
        {/* Video Player */}
        <div className="video-section">
          <h3>Видеолекция</h3>
          <video 
            data-testid="lesson-video-player" 
            src={lesson.videoUrl || ''} 
            controls 
            style={{ width: '100%', maxWidth: '600px' }}
          />
        </div>

        {/* Text Content */}
        <div className="text-section">
          <h3>Теоретический материал</h3>
          <div data-testid="lesson-text-content" className="lesson-text-content">
            <h4>{lesson.title}</h4>
            <div className="lesson-text-body">
              {lesson.content || 'Текст урока отсутствует.'}
            </div>
          </div>
        </div>

        {/* Textbooks */}
        {lesson.textbookPdf && (
          <div className="textbook-section">
            <h3>Учебные материалы</h3>
            <button
              data-testid={`textbook-link-${lesson.id}`}
              onClick={() => setShowPdf(true)}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              Открыть {lesson.textbookPdf}
            </button>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {showPdf && (
        <div 
          data-testid="pdf-viewer" 
          className="pdf-viewer-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            pointerEvents: 'none'
          }}
        >
          <div style={{ background: 'white', padding: '10px', borderRadius: '4px', width: '100%', height: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', pointerEvents: pdfInteractive ? 'auto' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'black' }}>
              <h4>Просмотр: {lesson.textbookPdf}</h4>
              <button data-testid="pdf-close-btn" onClick={() => setShowPdf(false)}>
                Закрыть
              </button>
            </div>
            <iframe 
              data-testid="pdf-iframe"
              src={lesson.textbookPdf ? (lesson.textbookPdf.startsWith('http') ? lesson.textbookPdf : lesson.textbookPdf.replace(/ /g, '%20').replace(/#/g, '%23')) : ''}
              style={{ width: '100%', flex: 1, border: 'none' }}
              title="PDF Textbook Viewer"
            />
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {questions.length > 0 && (
        <div data-testid="quiz-container" className="quiz-section">
          <h3 data-testid="quiz-question">{questions[currentQuestionIndex].question}</h3>
          
          <div className="options-list">
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <label key={idx} style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="quiz-option"
                  data-testid={`quiz-option-${idx}`}
                  value={idx}
                  checked={selectedOption === idx}
                  onChange={handleOptionChange}
                  disabled={score !== null}
                />
                {option}
              </label>
            ))}
          </div>

          {warning && <div className="quiz-warning" style={{ color: 'var(--warning-color)', margin: '10px 0', fontWeight: 'bold' }}>{warning}</div>}

          {score === null ? (
            <button data-testid="quiz-submit-btn" onClick={handleQuizSubmit}>
              Отправить ответ
            </button>
          ) : (
            <div className="quiz-results">
              <p>Ваш результат: <strong data-testid="quiz-score">{score}%</strong></p>
              <button data-testid="quiz-retake-btn" onClick={handleRetake}>
                Пройти заново
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
