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
import UserView from './components/user/userview'
import ServerView from './components/server/serverview'
import LoginPage from './pages/LoginPage'

const App = () => {

  return(
    <Routes>
      <Route path="/" element={<HomePage />}>
        {/* this is for handle who has access routes*/}
        <Route element={<PrivateRoutes />}>
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="servers" element={<Servers />} />
          <Route path="user/:id" element={<UserView />} />
          <Route path="server/:id" element={<ServerView />} />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage/>} />
    </Routes>
  )
}

export default App
