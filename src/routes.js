import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const ProductsCreate = React.lazy(() => import('./views/pages/products/ProductsCreate'))
const Products = React.lazy(() => import('./views/pages/products/Products'))
const Users = React.lazy(() => import('./views/pages/users/Users'))
const UsersCreate = React.lazy(() => import('./views/pages/users/UsersCreate'))
const Orders = React.lazy(() => import('./views/pages/orders/Orders'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/orders', name: 'Pedidos', component: Orders },
  { path: '/products', name: 'Produtos', component: Products },
  { path: '/products/create', name: 'Criar Produto', component: ProductsCreate },
  { path: '/users', name: 'Usuários', component: Users },
  { path: '/users/create', name: 'Criar Usuário', component: UsersCreate },
]

export default routes
