import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/pages/products/Products'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products', name: 'Products', component: Products },
]

export default routes
