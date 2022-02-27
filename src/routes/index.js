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

// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
/* const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500')) */

class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/dashboard" name="dashboard" component={Dashboard} />
              {/*      <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} /> */}
              <Route path="/" component={Login} />
              {/*     <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Switch>
          </AuthProvider>
        </React.Suspense>
      </Router>
    )
  }
}

export default App
