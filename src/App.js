import React from 'react'
import { Route, Switch } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/sections/Footer/Footer.js'
import Header from './components/sections/header/Header'
import AllService from './pages/AllService'
import AllShop from './pages/AllShop'
import Dashboard from './pages/Dashboard'
import Home from './pages/home/Home.js'
import MyShop from './pages/MyShop/MyShop'
import NearMe from './pages/NearMe'
import ScanPay from './pages/ScanPay/ScanPay'

function App() {
  return (
    <>  
      <Header/>

        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/all-shop' component={AllShop} exact />
          <Route path='/all-shop/:category' component={AllShop} exact />
          <Route path='/all-service' component={AllService} exact />
          <Route path='/near-me' component={NearMe} exact />
          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/shop/:address' component={MyShop} exact />
          <Route path='/scan' component={ScanPay} exact />
        </Switch>

      <Footer/>  
    </>  
  )
}

export default App