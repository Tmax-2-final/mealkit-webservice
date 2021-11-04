import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useHistory } from 'react-router-dom';
const DefaultLayout = () => {

  const history = useHistory();

  useEffect(() => {

    const logins = localStorage.getItem('isLoggedIn');

    if(logins === 'false') {
      history.push({
        pathname: '/login'
      })
    }
  },[])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
