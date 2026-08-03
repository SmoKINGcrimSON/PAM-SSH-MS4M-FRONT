import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex } from 'antd';

const HeaderNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { label: 'Servidores', path: '/servers' },
    { label: 'Usuarios', path: '/users' },
  ];

  return (
    <header
      style={{
        backgroundColor: '#0d1527', // Dark navy background matching the design
        height: '60px',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Left: Branding */}
      <Flex align="center" gap={10}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#2563eb',
            display: 'inline-block',
          }}
        />
        <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>
          PAM · MS4M
        </span>
      </Flex>

      {/* Center: Navigation Links */}
      <Flex align="center" gap={32} style={{ height: '100%' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: isActive ? '#3b82f6' : '#94a3b8',
                fontWeight: isActive ? 600 : 400,
                fontSize: '14px',
                borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </div>
          );
        })}
      </Flex>

      {/* Right: Logout Button */}
      <Button
        onClick={handleLogout}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          color: '#cbd5e1',
          borderRadius: '6px',
          fontSize: '13px',
        }}
      >
        Cerrar sesión
      </Button>
    </header>
  );
};

export default HeaderNav;