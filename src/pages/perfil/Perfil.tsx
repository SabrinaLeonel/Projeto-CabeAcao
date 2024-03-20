import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import loginLogo from '../../assets/background.jpg';
import { toastAlerta } from '../../utils/toastAlerta';
import Navbar from '../../components/navbar/Navbar';

function Perfil() {
  let navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta('Você precisa estar logado', 'info');
      navigate("/login");
    }
  }, [usuario.token]);

  return (
    <div className="fundoLogin ">
      <Navbar />
      {/* Capa do Perfil (ocupando a tela inteira) */}
      
    
      {/* Caixa branca transparente no meio */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-8 rounded-lg shadow-lg" style={{ width: '40%', height: '80%' }}>
      
        {/* Foto de Perfil */}
        <div className="mx-auto w-32 h-32 md:w-80 md:h-80 overflow-hidden border-4 border-white mb-6">
          <img
            src={usuario.foto}
            alt={`Foto de perfil de ${usuario.nome}`}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Informações do Usuário */}
        <div className="text-center flex flex-col justify-center mt-10">
          <p className="text-white text-3xl font-bold">{usuario.nome}</p>
          <p className='text-white'>Email: {usuario.usuario}</p>
        </div>
      </div>
      </div>
      
  );
}

export default Perfil;
