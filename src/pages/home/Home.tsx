import homeLogo from '../../assets/alunos.svg'
import ListaPostagens from '../../components/postagens/listaPostagem/ListaPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';

function Home() {
    return (
        <>
        
        <div className="bg-[#F3E0D3] flex justify-center">
        
          <div className='container flex text-[#F27A5E]'>
            
            <div className=" flex-col gap-8 items-center flex justify-end py-8">
              
              <h2 className='text-5xl text-right  font-bold'>Explore o poder da educação em cada post, inspirando conhecimento e crescimento constante."</h2>
              
  
              <div className="flex justify-around gap-4">
              <ModalPostagem />
              
                <button className='rounded bg-[#EA9050] text-[#ffffff] py-2 px-4'>Ver postagens</button>
                
                
              </div>
            </div>
            
            </div>
            
        </div>
        
        <ListaPostagens />
        <div className='my-50'>.</div>
      </>
      
    );
}

export default Home;