import React from 'react';

export default function Welcome({ navigate }) {
  const handleNext = () => {
    setTimeout(() => {
      navigate('login');
    }, 500);
  };

  return (
    <div className="page-welcome animated-fade-in">
      <div className="welcome-card animated-slide-up">
        <div className="welcome-logo">🧬🧪</div>
        <h1>Добро пожаловать!</h1>
        <p className="welcome-text">Здравствуйте, вы перешли по ссылке на сайт...</p>
        <p className="welcome-subtext">учителя по химии и биологии</p>
        <p className="welcome-description">
          Интерактивная образовательная платформа для эффективной подготовки к ЕНТ. 
          Изучайте теорию, смотрите видеолекции и проходите тренировочное тестирование.
        </p>
        <button 
          data-testid="welcome-next-btn" 
          onClick={handleNext}
          className="btn-welcome-next"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
