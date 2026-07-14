import React, { useState } from 'react';

export default function App() {
  const [vistaActual, setVistaActual] = useState('bienvenida'); 
  const [vidas, setVidas] = useState(5);
  const [xp, setXp] = useState(0);
  const [racha, setRacha] = useState(12);
  const [gemas, setGemas] = useState(50); 
  const [respuesta, setRespuesta] = useState('');
  const [estadoLeccion, setEstadoLeccion] = useState('escribiendo'); 
  const [leccionActiva, setLeccionActiva] = useState(1);

  const detallesLeccion = {
    1: {
      titulo: "Configura tu Servidor",
      instruccion: "Tu primer servidor multijugador necesita configuración. Corrige el valor de unidades_disponibles para establecer 50 servidores operativos.",
      variable: '"unidades_disponibles":',
      respuestaCorrecta: '50'
    },
    2: {
      titulo: "Variables y Tipos",
      instruccion: "Define el límite de jugadores para el Lobby. Asigna el valor numérico 100 para permitir que entren todos.",
      variable: '"limite_jugadores":',
      respuestaCorrecta: '100'
    },
    3: {
      titulo: "Automatización Base",
      instruccion: "Activa el inicio automático del servidor. En Python los booleanos empiezan con mayúscula, escribe True.",
      variable: '"encendido_auto":',
      respuestaCorrecta: 'True'
    }
  };
  const datosActuales = detallesLeccion[leccionActiva];

  const comprobarRespuesta = () => {
    if (respuesta.trim() === datosActuales.respuestaCorrecta) {
      setEstadoLeccion('correcto');
      setXp(xp + 10);
    } else {
      setEstadoLeccion('incorrecto');
      if (vidas > 0) setVidas(vidas - 1);
    }
  };

  const regresarAlMapa = () => {
    setVistaActual('mapa');
    setEstadoLeccion('escribiendo');
    setRespuesta('');
  };

  const abrirLeccion = (idNivel) => {
    setLeccionActiva(idNivel);
    setVistaActual('leccion');
  };

  const recargarVidas = () => {
    setVidas(5);
    setVistaActual('mapa');
  };

  const comprarVidas = () => {
    if (gemas >= 20 && vidas < 5) {
      setGemas(gemas - 20);
      setVidas(5);
    }
  };

  const comprarProtector = () => {
    if (gemas >= 30) {
      setGemas(gemas - 30);
    }
  };

  const renderBienvenida = () => (
    <div className="contenedor-landing">
      <div className="logo-app">🐍</div>
      <h1 className="titulo-principal">DuoPython</h1>
      <p className="subtitulo">Aprende a programar divirtiéndote. Sube de nivel y domina el código.</p>
      <div className="grupo-botones-inicio">
        <button className="btn-empezar" onClick={() => setVistaActual('mapa')}>¡EMPEZAR AHORA!</button>
        <button className="btn-login" onClick={() => setVistaActual('login')}>YA TENGO UNA CUENTA</button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="contenedor-landing">
      <h2 className="titulo-principal">Ingresa a tu cuenta</h2>
      <input type="email" placeholder="Correo electrónico" className="input-formulario" />
      <input type="password" placeholder="Contraseña" className="input-formulario" />
      <div className="grupo-botones-inicio">
        <button className="btn-empezar" onClick={() => setVistaActual('mapa')}>INGRESAR</button>
        <button className="btn-login" onClick={() => setVistaActual('bienvenida')}>VOLVER</button>
      </div>
    </div>
  );

  const renderMapa = () => {
    const nivel2Desbloqueado = xp >= 10;
    const nivel3Desbloqueado = xp >= 20;

    return (
      <div className="contenedor-mapa">
        <h2 className="titulo-seccion">Módulo 1: Fundamentos</h2>
        
        <div className="nodo-camino activo" onClick={() => abrirLeccion(1)}>
          <div className="icono-nodo">⭐</div>
        </div>
        <p className="texto-nodo">Configura tu Servidor</p>
        <div className="linea-conectora"></div>

        <div className={`nodo-camino ${nivel2Desbloqueado ? 'activo' : 'bloqueado'}`} onClick={() => nivel2Desbloqueado && abrirLeccion(2)}>
          <div className="icono-nodo">{nivel2Desbloqueado ? '⭐' : '🔒'}</div>
        </div>
        <p className={`texto-nodo ${!nivel2Desbloqueado ? 'gris' : ''}`}>Variables y Tipos</p>
        <div className="linea-conectora"></div>

        <div className={`nodo-camino ${nivel3Desbloqueado ? 'activo' : 'bloqueado'}`} onClick={() => nivel3Desbloqueado && abrirLeccion(3)}>
          <div className="icono-nodo">{nivel3Desbloqueado ? '⭐' : '🔒'}</div>
        </div>
        <p className={`texto-nodo ${!nivel3Desbloqueado ? 'gris' : ''}`}>Automatización Base</p>
      </div>
    );
  };

  const renderLeccion = () => (
    <div className="contenedor-leccion">
      <h3 className="subtitulo-gris">Módulo 1: Fundamentos de Python</h3>
      <h1 className="titulo-leccion">Lección: {datosActuales.titulo}</h1>
      <p className="instruccion">{datosActuales.instruccion}</p>

      <div className="editor-codigo">
        <p><span className="keyword">configuracion_servidor</span> = {'{'}</p>
        <p className="indent">"nombre": <span className="string">"Servidor_Principal"</span>,</p>
        <p className="indent">"puerto": <span className="number">8080</span>,</p>
        <p className="indent">
          {datosActuales.variable} 
          <input type="text" className="input-codigo" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} disabled={estadoLeccion === 'correcto'} placeholder="..." autoFocus />
        </p>
        <p>{'}'}</p>
      </div>

      {estadoLeccion === 'incorrecto' && <div className="alerta-error">❌ ¡Oops! Esa no es la cantidad correcta.</div>}
      
      {estadoLeccion === 'correcto' ? (
        <div className="area-exito">
          <div className="alerta-exito"><h2>✔ ¡CORRECTO! +10 XP</h2></div>
          <button className="btn-continuar" onClick={regresarAlMapa}>CONTINUAR AL MAPA</button>
        </div>
      ) : (
        <button className="btn-comprobar" onClick={comprobarRespuesta}>COMPROBAR</button>
      )}
    </div>
  );

  const renderSinVidas = () => (
    <div className="contenedor-sin-vidas">
      <div className="corazon-roto">💔</div>
      <h1 className="titulo-leccion">¡Te quedaste sin vidas!</h1>
      <p className="instruccion">Descansa un poco o recarga tus vidas para seguir aprendiendo.</p>
      <button className="btn-recargar" onClick={recargarVidas}>RECARGAR VIDAS (Gratis)</button>
    </div>
  );

  const renderPerfil = () => (
    <div className="contenedor-perfil">
      <div className="cabecera-perfil">
        <div className="avatar-grande">🧑‍💻</div>
        <h2 className="nombre-usuario">DevNinja</h2>
        <p className="rango-usuario">Liga de Bronce</p>
      </div>
      <h3 className="titulo-seccion-pequeno">Tus Estadísticas</h3>
      <div className="grid-estadisticas">
        <div className="tarjeta-stat"><span className="icono-stat">⚡</span><span className="valor-stat">{xp}</span><span className="label-stat">XP Total</span></div>
        <div className="tarjeta-stat"><span className="icono-stat">🔥</span><span className="valor-stat">{racha}</span><span className="label-stat">Días Racha</span></div>
        <div className="tarjeta-stat"><span className="icono-stat">💎</span><span className="valor-stat">{gemas}</span><span className="label-stat">Gemas</span></div>
      </div>
      <h3 className="titulo-seccion-pequeno">Logros</h3>
      <div className="lista-logros">
        <div className="logro-item completado">
          <div className="logro-icono">🏆</div>
          <div className="logro-textos"><h4>Primeros Pasos</h4><p>Inicia tu aventura en DuoPython.</p></div>
        </div>
        <div className={`logro-item ${xp >= 50 ? 'completado' : 'bloqueado'}`}>
          <div className="logro-icono">🧠</div>
          <div className="logro-textos"><h4>Cerebro Brillante</h4><p>Alcanza 50 XP en total.</p></div>
        </div>
      </div>
    </div>
  );

  const renderTienda = () => (
    <div className="contenedor-tienda">
      <h2 className="titulo-seccion">Tienda Virtual</h2>
      <div className="saldo-tienda">Tienes <strong>{gemas} 💎</strong></div>
      <div className="items-tienda">
        <div className="item-tienda">
          <div className="item-info"><span className="item-icono">❤️</span><div className="item-textos"><h4>Recarga Completa</h4><p>Restaura tus 5 vidas.</p></div></div>
          <button className={`btn-comprar ${gemas < 20 || vidas === 5 ? 'inactivo' : ''}`} onClick={comprarVidas} disabled={gemas < 20 || vidas === 5}>20 💎</button>
        </div>
        <div className="item-tienda">
          <div className="item-info"><span className="item-icono">🛡️</span><div className="item-textos"><h4>Protector de Racha</h4><p>Salva tu racha si un día no juegas.</p></div></div>
          <button className={`btn-comprar ${gemas < 30 ? 'inactivo' : ''}`} onClick={comprarProtector} disabled={gemas < 30}>30 💎</button>
        </div>
      </div>
    </div>
  );

  const renderNavegacion = () => {
    if (!['mapa', 'perfil', 'tienda'].includes(vistaActual)) return null;
    return (
      <div className="barra-navegacion">
        <button className={`nav-btn ${vistaActual === 'mapa' ? 'activo' : ''}`} onClick={() => setVistaActual('mapa')}><span className="nav-icono">🗺️</span><span className="nav-texto">Ruta</span></button>
        <button className={`nav-btn ${vistaActual === 'perfil' ? 'activo' : ''}`} onClick={() => setVistaActual('perfil')}><span className="nav-icono">👤</span><span className="nav-texto">Perfil</span></button>
        <button className={`nav-btn ${vistaActual === 'tienda' ? 'activo' : ''}`} onClick={() => setVistaActual('tienda')}><span className="nav-icono">🛒</span><span className="nav-texto">Tienda</span></button>
      </div>
    );
  };

  const renderPantallaActual = () => {
    if (vistaActual === 'bienvenida') return renderBienvenida();
    if (vistaActual === 'login') return renderLogin();
    if (vidas === 0) return renderSinVidas();
    if (vistaActual === 'mapa') return renderMapa();
    if (vistaActual === 'leccion') return renderLeccion();
    if (vistaActual === 'perfil') return renderPerfil();
    if (vistaActual === 'tienda') return renderTienda();
  };

  return (
    <div className="app-global">
      <style>{`
        body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; color: #3c3c3c; }
        .app-global { max-width: 600px; margin: 0 auto; background: white; min-height: 100vh; box-shadow: 0 0 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; padding-bottom: 80px; }
        .header-stats { display: flex; justify-content: center; gap: 30px; padding: 20px; border-bottom: 2px solid #eee; font-size: 1.2rem; font-weight: bold; background: white; position: sticky; top: 0; z-index: 10; }
        .stat-fuego { color: #ff9600; } .stat-vidas { color: #ff4b4b; } .stat-xp { color: #58cc02; } .stat-gemas { color: #1cb0f6; }
        
        .contenedor-landing { display: flex; flex-direction: column; align-items: center; justify-content: center; flex-grow: 1; padding: 40px 20px; text-align: center; }
        .logo-app { font-size: 6rem; margin-bottom: 10px; animation: flotar 3s ease-in-out infinite; }
        .titulo-principal { font-size: 2.5rem; color: #4b4b4b; margin: 0 0 15px 0; }
        .subtitulo { font-size: 1.2rem; color: #777; margin-bottom: 40px; max-width: 80%; line-height: 1.5; }
        .grupo-botones-inicio { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 320px; }
        .input-formulario { width: 100%; max-width: 300px; padding: 18px; margin-bottom: 15px; border: 2px solid #e5e5e5; border-radius: 15px; font-size: 1.1rem; background-color: #f9f9f9; outline: none; transition: border 0.2s; box-sizing: border-box; }
        .input-formulario:focus { border-color: #1cb0f6; background-color: white; }
        .btn-empezar { background-color: #58cc02; color: white; border: none; padding: 18px; border-radius: 15px; font-size: 1.1rem; font-weight: bold; cursor: pointer; box-shadow: 0 6px 0 #58a700; transition: transform 0.1s; text-transform: uppercase; letter-spacing: 1px; }
        .btn-empezar:active { box-shadow: 0 0 0 #58a700; transform: translateY(6px); }
        .btn-login { background-color: transparent; color: #1cb0f6; border: 2px solid #e5e5e5; padding: 18px; border-radius: 15px; font-size: 1.1rem; font-weight: bold; cursor: pointer; box-shadow: 0 6px 0 #e5e5e5; transition: transform 0.1s; text-transform: uppercase; letter-spacing: 1px; }
        .btn-login:active { box-shadow: 0 0 0 #e5e5e5; transform: translateY(6px); }
        @keyframes flotar { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }

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

        .contenedor-leccion { padding: 30px 20px; display: flex; flex-direction: column; flex-grow: 1; }
        .subtitulo-gris { color: #afafaf; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; margin-bottom: 5px; }
        .titulo-leccion { margin-top: 0; font-size: 1.8rem; margin-bottom: 20px; }
        .instruccion { font-size: 1.1rem; line-height: 1.5; margin-bottom: 30px; }
        .editor-codigo { background-color: #282c34; color: #abb2bf; padding: 20px; border-radius: 15px; font-family: 'Courier New', Courier, monospace; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .editor-codigo p { margin: 5px 0; } .editor-codigo .indent { padding-left: 30px; } .editor-codigo .keyword { color: #c678dd; } .editor-codigo .string { color: #98c379; } .editor-codigo .number { color: #d19a66; }
        .input-codigo { background-color: #3e4451; border: 2px solid #5c6370; color: white; border-radius: 8px; padding: 5px 10px; font-size: 1.1rem; width: 60px; text-align: center; margin-left: 10px; font-family: monospace; outline: none; }
        .input-codigo:focus { border-color: #61afef; }
        .btn-comprobar, .btn-continuar { width: 100%; padding: 18px; border-radius: 15px; font-size: 1.2rem; font-weight: bold; text-align: center; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; margin-top: auto; transition: transform 0.1s; }
        .btn-comprobar { background-color: #58cc02; color: white; box-shadow: 0 6px 0 #58a700; } .btn-comprobar:active { box-shadow: 0 0 0 #58a700; transform: translateY(6px); }
        .btn-continuar { background-color: #58cc02; color: white; box-shadow: 0 6px 0 #58a700; }
        .alerta-error { background-color: #ffdfe0; color: #ea2b2b; padding: 15px; border-radius: 10px; font-weight: bold; text-align: center; margin-bottom: 20px; border: 2px solid #ea2b2b; }
        .area-exito { display: flex; flex-direction: column; gap: 20px; margin-top: auto; }
        .alerta-exito { background-color: #d7ffb8; color: #58a700; padding: 20px; border-radius: 15px; text-align: center; border: 2px solid #58cc02; } .alerta-exito h2 { margin: 0; }

        .contenedor-sin-vidas { padding: 40px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-grow: 1; text-align: center; }
        .corazon-roto { font-size: 5rem; margin-bottom: 20px; animation: latido-roto 2s infinite; }
        .btn-recargar { width: 100%; max-width: 300px; padding: 18px; border-radius: 15px; font-size: 1.1rem; font-weight: bold; border: none; cursor: pointer; text-transform: uppercase; margin-top: 30px; background-color: #1cb0f6; color: white; box-shadow: 0 6px 0 #1899d6; transition: transform 0.1s; }
        .btn-recargar:active { box-shadow: 0 0 0 #1899d6; transform: translateY(6px); }
        @keyframes latido-roto { 0% { transform: scale(1); } 50% { transform: scale(1.1) rotate(-5deg); } 100% { transform: scale(1); } }

        .barra-navegacion { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 600px; background: white; border-top: 2px solid #eee; display: flex; justify-content: space-around; padding: 15px 0; z-index: 20; }
        .nav-btn { background: none; border: none; display: flex; flex-direction: column; align-items: center; cursor: pointer; color: #afafaf; transition: color 0.2s; outline: none; }
        .nav-btn.activo { color: #1cb0f6; }
        .nav-icono { font-size: 1.8rem; margin-bottom: 5px; filter: grayscale(100%); opacity: 0.6; transition: all 0.2s; }
        .nav-btn.activo .nav-icono { filter: grayscale(0%); opacity: 1; }
        .nav-texto { font-weight: bold; font-size: 0.9rem; letter-spacing: 0.5px; text-transform: uppercase; }

        .contenedor-perfil { padding: 30px 20px; display: flex; flex-direction: column; animation: aparecer 0.3s ease-out; }
        .cabecera-perfil { display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
        .avatar-grande { font-size: 5rem; background: #e5e5e5; border-radius: 50%; padding: 20px; margin-bottom: 15px; border: 4px solid #1cb0f6; }
        .nombre-usuario { font-size: 1.8rem; margin: 0 0 5px 0; color: #4b4b4b; }
        .rango-usuario { color: #afafaf; font-weight: bold; margin: 0; }
        .titulo-seccion-pequeno { font-size: 1.2rem; color: #4b4b4b; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        .grid-estadisticas { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 30px; }
        .tarjeta-stat { border: 2px solid #eee; border-radius: 15px; padding: 15px 5px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .icono-stat { font-size: 2rem; margin-bottom: 5px; } .valor-stat { font-size: 1.2rem; font-weight: bold; color: #4b4b4b; } .label-stat { font-size: 0.8rem; color: #afafaf; text-transform: uppercase; font-weight: bold; margin-top: 5px; }
        .lista-logros { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
        .logro-item { display: flex; align-items: center; padding: 15px; border: 2px solid #eee; border-radius: 15px; gap: 15px; }
        .logro-item.completado { border-color: #ffc800; background-color: #fff9e6; }
        .logro-item.bloqueado { opacity: 0.5; filter: grayscale(100%); }
        .logro-icono { font-size: 2.5rem; } .logro-textos h4 { margin: 0 0 5px 0; color: #4b4b4b; } .logro-textos p { margin: 0; color: #777; font-size: 0.9rem; }

        .contenedor-tienda { padding: 30px 20px; display: flex; flex-direction: column; animation: aparecer 0.3s ease-out; }
        .saldo-tienda { background: #1cb0f6; color: white; padding: 15px; border-radius: 15px; text-align: center; font-size: 1.2rem; margin-bottom: 30px; box-shadow: 0 6px 0 #1899d6; }
        .items-tienda { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;}
        .item-tienda { display: flex; align-items: center; justify-content: space-between; padding: 20px; border: 2px solid #eee; border-radius: 15px; }
        .item-info { display: flex; align-items: center; gap: 15px; } .item-icono { font-size: 2.5rem; } .item-textos h4 { margin: 0 0 5px 0; color: #4b4b4b; font-size: 1.1rem; } .item-textos p { margin: 0; color: #777; font-size: 0.9rem; }
        .btn-comprar { background-color: #1cb0f6; color: white; border: none; padding: 12px 20px; border-radius: 12px; font-weight: bold; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 0 #1899d6; transition: all 0.1s; }
        .btn-comprar:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 0 0 #1899d6; }
        .btn-comprar.inactivo { background-color: #e5e5e5; color: #afafaf; box-shadow: none; cursor: not-allowed; }

        @keyframes aparecer { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {vistaActual !== 'bienvenida' && vistaActual !== 'login' && (
        <div className="header-stats">
          <span className="stat-fuego">🔥 {racha}</span>
          <span className="stat-vidas">❤️ {vidas}</span>
          <span className="stat-gemas">💎 {gemas}</span>
          <span className="stat-xp">⚡ {xp} XP</span>
        </div>
      )}

      {renderPantallaActual()}
      {renderNavegacion()}
      
    </div>
  );
}