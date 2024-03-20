import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../utils/toastAlerta'

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagem/${id}`, setPostagem, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/postagens")
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagem/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      toastAlerta('Postagem apagada com sucesso', 'sucesso')

    } catch (error) {
      toastAlerta('Erro ao apagar a Postagem', 'erro')
    }

    retornar()
  }
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='bg-white border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-white text-black font-bold border-b-2 text-2xl'>Postagem</header>
        <div className="p-4">
          <p className='text-xl h-full'>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
          <p>{postagem.materia}</p>
          <img src={postagem.midia} alt="" className=''/>
        </div>
        <div className="flex">
          <button className='w-full text-white bg-[#3ab7ff] hover:bg-[#1e88e5] flex items-center justify-center py-2 rounded' onClick={retornar}>Não</button>
          <button className='text-white bg-[#e55835] hover:bg-[#e54435] w-full flex items-center justify-center py-2 rounded' onClick={deletarPostagem}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem