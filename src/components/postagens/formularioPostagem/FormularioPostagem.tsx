import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar, deletar } from '../../../services/Service';
import { toastAlerta } from '../../../utils/toastAlerta';


function FormularioPostagem() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
    disciplina: '',
    link: ''
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    materia: '',
    titulo: '',
    texto: '',
    midia: '',
    disponivel: false,
    data: '',
    tema: null,
    usuario: null,
  });

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagem/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemaPorId(id: string) {
    await buscar(`/tema/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemas() {
    await buscar('/tema', setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      async function buscarPorId(id: string) {
        try {
          await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
              'Authorization': token
            }
          })
        } catch (error: any) {
          if (error.toString().includes('403')) {
            toastAlerta('O token expirou, favor logar novamente', 'info');
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
          await deletar(`/postagens/${id}`, {
            headers: {
              'Authorization': token
            }
          })
    
          toastAlerta('Postagem apagada com sucesso', 'sucesso')
    
        } catch (error) {
          toastAlerta('Erro ao apagar a Postagem', 'erro')
        }
    
        retornar()
      }toastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
      console.log(tema);

    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function atualizarEstadoSelect(e: ChangeEvent<HTMLSelectElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value === "Disponível"
    })
  }


  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ postagem });

    if (id != undefined) {
      try {
        await atualizar(`/postagem`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem atualizada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'erro')
          handleLogout()
        } else {
          toastAlerta('Erro ao atualizar a Postagem', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/postagem`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta('Postagem cadastrada com sucesso', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'alert')
          handleLogout()
        } else {
          toastAlerta('Erro ao cadastrar a Postagem', 'erro');
        }
      }
    }
  }

  const carregandoTema = tema.descricao === '';

  return (    
    <div className="container flex flex-col mx-auto items-center ">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4" style={{overflow: 'auto', maxHeight: '70vh'}}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="materia">Materia</label>
          <input
            value={postagem.materia}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Materia"
            name="materia"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        

        <div className="flex flex-col w-full">
          <label htmlFor="midia">Midia</label>
          <input
            type="text"
            id="midia"
            name="midia"
            placeholder="Midia"
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.midia}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>


        <div className="flex flex-col gap-2">
          <label htmlFor="disponivel">Disponibilidade</label>

          <select
            value={postagem.disponivel ? "Disponível" : "Não disponível"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstadoSelect(e)}
            name="disponivel"
            required
            className="border-2 border-slate-700 rounded p-2"
          >
            <option value="Disponível">Disponível</option>
            <option value="Não disponível">Não disponível</option>
          </select>

        </div>


        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione um tema</option>
            {temas.map((tema) => (
              <>
                <option value={tema.id} >{tema.disciplina}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={carregandoTema} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
          {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
);  
}

export default FormularioPostagem;