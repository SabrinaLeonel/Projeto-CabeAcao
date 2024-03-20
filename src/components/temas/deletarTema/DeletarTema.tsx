import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext'
import Tema from '../../../models/Tema'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../utils/toastAlerta'
import Navbar from '../../navbar/Navbar'

function DeletarTema() {
    const [tema, setTema] = useState<Tema>({} as Tema)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/tema/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'erro')
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
        navigate("/temas")
    }

    async function deletarTema() {
        try {
            await deletar(`/tema/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            toastAlerta('Tema apagado com sucesso', 'sucesso')

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema', 'erro')
        }

        retornar()
    }
    return (
        <div className='container w-1/3 mx-auto'>
            < Navbar />
            <h1 className='text-4xl text-center py-4'>Deletar tema</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar o tema a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='border-b-2 py-2 px-6 bg-white text-black font-bold text-2xl'>{tema.disciplina}</header>
                <p className='p-8 text-3xl bg-white h-full'>{tema.descricao}</p>
                <p className='text-sm text-gray-500'><img src={tema.link} alt="" className='size-31' /></p>
                
                <div className="flex">
                    <button className='text-white bg-[#3ab7ff] hover:bg-[#1e88e5] w-1/2 flex items-center justify-center py-2 rounded' onClick={retornar}>Não</button>
                    <button className='text-white bg-orange-500 hover:bg-orange-600 w-1/2 flex items-center justify-center py-2 rounded' onClick={deletarTema}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema