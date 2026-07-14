import React, { useState } from 'react';

export default function App() {
  // --- ESTADOS DE LA APLICACIÓN ---
  // Controla en qué pantalla estamos: 'mapa' o 'leccion'
  const [vistaActual, setVistaActual] = useState('mapa');
  
  // Estadísticas globales del usuario
  const [vidas, setVidas] = useState(5);
  const [xp, setXp] = useState(0);
  const [racha, setRacha] = useState(12);

  // Estados específicos de la lección
  const [respuesta, setRespuesta] = useState('');
  const [estadoLeccion, setEstadoLeccion] = useState('escribiendo'); // 'escribiendo', 'correcto', 'incorrecto'

  // --- LÓGICA DE LA LECCIÓN ---
  const comprobarRespuesta = () => {
    if (respuesta.trim() === '50') {
      setEstadoLeccion('correcto');
      setXp(xp + 10); // Sumamos XP al ganar
    } else {
      setEstadoLeccion('incorrecto');
      if (vidas > 0) setVidas(vidas - 1); // Restamos una vida al fallar
    }
  };

  const regresarAlMapa = () => {
    setVistaActual('mapa');
    setEstadoLeccion('escribiendo');
    setRespuesta('');
  };

  const recargarVidas = () => {
    setVidas(5);
    setVistaActual('mapa'); // Vuelve al mapa por seguridad
  };

  // --- RENDERIZADO DEL MAPA ---
  const renderMapa = () => (
    <div className="contenedor-mapa">
      <h2 className="titulo-seccion">Módulo 1: Fundamentos</h2>
      
      {/* Nodo 1: Activo */}
      <div className="nodo-camino activo" onClick={() => setVistaActual('leccion')}>
        <div className="icono-nodo">⭐</div>
      </div>
      <p className="texto-nodo">Configura tu Servidor</p>

      {/* Línea conectora */}
      <div className="linea-conectora"></div>

      {/* Nodo 2: Bloqueado */}
      <div className="nodo-camino bloqueado">
        <div className="icono-nodo">🔒</div>
      </div>
      <p className="texto-nodo gris">Variables y Tipos</p>
      
      {/* Línea conectora */}
      <div className="linea-conectora"></div>

      {/* Nodo 3: Bloqueado */}
      <div className="nodo-camino bloqueado">
        <div className="icono-nodo">🔒</div>
      </div>
      <p className="texto-nodo gris">Automatización Base</p>
    </div>
  );

  // --- RENDERIZADO DE LA LECCIÓN ---
  const renderLeccion = () => (
    <div className="contenedor-leccion">
      <h3 className="subtitulo-gris">Módulo 1: Fundamentos de Python</h3>
      <h1 className="titulo-leccion">Lección: Configura tu Servidor</h1>
      <p className="instruccion">
        Tu primer servidor multijugador necesita configuración. Corrige el valor de <strong>unidades_disponibles</strong> para establecer 50 servidores operativos.
      </p>

      <div className="editor-codigo">
        <p><span className="keyword">configuracion_servidor</span> = {'{'}</p>
        <p className="indent">"nombre": <span className="string">"Servidor_Principal"</span>,</p>
        <p className="indent">"puerto": <span className="number">8080</span>,</p>
        <p className="indent">
          "unidades_disponibles": 
          <input 
            type="text" 
            className="input-codigo"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            disabled={estadoLeccion === 'correcto'}
            placeholder="..."
            autoFocus
          />
        </p>
        <p>{'}'}</p>
      </div>

      {estadoLeccion === 'incorrecto' && (
        <div className="alerta-error">
          ❌ ¡Oops! Esa no es la cantidad correcta. Revisa el número.
        </div>
      )}

      {estadoLeccion === 'correcto' ? (
        <div className="area-exito">
          <div className="alerta-exito">
            <h2>✔ ¡CORRECTO! +10 XP</h2>
          </div>
          <button className="btn-continuar" onClick={regresarAlMapa}>
            CONTINUAR AL MAPA
          </button>
        </div>
      ) : (
        <button className="btn-comprobar" onClick={comprobarRespuesta}>
          COMPROBAR
        </button>
      )}
    </div>
  );

  // --- RENDERIZADO DE SIN VIDAS ---
  const renderSinVidas = () => (
    <div className="contenedor-sin-vidas">
      <div className="corazon-roto">💔</div>
      <h1 className="titulo-leccion">¡Te quedaste sin vidas!</h1>
      <p className="instruccion">
        Cometiste demasiados errores configurando el servidor. Descansa un poco o recarga tus vidas para seguir aprendiendo.
      </p>
      <button className="btn-recargar" onClick={recargarVidas}>
        RECARGAR VIDAS (Gratis por ahora)
      </button>
    </div>
  );

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="app-global">
      {/* INYECCIÓN DE ESTILOS CSS EN EL MISMO ARCHIVO */}
      <style>{`
        body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; color: #3c3c3c; }
        .app-global { max-width: 600px; margin: 0 auto; background: white; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
        
        /* HEADER */
        .header-stats { display: flex; justify-content: center; gap: 30px; padding: 20px; border-bottom: 2px solid #eee; font-size: 1.2rem; font-weight: bold; background: white; position: sticky; top: 0; z-index: 10; }
        .stat-fuego { color: #ff9600; }
        .stat-vidas { color: #ff4b4b; }
        .stat-xp { color: #58cc02; }
        
        /* MAPA */
        .contenedor-mapa { padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
        .titulo-seccion { width: 100%; text-align: left; font-size: 1.5rem; margin-bottom: 40px; color: #4b4b4b; }
        .nodo-camino { width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.2s; position: relative; }
        .nodo-camino.activo { background-color: #58cc02; box-shadow: 0 8px 0 #58a700; transform: translateY(-4px); }
        .nodo-camino.activo:active { box-shadow: 0 0 0 #58a700; transform: translateY(4px); }
        .nodo-camino.bloqueado { background-color: #e5e5e5; box-shadow: 0 8px 0 #cecece; cursor: not-allowed; }
        .icono-nodo { font-size: 2rem; }
        .texto-nodo { margin-top: 20px; font-weight: bold; font-size: 1.1rem; }
        .texto-nodo.gris { color: #afafaf; }
        .linea-conectora { width: 10px; height: 60px; background-color: #e5e5e5; margin: 10px 0; border-radius: 5px; }

        /* LECCION */
        .contenedor-leccion { padding: 30px 20px; display: flex; flex-direction: column; flex-grow: 1; }
        .subtitulo-gris { color: #afafaf; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; margin-bottom: 5px; }
        .titulo-leccion { margin-top: 0; font-size: 1.8rem; margin-bottom: 20px; }
        .instruccion { font-size: 1.1rem; line-height: 1.5; margin-bottom: 30px; }
        
        .editor-codigo { background-color: #282c34; color: #abb2bf; padding: 20px; border-radius: 15px; font-family: 'Courier New', Courier, monospace; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .editor-codigo p { margin: 5px 0; }
        .editor-codigo .indent { padding-left: 30px; }
        .editor-codigo .keyword { color: #c678dd; }
        .editor-codigo .string { color: #98c379; }
        .editor-codigo .number { color: #d19a66; }
        
        .input-codigo { background-color: #3e4451; border: 2px solid #5c6370; color: white; border-radius: 8px; padding: 5px 10px; font-size: 1.1rem; width: 60px; text-align: center; margin-left: 10px; font-family: monospace; outline: none; }
        .input-codigo:focus { border-color: #61afef; }
        
        .btn-comprobar, .btn-continuar { width: 100%; padding: 18px; border-radius: 15px; font-size: 1.2rem; font-weight: bold; text-align: center; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; margin-top: auto; transition: transform 0.1s; }
        .btn-comprobar { background-color: #58cc02; color: white; box-shadow: 0 6px 0 #58a700; }
        .btn-comprobar:active { box-shadow: 0 0 0 #58a700; transform: translateY(6px); }
        
        .btn-continuar { background-color: #58cc02; color: white; box-shadow: 0 6px 0 #58a700; }
        
        .alerta-error { background-color: #ffdfe0; color: #ea2b2b; padding: 15px; border-radius: 10px; font-weight: bold; text-align: center; margin-bottom: 20px; border: 2px solid #ea2b2b; }
        .area-exito { display: flex; flex-direction: column; gap: 20px; margin-top: auto; }
        .alerta-exito { background-color: #d7ffb8; color: #58a700; padding: 20px; border-radius: 15px; text-align: center; border: 2px solid #58cc02; }
        .alerta-exito h2 { margin: 0; }

        /* SIN VIDAS */
        .contenedor-sin-vidas { padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-grow: 1; text-align: center; }
        .corazon-roto { font-size: 5rem; margin-bottom: 20px; animation: latido-roto 2s infinite; }
        .btn-recargar { width: 100%; max-width: 300px; padding: 18px; border-radius: 15px; font-size: 1.1rem; font-weight: bold; border: none; cursor: pointer; text-transform: uppercase; margin-top: 30px; background-color: #1cb0f6; color: white; box-shadow: 0 6px 0 #1899d6; transition: transform 0.1s; }
        .btn-recargar:active { box-shadow: 0 0 0 #1899d6; transform: translateY(6px); }
        @keyframes latido-roto { 0% { transform: scale(1); } 50% { transform: scale(1.1) rotate(-5deg); } 100% { transform: scale(1); } }
      `}</style>

      {/* BARRA SUPERIOR FIJA */}
      <div className="header-stats">
        <span className="stat-fuego">🔥 {racha}</span>
        <span className="stat-vidas">❤️ {vidas}</span>
        <span className="stat-xp">⚡ {xp} XP</span>
      </div>

      {/* RENDERIZADO CONDICIONAL MODIFICADO */}
      {vidas === 0 ? renderSinVidas() : (vistaActual === 'mapa' ? renderMapa() : renderLeccion())}
      
    </div>
  );
}