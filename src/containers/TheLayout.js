import React, {useContext} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {Redirect} from 'react-router-dom'
import {GlobalContext} from "../globalState";

const TheLayout = () => {
  const {Loading} = useContext(GlobalContext);
  return (
    localStorage.getItem('login') ?
    <div className="c-app c-default-layout">
      {
        Loading ?
          <h1>Loading</h1> :
          <React.Fragment>
            <TheSidebar/>
            <div className="c-wrapper">
              <TheHeader/>
              <div className="c-body">
                <TheContent/>
              </div>
              <TheFooter/>
            </div>
          </React.Fragment>
      }
    </div> : <Redirect to={'/login'}/>
  )
}

export default TheLayout
