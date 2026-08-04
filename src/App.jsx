import SideNav from './components/sidenav'
import ProfileHeader from './components/profileheader'
import MainContent from './components/maincontent'
import { useEffect, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import PrivateRoutes from './pages/PrivateRoutes'
import HomePage from './pages/HomePage'
import Users from './components/user/users'
import Servers from './components/server/servers'
import './index.css'
import SshUsers from './components/ssh-users/SshUsers'
import UserView from './components/user/userview'
import ServerView from './components/server/serverview'
import LoginPage from './pages/LoginPage'

const App = () => {

  //useEffect(() => {
    // For testing purposes, set a default token in localStorage
  //  localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8xIiwic3ViIjoxLCJyb2xlIjoic3VwZXJ1c2VyIiwiaWF0IjoxNzg1ODUyMjI2LCJleHAiOjE3ODU5Mzg2MjZ9.b2JxmjaeS3baSGLg-YtyaYUYoWimaRltryq7fe1PM0U')
  //}, [])

  return(
    <Routes>
      <Route path="/" element={<HomePage />}>
        {/* this is for handle who has access routes*/}
        <Route element={<PrivateRoutes />}>
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="servers" element={<Servers />} />
          <Route path="ssh-users" element={<SshUsers/>}/>
          <Route path="user/:id" element={<UserView />} />
          <Route path="server/:id" element={<ServerView />} />
        </Route>
        {/**/}
        {
          /* 
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="servers" element={<Servers />} />
          <Route path="ssh-users" element={<SshUsers/>}/>
          <Route path="user/:id" element={<UserView />} />
          <Route path="server/:id" element={<ServerView />} />
          */
        }
      </Route>
      <Route path="login" element={<LoginPage/>} />
    </Routes>
  )
}

export default App
