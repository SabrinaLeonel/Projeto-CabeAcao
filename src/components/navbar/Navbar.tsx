import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toastAlerta } from '../../utils/toastAlerta';
import './Navbar.css';

function Navbar() {
  const [minimizado, setMinimizado] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 0, 0)');
  const [mostrarIcones, setMostrarIcones] = useState(false);
  const [corIcone, setCorIcone] = useState('#F27A5E'); // Cor inicial do ícone ☰
  let navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [corHome, setCorHome] = useState('white');
  const [corPerfil, setCorPerfil] = useState('white');
  const [corSobre, setCorSobre] = useState('white');
  const [corPost, setCorPost] = useState('white');
  const [corTema, setCorTema] = useState('white');
  const [corCadTema, setCorCadTema] = useState('white');
  const [corSair, setCorSair] = useState('white');
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: 1000
        }}
    />
);

  function logout() {
    handleLogout();
    toastAlerta('Usuário deslogado com sucesso', 'sucesso');
    navigate('/login');
  }

  const usuarioLogado = usuario.token !== '';

  function alternarCorDeFundo() {
    if (minimizado) {
      setBackgroundColor('rgba(0, 0, 0, 0)');
    } else {
      setBackgroundColor('#b16d3c9f');
    }
  }

  useEffect(() => {
    alternarCorDeFundo();
  }, [minimizado]);

  function handleMouseEnter() {
    setMinimizado(false);
    setMostrarIcones(true);
    // Alterar a cor do ícone quando o mouse passa sobre ele
    setCorIcone('#FFFFFF'); // Defina a cor desejada quando o mouse passa sobre o ícone
  }

  function handleMouseLeave() {
    setMinimizado(true);
    setMostrarIcones(false);
    // Restaurar a cor original do ícone quando o mouse sai dele
    setCorIcone('#d16851'); // Defina a cor original do ícone
  }

  return (
    <div id="nav-bar" style={{ backgroundColor }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <input id="nav-toggle" type="checkbox" />
      <div id="nav-header">
        <Link to="/" id="nav-title" >
          <i className="fab fa-codepen"></i>
          <div id="nav-footer-avatar" style={{ color: corIcone }}>
            ☰
          </div>
        </Link>
      </div>
      <div id="nav-content" style={{ display: mostrarIcones ? 'block' : 'none', color: 'white' }}>
        <Link to='/home' className="nav-button" onMouseEnter={() => setCorHome('#FFA500')} onMouseLeave={() => setCorHome('white')} style={{ color: corHome }}>Home</Link>
        <Link to='/perfil' className="nav-button" onMouseEnter={() => setCorPerfil('#FFA500')} onMouseLeave={() => setCorPerfil('white')} style={{ color: corPerfil}}>Perfil</Link>
        <Link to='/sobre' className="nav-button" onMouseEnter={() => setCorSobre('#FFA500')} onMouseLeave={() => setCorSobre('white')} style={{ color: corSobre }}>Sobre nós</Link>
        <Link to='/postagens' className="nav-button" onMouseEnter={() => setCorPost('#FFA500')} onMouseLeave={() => setCorPost('white')} style={{ color: corPost }}>Postagens</Link>
        <Link to='/temas' className="nav-button" onMouseEnter={() => setCorTema ('#FFA500')} onMouseLeave={() => setCorTema ('white')} style={{ color: corTema }}>Temas</Link>
        <Link to='/cadastroTema' className="nav-button" onMouseEnter={() => setCorCadTema('#FFA500')} onMouseLeave={() => setCorCadTema('white')} style={{ color: corCadTema }}>Cadastrar Temas</Link>
        <div className='text-transparent'>.</div>
        <ColoredLine color="white" />
        <div className='text-transparent'>.</div>
        <Link to='' onClick={logout} className="nav-button" onMouseEnter={() => setCorSair('#FFA500')} onMouseLeave={() => setCorSair('white')} style={{ color: corSair }}>Sair</Link>
      </div>
    </div>
  );
}

export default Navbar;
