// ... existing code ...
  // Estadísticas globales del usuario
  const [vidas, setVidas] = useState(5);
  const [xp, setXp] = useState(0);
  const [racha, setRacha] = useState(12);
  const [gemas, setGemas] = useState(50); // NUEVO ESTADO: Moneda de la tienda

  // Estados específicos de la lección
// ... existing code ...
  const recargarVidas = () => {
    setVidas(5);
    setVistaActual('mapa');
  };

  // --- NUEVA LÓGICA DE TIENDA ---
  const comprarVidas = () => {
    if (gemas >= 20 && vidas < 5) {
      setGemas(gemas - 20);
      setVidas(5);
    }
  };

  const comprarProtector = () => {
    if (gemas >= 30) {
      setGemas(gemas - 30);
      // alert() bloqueado por reglas de diseño seguro, en su lugar podríamos usar un estado de feedback, pero por ahora solo descontamos
    }
  };

  // --- NUEVO: RENDERIZADO DE PERFIL ---
  const renderPerfil = () => (
    <div className="contenedor-perfil">
      <div className="cabecera-perfil">
        <div className="avatar-grande">🧑‍💻</div>
        <h2 className="nombre-usuario">DevNinja</h2>
        <p className="rango-usuario">Liga de Bronce</p>
      </div>

      <h3 className="titulo-seccion-pequeno">Tus Estadísticas</h3>
      <div className="grid-estadisticas">
        <div className="tarjeta-stat">
          <span className="icono-stat">⚡</span>
          <span className="valor-stat">{xp}</span>
          <span className="label-stat">XP Total</span>
        </div>
        <div className="tarjeta-stat">
          <span className="icono-stat">🔥</span>
          <span className="valor-stat">{racha}</span>
          <span className="label-stat">Días Racha</span>
        </div>
        <div className="tarjeta-stat">
          <span className="icono-stat">💎</span>
          <span className="valor-stat">{gemas}</span>
          <span className="label-stat">Gemas</span>
        </div>
      </div>

      <h3 className="titulo-seccion-pequeno">Logros</h3>
      <div className="lista-logros">
        <div className="logro-item completado">
          <div className="logro-icono">🏆</div>
          <div className="logro-textos">
            <h4>Primeros Pasos</h4>
            <p>Inicia tu aventura en DuoPython.</p>
          </div>
        </div>
        <div className={`logro-item ${xp >= 50 ? 'completado' : 'bloqueado'}`}>
          <div className="logro-icono">🧠</div>
          <div className="logro-textos">
            <h4>Cerebro Brillante</h4>
            <p>Alcanza 50 XP en total.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- NUEVO: RENDERIZADO DE TIENDA ---
  const renderTienda = () => (
    <div className="contenedor-tienda">
      <h2 className="titulo-seccion">Tienda Virtual</h2>
      <div className="saldo-tienda">
        Tienes <strong>{gemas} 💎</strong>
      </div>

      <div className="items-tienda">
        <div className="item-tienda">
          <div className="item-info">
            <span className="item-icono">❤️</span>
            <div className="item-textos">
              <h4>Recarga Completa</h4>
              <p>Restaura tus 5 vidas.</p>
            </div>
          </div>
          <button 
            className={`btn-comprar ${gemas < 20 || vidas === 5 ? 'inactivo' : ''}`}
            onClick={comprarVidas}
            disabled={gemas < 20 || vidas === 5}
          >
            20 💎
          </button>
        </div>

        <div className="item-tienda">
          <div className="item-info">
            <span className="item-icono">🛡️</span>
            <div className="item-textos">
              <h4>Protector de Racha</h4>
              <p>Salva tu racha si un día no juegas.</p>
            </div>
          </div>
          <button 
            className={`btn-comprar ${gemas < 30 ? 'inactivo' : ''}`}
            onClick={comprarProtector}
            disabled={gemas < 30}
          >
            30 💎
          </button>
        </div>
      </div>
    </div>
  );

  // --- NUEVO: BARRA DE NAVEGACIÓN INFERIOR ---
  const renderNavegacion = () => {
    // Solo mostrar navegación en estas tres pantallas
    if (!['mapa', 'perfil', 'tienda'].includes(vistaActual)) return null;

    return (
      <div className="barra-navegacion">
        <button className={`nav-btn ${vistaActual === 'mapa' ? 'activo' : ''}`} onClick={() => setVistaActual('mapa')}>
          <span className="nav-icono">🗺️</span>
          <span className="nav-texto">Ruta</span>
        </button>
        <button className={`nav-btn ${vistaActual === 'perfil' ? 'activo' : ''}`} onClick={() => setVistaActual('perfil')}>
          <span className="nav-icono">👤</span>
          <span className="nav-texto">Perfil</span>
        </button>
        <button className={`nav-btn ${vistaActual === 'tienda' ? 'activo' : ''}`} onClick={() => setVistaActual('tienda')}>
          <span className="nav-icono">🛒</span>
          <span className="nav-texto">Tienda</span>
        </button>
      </div>
    );
  };

  // --- RENDERIZADO DE BIENVENIDA ---
// ... existing code ...
  // CONTROL MAESTRO DE PANTALLAS
  const renderPantallaActual = () => {
    if (vistaActual === 'bienvenida') return renderBienvenida();
    if (vistaActual === 'login') return renderLogin();
    if (vidas === 0) return renderSinVidas();
    if (vistaActual === 'mapa') return renderMapa();
    if (vistaActual === 'leccion') return renderLeccion();
    if (vistaActual === 'perfil') return renderPerfil(); // NUEVO
    if (vistaActual === 'tienda') return renderTienda(); // NUEVO
  };

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="app-global">
      <style>{`
/* ... existing code ... */
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

        /* NUEVO: NAVEGACION INFERIOR */
        .app-global { padding-bottom: 80px; } /* Espacio para la barra inferior */
        .barra-navegacion { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 600px; background: white; border-top: 2px solid #eee; display: flex; justify-content: space-around; padding: 15px 0; z-index: 20; }
        .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; cursor: pointer; color: #afafaf; transition: color 0.2s; outline: none; }
        .nav-btn.activo { color: #1cb0f6; }
        .nav-icono { font-size: 1.8rem; margin-bottom: 5px; filter: grayscale(100%); opacity: 0.6; transition: all 0.2s; }
        .nav-btn.activo .nav-icono { filter: grayscale(0%); opacity: 1; }
        .nav-texto { font-weight: bold; font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase; }

        /* NUEVO: PERFIL */
        .contenedor-perfil { padding: 30px 20px; display: flex; flex-direction: column; animation: aparecer 0.3s ease-out; }
        .cabecera-perfil { display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
        .avatar-grande { font-size: 5rem; background: #e5e5e5; border-radius: 50%; padding: 20px; margin-bottom: 15px; border: 4px solid #1cb0f6; }
        .nombre-usuario { font-size: 1.8rem; margin: 0 0 5px 0; color: #4b4b4b; }
        .rango-usuario { color: #afafaf; font-weight: bold; margin: 0; }
        
        .titulo-seccion-pequeno { font-size: 1.2rem; color: #4b4b4b; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        
        .grid-estadisticas { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 30px; }
        .tarjeta-stat { border: 2px solid #eee; border-radius: 15px; padding: 15px 5px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .icono-stat { font-size: 2rem; margin-bottom: 5px; }
        .valor-stat { font-size: 1.2rem; font-weight: bold; color: #4b4b4b; }
        .label-stat { font-size: 0.8rem; color: #afafaf; text-transform: uppercase; font-weight: bold; margin-top: 5px; }

        .lista-logros { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
        .logro-item { display: flex; align-items: center; padding: 15px; border: 2px solid #eee; border-radius: 15px; gap: 15px; }
        .logro-item.completado { border-color: #ffc800; background-color: #fff9e6; }
        .logro-item.bloqueado { opacity: 0.5; filter: grayscale(100%); }
        .logro-icono { font-size: 2.5rem; }
        .logro-textos h4 { margin: 0 0 5px 0; color: #4b4b4b; }
        .logro-textos p { margin: 0; color: #777; font-size: 0.9rem; }

        /* NUEVO: TIENDA */
        .contenedor-tienda { padding: 30px 20px; display: flex; flex-direction: column; animation: aparecer 0.3s ease-out; }
        .saldo-tienda { background: #1cb0f6; color: white; padding: 15px; border-radius: 15px; text-align: center; font-size: 1.2rem; margin-bottom: 30px; box-shadow: 0 6px 0 #1899d6; }
        .items-tienda { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;}
        .item-tienda { display: flex; align-items: center; justify-content: space-between; padding: 20px; border: 2px solid #eee; border-radius: 15px; }
        .item-info { display: flex; align-items: center; gap: 15px; }
        .item-icono { font-size: 2.5rem; }
        .item-textos h4 { margin: 0 0 5px 0; color: #4b4b4b; font-size: 1.1rem; }
        .item-textos p { margin: 0; color: #777; font-size: 0.9rem; }
        .btn-comprar { background-color: #1cb0f6; color: white; border: none; padding: 12px 20px; border-radius: 12px; font-weight: bold; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 0 #1899d6; transition: all 0.1s; }
        .btn-comprar:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 0 0 #1899d6; }
        .btn-comprar.inactivo { background-color: #e5e5e5; color: #afafaf; box-shadow: none; cursor: not-allowed; }

        @keyframes aparecer { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Renderizar el Header SOLO si no estamos en bienvenida o login */}
      {vistaActual !== 'bienvenida' && vistaActual !== 'login' && (
        <div className="header-stats">
          <span className="stat-fuego">🔥 {racha}</span>
          <span className="stat-vidas">❤️ {vidas}</span>
          <span className="stat-gemas">💎 {gemas}</span>
          <span className="stat-xp">⚡ {xp} XP</span>
        </div>
      )}

      {/* Renderizar la pantalla correspondiente */}
      {renderPantallaActual()}

      {/* NUEVO: Renderizar Navegación Inferior */}
      {renderNavegacion()}
      
    </div>
  );
}