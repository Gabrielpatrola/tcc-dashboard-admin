import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilPencil, cilSpeedometer, cilBasket } from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Vendas',
  },
  {
    component: CNavGroup,
    name: 'Produtos',
    to: '/products',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar Produtos',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Criar Produto',
        to: '/products/create',
      },
      {
        component: CNavItem,
        name: 'Editar Produto',
        to: '/base/accordion',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pedidos',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar Pedidos',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Editar Pedido',
        to: '/base/accordion',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Usuários',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar Usuários',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'Criar Usuário',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Editar Usuário',
        to: '/base/accordion',
      },
    ],
  },
]

export default _nav
