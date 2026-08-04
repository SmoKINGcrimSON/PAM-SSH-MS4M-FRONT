import React, { useState, useEffect } from 'react'
import { Modal, Flex, Input, Typography, Select, Button, message } from 'antd'
import { fetchWithAuth } from '../../utils/api'
import '../../index.css'
const API_URL = "http://localhost:3000" // Default to localhost if not set;

const { Text } = Typography

const EditUser = ({ isVisible, user, setIsEditModuleOpen, onUserUpdate }) => {
    const [userType, setUserType] = useState(user?.user_type || 'user')
    const [newPassword, setNewPassword] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setUserType(user.user_type || 'user')
        }
    }, [user])

    const handleSave = async () => {
        // Validate inputs
        if (/\s/.test(newPassword) || /\s/.test(userType)) {
            message.error('Password and user type cannot contain spaces.')
            return
        }

        setLoading(true)

        try {
            const bodyData = { user_type: userType }
            if (newPassword) {
                bodyData.hash_password = newPassword
            }
            else if (userType === user.user_type) throw new Error('No changes made to user type or password.')

            const res = await fetchWithAuth(`${API_URL}/user/${user?.user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)
            })

            if (!res.ok) throw new Error('Failed to update user')
            
            const updatedData = await res.json()

            const updatedUser = {
                ...user,
                user_type: updatedData.user_type,
                hash_password: updatedData.hash_password
            }
            
            // Send updated data back up to Users.jsx state
            if (onUserUpdate) {
                onUserUpdate(updatedUser)
            }

            console.log('Updated user data:', updatedUser)

            message.success('User updated successfully')
            setNewPassword('')
            setIsEditModuleOpen(false)
        } catch (error) {
            console.error('Error:', error)
            message.error(error.message || 'Failed to update user')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title={`Edit ${user?.name || user?.username || 'User'}`}
            open={isVisible}
            onCancel={() => setIsEditModuleOpen(false)}
            footer={null}
            destroyOnClose={true}
            top-centered
        >
            <Flex style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Text strong>Rol:</Text>
                <Select value={userType} onChange={(value) => setUserType(value)}>
                    <Select.Option value="superuser">Superuser</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                </Select>

                <Text strong>New Password:</Text>
                <Input.Password 
                    placeholder="Enter new password (optional)" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />

                <Button 
                    type="primary" 
                    loading={loading}
                    style={{ alignSelf: 'center', width: '100px', marginTop: '10px' }} 
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Flex>
        </Modal>
    )
}

export default EditUser