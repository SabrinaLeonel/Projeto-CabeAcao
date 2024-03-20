import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Footer() {

  const { usuario } = useContext(AuthContext)

  let footerComponent


  if(usuario.token !== '') {
    footerComponent = (
      <>
        <div className="flex justify-between bg-[#EA9050] text-white">
          <div className="container flex justify-around items-center py-4">
         
         <div>  
          {/* <img src="./src/assets/img/png/logo-novo.png" alt="logo projeto cabe ação"
            className='w-14 h-14' /> */}
            <p className='text-xl font-bold'>Cabe Ação | Copyright: </p>
          </div>
            <p className='text-lg'>Acesse nossas redes sociais</p>
            <div className='flex gap-2'>
              <LinkedinLogo size={48} weight='bold'  /> 
              <InstagramLogo size={48} weight='bold' />
              <FacebookLogo size={48} weight='bold' />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {footerComponent}
    </>
  )
}

export default Footer