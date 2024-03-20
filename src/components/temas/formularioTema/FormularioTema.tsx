import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { toastAlerta } from '../../../utils/toastAlerta';
import Navbar from '../../navbar/Navbar';


function FormularioTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout, isLoading } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/tema/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await atualizar(`/tema`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        toastAlerta('Tema atualizado com sucesso', 'sucesso')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar o Tema', 'erro')
        }

      }

    } else {
      try {
        await cadastrar(`/tema`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        toastAlerta('Tema cadastrado com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrado o Tema', 'erro')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/temas")
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen fundoLogin ">
      < Navbar/>
      <div className="w-full max-w-md bg-black bg-opacity-50 rounded-lg shadow-md p-5">
        <h2 className="text-2xl font-semibold text-center text-white">
          {id === undefined ? 'Cadastrar Tema' : 'Editar tema'}
        </h2>

        <form onSubmit={gerarNovoTema} className="mt-4">
          <div className="flex flex-col mb-2">
            <label htmlFor="disciplina" className="mb-1 text-sm font-medium text-white">Disciplina *</label>
            <input
              type="text"
              id="disciplina"
              name="disciplina"
              placeholder="Ex.:Português"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={tema.disciplina}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="descricao" className="mb-1 text-sm font-medium text-white">Descrição *</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              placeholder="Descrição"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={tema.descricao}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="link" className="mb-1 text-sm font-medium text-white">Icone/imagem</label>
            <input
              type="text"
              id="link"
              name="link"
              placeholder="www.LinkdaSuaImagemAqui.com.br"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={tema.link}
              onChange={atualizarEstado}
            />
          </div>
          <button type='submit' className=" mx-auto flex justify-center py-2 px-4 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-md" style={{ width: '180px', height: '40px' }}>
            {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Cadastrar'}
          </button>

        </form>
      </div>
    </div>

  );
}

export default FormularioTema;
