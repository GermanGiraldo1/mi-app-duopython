import { useState } from 'react';
import './App.css';

function App() {
  const [lives, setLives] = useState(5);
  const streak = 12; // Valor estático por ahora
  
  // Estados para la navegación y el reto
  const [vistaActual, setVistaActual] = useState('inicio'); // 'inicio' o 'leccion'
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'incorrect'

  const handleSimulateError = () => {
    if (lives > 0) {
      setLives(lives - 1);
    }
  };

  const handleStartLesson = () => {
    setVistaActual('leccion');
    setStatus('idle');
    setInputValue('');
  };

  const handleCheck = () => {
    if (inputValue.trim() === '50') {
      setStatus('correct');
    } else {
      setStatus('incorrect');
      if (lives > 0) {
        setLives(lives - 1);
      }
    }
  };

  const handleContinue = () => {
    // Por ahora regresamos al inicio al continuar
    setVistaActual('inicio');
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
        {/* RENDERIZADO CONDICIONAL: Dependiendo de vistaActual mostramos una cosa u otra */}
        {vistaActual === 'inicio' ? (
          <>
            <h1 className="course-title">Módulo 1: Fundamentos de Python</h1>
            
            <button className="btn-primary start-lesson" onClick={handleStartLesson}>
              Iniciar Lección
            </button>

            <button className="btn-secondary simulate-error" onClick={handleSimulateError}>
              Simular error
            </button>
          </>
        ) : (
          <div className="lesson-container">
            <h1 className="course-title lesson-title">Módulo 1: Fundamentos de Python</h1>
            <h2 className="lesson-subtitle">Lección: Configura tu Servidor</h2>
            <p className="lesson-instruction">
              Tu primer servidor multijugador necesita configuración. Corrige el valor de <strong>unidades_disponibles</strong> para establecer 50 servidores operativos.
            </p>
            
            <div className="code-editor">
              <pre>
{`configuracion_servidor = {
  "nombre": "Servidor_Principal",
  "puerto": 8080,
  "unidades_disponibles": `}<input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={`code-input ${status === 'incorrect' ? 'input-error' : ''}`}
                  disabled={status === 'correct'}
                  autoComplete="off"
                />{`
}`}
              </pre>
            </div>

            <div className="feedback-container">
              {status === 'correct' && (
                <div className="feedback-message success">
                  <h2>¡CORRECTO! +10 XP</h2>
                </div>
              )}
              {status === 'incorrect' && (
                <div className="feedback-message error">
                  <h2>Respuesta incorrecta.</h2>
                </div>
              )}
            </div>

            {status === 'correct' ? (
              <button className="btn-primary btn-success" onClick={handleContinue}>
                CONTINUAR
              </button>
            ) : (
              <button className="btn-primary" onClick={handleCheck}>
                COMPROBAR
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
