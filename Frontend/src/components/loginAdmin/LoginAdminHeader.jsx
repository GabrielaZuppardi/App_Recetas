import React from 'react'
import { Link } from 'react-router'
import { GiChefToque } from 'react-icons/gi'
import { MdRestaurantMenu } from 'react-icons/md'
import { LuCookingPot } from 'react-icons/lu'
import { TbToolsKitchen2 } from 'react-icons/tb'

const LoginAdminHeader = () => {
  return (
    <header>
      <h1>ChefsMate</h1>
      <h2>
        <GiChefToque /> <MdRestaurantMenu /> <LuCookingPot /> <TbToolsKitchen2 />
      </h2>
      <p className="subtitle">Acceso Administradores</p>
    </header>
  )
}

export default LoginAdminHeader
