import React, { useState, useEffect } from 'react'
import { List, Card, Input, Button, Flex } from 'antd'
import User from './user'
import CreateUser from './createuser'
import FilterUser from './filteruser'

const API_URL = "http://localhost:3000"

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [selectedRole, setSelectedRole] = useState('all') // 1. Track active role filter

    const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false)

    const handleUserUpdate = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((u) => (u.user_id === updatedUser.user_id ? { ...u, ...updatedUser } : u))
        )
    }

    const handleUserDelete = (deleteUserId) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.user_id !== deleteUserId))
    }

    const handleUserCreate = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser])
    }

    useEffect(() => {
        //const cachedUsers = sessionStorage.getItem('users')

        //if(cachedUsers){
        //    setUsers(JSON.parse(cachedUsers))
        //    setLoading(false)
        //    return
        //}

        const token = localStorage.getItem('token')

        if (!token) {
            console.error('No token found in localStorage')
            return
        }

        fetch(`${API_URL}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch users')
                return res.json()
            })
            .then((data) => {
                const userList = Array.isArray(data) ? data : []
                setUsers(userList)
                console.log(`Fetched users: ${JSON.stringify(data)}`)
                //sessionStorage.setItem('users', JSON.stringify(userList))
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => setLoading(false))
    }, [])

    // 2. Combine Search Text + Role Filter cleanly
    const filteredUsers = (users || []).filter((user) => {
        const matchesSearch = user.username?.toLowerCase().includes(searchText.toLowerCase())
        const matchesRole = selectedRole === 'all' || user.user_type === selectedRole
        return matchesSearch && matchesRole
    })

    return (
        <div style={{ maxWidth: '1100px', width: '90%', margin: '40px auto' }}>
            <Card
                title={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            gap: '16px'
                        }}
                    >
                        <span style={{ fontSize: '18px', fontWeight: 600 }}>
                            User Management
                        </span>

                        <Flex style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Input
                            placeholder="Search users..."
                            allowClear
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ maxWidth: '300px' }}
                            />

                            {/* 3. Pass role handler to FilterUser */}
                            <FilterUser onSelectRole={(role) => setSelectedRole(role)} />

                            <Button type="primary" onClick={() => setIsCreateModuleOpen(true)}>Create User</Button>
                        </Flex>
                    </div>
                }
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)', borderRadius: '12px' }}
                bodyStyle={{ padding: '12px 24px' }}
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={filteredUsers}
                    pagination={{ pageSize: 5 }}
                    renderItem={(user) => (
                        <User
                            key={user.user_id}
                            user={user} 
                            onUserUpdate={handleUserUpdate}
                            onUserDelete={handleUserDelete}
                            onUserCreate={handleUserCreate}
                        />
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