import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const ProductsCreate = React.lazy(() => import('./views/pages/products/ProductsCreate'))
const Products = React.lazy(() => import('./views/pages/products/Products'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products', name: 'Produtos', component: Products },
  { path: '/products/create', name: 'Criar Produto', component: ProductsCreate },
]

export default routes
