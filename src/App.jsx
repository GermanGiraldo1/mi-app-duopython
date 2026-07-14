import { useState } from 'react';
import './App.css';

function App() {
  const [lives, setLives] = useState(5);
  const streak = 12; // Valor estático por ahora

  const handleSimulateError = () => {
    if (lives > 0) {
      setLives(lives - 1);
    }
  };

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="nav-stats">
          <div className="stat streak">
            <span className="emoji">🔥</span> {streak}
          </div>
          <div className="stat lives">
            <span className="emoji">❤️</span> {lives}
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <h1 className="course-title">Módulo 1: Fundamentos de Python</h1>
        
        <button className="btn-primary start-lesson">
          Iniciar Lección
        </button>

        <button className="btn-secondary simulate-error" onClick={handleSimulateError}>
          Simular error
        </button>
      </main>
    </div>
  );
}

export default App;
