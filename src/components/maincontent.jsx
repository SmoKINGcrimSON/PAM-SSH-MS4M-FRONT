import '../index.css';
import Users from './user/users';
import { useState, useEffect } from 'react';
import {Outlet} from 'react-router-dom'

const MainContent = () => {

  return (
    <main className="main-content">
        {
          /* <Users></Users> */
        }
        {/* Renders <Users /> or <Servers /> depending on the active route */}
        <Outlet />
    </main>
  );
}

export default MainContent;