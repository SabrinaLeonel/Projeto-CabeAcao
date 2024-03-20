import React from 'react'
import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemaProps {
  tema: Tema
}

function CardTemas({tema}: CardTemaProps) {
  
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg max-w-md mx-2 my-2 overflow-auto">
      <div className="flex flex-row justify-between p-4 bg-[#ffffff] border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
        <h2 className='text-lg font-bold break-words'>{tema.disciplina}</h2>
      </div>
      <div className="p-4 bg-white mb-2">
        <p className='text-base text-gray-700 break-words'>{tema.descricao}</p>
        <p className='text-sm text-gray-500'><img src={tema.link} alt="" className='size-31' /></p>
      </div>
      <div className="mt-auto flex justify-between border-t border-gray-200 rounded-bl-lg rounded-br-lg ">
        <Link to={`/editarTema/${tema.id}`} className='text-white bg-[#3ab7ff] hover:bg-[#1e88e5] w-1/2 flex items-center justify-center py-2 rounded'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarTema/${tema.id}`} className='text-white bg-orange-400  hover:bg-orange-600  w-1/2 flex items-center justify-center py-2 rounded'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardTemas
