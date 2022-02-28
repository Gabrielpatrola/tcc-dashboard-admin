import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import '../scss/style.scss'
import { AuthProvider } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Register = React.lazy(() => import('../views/pages/register/Register'))
const Dashboard = React.lazy(() => import('../views/pages/dashboard/Dashboard'))
const ProductsCreate = React.lazy(() => import('../views/pages/products/ProductsCreate'))
const Products = React.lazy(() => import('../views/pages/products/Products'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <AuthProvider>
            <Switch>
              <PrivateRoute
                exact
                path="/products/create"
                name="productsCreate"
                component={ProductsCreate}
              />
              <PrivateRoute exact path="/products" name="products" component={Products} />
              <PrivateRoute exact path="/dashboard" name="dashboard" component={Dashboard} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="*" component={Page404} />
            </Switch>
          </AuthProvider>
        </React.Suspense>
      </Router>
    )
  }
}

export default App
