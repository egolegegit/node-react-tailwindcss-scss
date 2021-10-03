import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './views/Home'
import Page404 from './views/Page404'

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/404">
          <Page404 />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  )
}

export default App
