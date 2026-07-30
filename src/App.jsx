import SideNav from './components/sidenav'
import ProfileHeader from './components/profileheader'
import MainContent from './components/maincontent'
import { useEffect } from 'react'

import './index.css'

const App = () => {

  useEffect(() => {
    // For testing purposes, set a default token in localStorage
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8yIiwic3ViIjoxLCJyb2xlIjoic3VwZXJ1c2VyIiwiaWF0IjoxNzg1NDQ3ODkyLCJleHAiOjE3ODU1MzQyOTJ9.Ofi3mZBvWtL35vIV2jdkWfcj9vT1fJN730bMNu2biMk')
  }, [])

  return(
    <>
      <div className='main-container'>
        <ProfileHeader/>
        <SideNav/>
        <MainContent/>
      </div>
    </>
  )
}

export default App
