// src/App.js
import './App.scss'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PostOffre from './components/offres/PostOffre'
import ListOffre from './components/offres/ListOffre'
import Home from './components/Home'
import Header from './components/Header'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <header>
              <Header />
            </header>
            <Home />
          </Route>
          <Route path="/poster-offre" exact>
            <header>
              <NavBar />
            </header>
            <PostOffre />
          </Route>
          <Route path="/offres" exact>
            <header>
              <NavBar />
            </header>
            <ListOffre />
          </Route>
        </Switch>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
