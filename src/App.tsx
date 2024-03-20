import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Redirect from 'react-router-dom';
import Home from './pages/home/Home';
import { AuthProvider } from './context/AuthContext';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import FormularioTema from './components/temas/formularioTema/FormularioTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import ListaPostagens from './components/postagens/listaPostagem/ListaPostagem';
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem';
import Perfil from './pages/perfil/Perfil';
import Sobre from './pages/sobre/Sobre';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <div className='min-h-[80vh] bg-[#F3E0D3]'>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/temas" element={<ListaTemas />} />
            <Route path="/cadastroTema" element={<FormularioTema />} />
            <Route path="/editarTema/:id" element={<FormularioTema />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
            <Route path="/postagens" element={<ListaPostagens />} />
            <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
            <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path='/sobre' element={<Sobre/>}/>
          </Routes>    
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;