import React from 'react';
import '../index.css';
import logo from '../assets/ms4m-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { 
  UserOutlined, 
  ClusterOutlined, 
  CodeOutlined 
} from '@ant-design/icons';

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define sidebar menu items matching your wireframe layout
  const items = [
    {
      key: '/users',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      label: 'Users',
    },
    {
      key: '/servers',
      icon: <ClusterOutlined style={{ fontSize: '18px' }} />,
      label: 'Servers',
    },
    {
      key: '/ssh-users',
      icon: <CodeOutlined style={{ fontSize: '18px' }} />,
      label: 'Ssh users',
    },
  ];

  return (
    <aside
      className="side-nav"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#1b0042', // Dark blue/purple theme from wireframe
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
      }}
    >
      {/* Logo Container */}
      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '0 20px' }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '100%', maxWidth: '160px', height: 'auto' }}
        />
      </div>

      {/* Ant Design Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={items}
        style={{
          backgroundColor: 'transparent',
          borderRight: 0,
          fontSize: '16px',
        }}
      />
    </aside>
  );
};

export default SideNav;