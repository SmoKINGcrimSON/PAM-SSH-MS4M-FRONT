import React, { useState, useEffect } from 'react'
import { List, Card, Input, Button, Flex } from 'antd'
import User from './user'
import CreateUser from './createuser'
import FilterUser from './filteruser'
import { fetchWithAuth } from '../../utils/api'

const API_URL = "http://localhost:3000"

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [selectedRole, setSelectedRole] = useState('all')
    const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false)

    const handleUserCreate = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser])
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

        const fetchData = async () => {
            const users = [];

            // 1. Fetch user-server records
            try {
                const resUserServer = await fetchWithAuth(`${API_URL}/user-server`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!resUserServer.ok) throw new Error('Failed to fetch user-server');
                const data = await resUserServer.json();
                const take_user_id = [];
                const userServerList = Array.isArray(data) ? data : [];

                userServerList.forEach(userServer => {
                    const userId = userServer.user?.user_id || userServer.user_id;

                    if (userId && !take_user_id.includes(userId)) {
                        const user = userServer.user;
                        const server = userServer.server;

                        const combinedUser = {
                            ...user,
                            server: [server]
                        };

                        users.push(combinedUser);
                        take_user_id.push(userId);
                    }

                    if (userId && take_user_id.includes(userId)) {
                        const existingUser = users.find(
                            u => u.user_id === userId
                        );

                        const serverExists = existingUser.server.some(
                            server => server.server_id === userServer.server.server_id
                        );

                        if (!serverExists) {
                            existingUser.server.push(userServer.server);
                        }
                    }
                });

                console.log(users);
            } catch (error) {
                console.error('Error in user-server fetch:', error);
            }

            // 2. Fetch all users and fill in remaining missing ones
            try {
                const resUser = await fetchWithAuth(`${API_URL}/user`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!resUser.ok) throw new Error('Failed to fetch users');
                const data = await resUser.json();

                const userList = Array.isArray(data) ? data : [];
                userList.forEach(user => {
                    if (!users.some(u => u.user_id === user.user_id)) {
                        users.push(user);
                    }
                });

                setUsers(users);
                } catch (error) {
                    console.error('Error in user fetch:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
    }, []);

    // 2. Combine Search Text + Role Filter cleanly
    const filteredUsers = (users || []).filter((user) => {
        const matchesSearch = user.username?.toLowerCase().includes(searchText.toLowerCase())
        const matchesRole = selectedRole === 'all' || user.user_type === selectedRole
        return matchesSearch && matchesRole
    })

    return (
        <div style={{ maxWidth: '1100px', width: '80%', margin: '40px auto'}}>
            <Card
                title={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            gap: '16px',
                        }}
                    >
                        <span style={{ fontSize: '18px', fontWeight: 600 }}>
                            User Management
                        </span>

                        <Flex style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Input
                            placeholder="search users..."
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ maxWidth: '300px' }}
                            />

                            {/* 3. Pass role handler to FilterUser */}
                            <FilterUser onSelectRole={(role) => setSelectedRole(role)} />

                            <Button type="primary" onClick={() => setIsCreateModuleOpen(true)}>+ New User</Button>
                        </Flex>
                    </div>
                }
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)', borderRadius: '12px' }}
                bodyStyle={{ padding: '12px 24px' }}
            >
                <List
                    loading={loading}
                    backgroundColor="#fff"
                    style={{ backgroundColor: '#fff' }}
                    itemLayout="vertical"
                    size="large"
                    grid={{ 
                        gutter: [24, 24],
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 4, 
                    }}
                    //itemLayout="horizontal"
                    dataSource={filteredUsers}
                    pagination={{ pageSize: 8 }}
                    renderItem={(user) => (
                        <List.Item style={{ padding: 1 }}>
                            <User
                                user={user}
                            />
                        </List.Item>
                    )}
                />
                <CreateUser
                    isVisible={isCreateModuleOpen}
                    setIsCreateModuleOpen={setIsCreateModuleOpen}
                    onUserCreate={handleUserCreate}
                />
            </Card>
        </div>
    )
}

export default Users