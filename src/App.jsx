import SideNav from './components/sidenav'
import ProfileHeader from './components/profileheader'
import MainContent from './components/maincontent'
import { useEffect, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Users from './components/user/users'
import Servers from './components/server/servers'
import './index.css'
import SshUsers from './components/ssh-users/SshUsers'

const App = () => {

  useEffect(() => {
    // For testing purposes, set a default token in localStorage
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8xIiwic3ViIjoxLCJyb2xlIjoic3VwZXJ1c2VyIiwiaWF0IjoxNzg1NzA4MTkxLCJleHAiOjE3ODU3OTQ1OTF9.MZOdp7CXL9iRZ5q1ZU3MhE6DM2ah6o7DPYjSiOoJCqA')
  }, [])

  return(
    <Routes>
      <Route path="/" element={<HomePage />}>
        {/* Automatically redirect '/' to '/users' */}
        <Route index element={<Navigate to="/users" replace />} />
        
        {/* Child views loaded dynamically into MainContent */}
        <Route path="users" element={<Users />} />
        <Route path="servers" element={<Servers />} />
        <Route path="ssh-users" element={<SshUsers/>}/>
      </Route>
    </Routes>
  )
}

export default App
