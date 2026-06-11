import { GiChefToque } from 'react-icons/gi'
import { MdRestaurantMenu } from 'react-icons/md'
import { LuCookingPot } from 'react-icons/lu'
import { TbToolsKitchen2 } from 'react-icons/tb'

const RegisterHeader = () => {
  return (
    <header className="register-header">
      <h1>ChefsMate</h1>
      <h2>
        {' '}
        <GiChefToque /> <MdRestaurantMenu /> <LuCookingPot /> <TbToolsKitchen2 />{' '}
      </h2>
      <p className="subtitle">Registro</p>
    </header>
  )
}

export default RegisterHeader
