import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import './Login.css';

function Login() {
  let navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home');
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="fundoLogin flex items-center justify-between" style={{ height: '100vh' }}>
      <div className="metadePagina" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="w-full max-w-md  rounded-lg shadow-md p-5">
          <h2 className="text-2xl font-semibold text-center text-white">Entrar</h2>
          <form onSubmit={login} className="mt-4">
            <div className="flex flex-col mb-2">
              <label htmlFor="usuario" className="mb-1 text-sm font-medium text-white">Usuário</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Usuario"
                className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
                value={usuarioLogin.usuario}
                onChange={atualizarEstado}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="senha" className="mb-1 text-sm font-medium text-white">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                className="px-3 py-2 border rounded-md text-sm w-full focus:outline-none focus:border-gray-500"
                value={usuarioLogin.senha}
                onChange={atualizarEstado}
              />
            </div>
            <p className="text-bold text-center text-white mt-2">
              Esqueci a minha senha{' '}
            </p>
            <button type='submit' className="flex justify-center mx-auto w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded-md mt-2" style={{ width: '121px', height: '40px' }}>
              {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Entrar'}
            </button>

          </form>
          <hr className="my-4" />
          <p className="text-sm text-center text-white">
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-orange-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
