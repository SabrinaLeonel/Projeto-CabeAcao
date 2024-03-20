import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import { RotatingLines } from 'react-loader-spinner'
import './Cadastro.css'
import { toastAlerta } from '../../utils/toastAlerta'

function Cadastro() {
  let navigate = useNavigate()
  const [confirmaSenha, setConfirmaSenha] = useState<string>("")
  const [isLoading] = useState<boolean>(false)
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: ''
  })
  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: ''
  })

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back()
    }
  }, [usuarioResposta])

  function back() {
    navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta)
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')
      } catch (error) {
        toastAlerta('Erro ao cadastrar o Usuário', 'erro')
      }
    } else {
      toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'info')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmaSenha("")                  // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <div className="fundoLogin flex items-center justify-center" style={{ height: '100vh' }}>
      <div className="w-full max-w-md rounded-lg shadow-md p-5" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <h2 className="text-2xl font-bold text-center text-white">Faça seu cadastro</h2>
        <form onSubmit={cadastrarNovoUsuario} className="mt-4">
          <div className="flex flex-col mb-2">
            <label htmlFor="nome" className="mb-1 text-sm font-medium text-white">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="usuario" className="mb-1 text-sm font-medium text-white">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={usuario.usuario}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="dataNascimento" className="mb-1 text-sm font-medium text-white">Data de Nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none"
              value={usuario.dataNascimento}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="foto" className="mb-1 text-sm font-medium text-white">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="senha" className="mb-1 text-sm font-medium text-white">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={usuario.senha}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="confirmarSenha" className="mb-1 text-sm font-medium text-white">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button onClick={back} className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md">
              Cancelar
            </button>
            <button type='submit' className="py-2 px-4 bg-green-500 hover:bg-green-400 text-white text-sm font-medium rounded-md">
              {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;