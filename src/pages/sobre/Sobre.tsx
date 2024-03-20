import React, { useState } from 'react';
import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import sobreFundo from 'src/assets/background.jpg';
import Navbar from '../../components/navbar/Navbar';

function Sobre() {
  // Estados para controlar as cores dos ícones
  const [corLinkedin, setCorLinkedin] = useState('#FFA500');
  const [corInstagram, setCorInstagram] = useState('#FFA500');
  const [corGithub, setCorGithub] = useState('#FFA500');

  const [corLinkedin2, setCorLinkedin2] = useState('#FFA500');
  const [corInstagram2, setCorInstagram2] = useState('#FFA500');
  const [corGithub2, setCorGithub2] = useState('#FFA500');

  return (
    <div className='min-h-screen flex flex-col items-center justify-center space-y-8 p-8 fundoLogin'>
      <Navbar />
      <div className="sobre-nos-wrapper bg-black bg-opacity-40 p-12 rounded-md ">
        <h1 className='text-5xl font-bold text-white mt-[-50px] text-center py-4'>Sobre nós</h1>
        <p className='text-2xl text-center text-white font-semibold text-[#442915] max-w-prose mx-auto py-4'>
          Somos um grupo de jovens dedicados, motivados pelo desejo comum de fazer a diferença no mundo da educação. Unimos forças durante nosso curso e, inspirados por um trabalho em grupo, demos vida a uma ideia que poderia impactar positivamente a jornada educacional de muitas crianças.
        </p>
        <div className="relative flex justify-center"> {/* Adicionando a classe justify-center para centralizar */}
          <div className="absolute top-6  flex  space-x-2 -mt-4 text-white">
            <b className="text-center">Sabrina Leonel da Silva</b> {/* Centralizando o nome do colaborador */}
           <a href="https://www.linkedin.com/in/sabrina-leonel"> <LinkedinLogo
              className="text-orange-500"
              size={28}
              weight="bold"
              onMouseEnter={() => setCorLinkedin('#FFFFFF')}
              onMouseLeave={() => setCorLinkedin('#FFA500')}
              style={{ color: corLinkedin }}
            /></a>
            <a href="https://www.instagram.com/sabriinaleonel"><InstagramLogo
              className="text-orange-500"
              size={28}
              weight="bold"
              onMouseEnter={() => setCorInstagram('#FFFFFF')}
              onMouseLeave={() => setCorInstagram('#FFA500')}
              style={{ color: corInstagram }}
            /></a>
            <a href="https://github.com/SabrinaLeonel"><GithubLogo
              className="text-orange-500"
              size={28}
              weight="bold"
              onMouseEnter={() => setCorGithub('#FFFFFF')}
              onMouseLeave={() => setCorGithub('#FFA500')}
              style={{ color: corGithub }}
            /></a>
            <b className="text-center">Matheus</b> {/* Centralizando o nome do colaborador */}
            <a href="http://www.linkedin.com/in/MatheusDavid"><LinkedinLogo
              className="text-orange-500"
              size={28}
              weight="bold"
              onMouseEnter={() => setCorLinkedin2('#FFFFFF')}
              onMouseLeave={() => setCorLinkedin2('#FFA500')}
              style={{ color: corLinkedin2 }}
            /></a>
            <a href="https://www.instagram.com/bidinha_?igsh=cXhnajl0ajBzMGlo&utm_source=qr"><InstagramLogo
              className="text-orange-500"
              size={28}
              weight="bold"
              onMouseEnter={() => setCorInstagram2('#FFFFFF')}
              onMouseLeave={() => setCorInstagram2('#FFA500')}
              style={{ color: corInstagram2 }}
            /></a>
            <a href="https://github.com/Teuz1"><GithubLogo
              className="text-orange-500"
              size={28}
              weight="bold"
              onMouseEnter={() => setCorGithub2('#FFFFFF')}
              onMouseLeave={() => setCorGithub2('#FFA500')}
              style={{ color: corGithub2 }}
            /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;