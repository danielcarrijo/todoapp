import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel d-flex border-down'>
    <div className='container border-down'>
      <Link className='navbar-brand' to='/'>Gerenciamento de projetos</Link>
    </div>
  </nav>
)

export default Header