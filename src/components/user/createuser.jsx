import { Modal, Flex, Typography, Input, Select, Button } from "antd"
import { useState } from "react"
import { message } from "antd"
import { fetchWithAuth } from '../../utils/api'
const API_URL = "http://localhost:3000" // Default to localhost if not set;

const { Text } = Typography

const CreateUser = ({isVisible,setIsCreateModuleOpen, user, onUserCreate}) => {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [userType, setUserType] = useState('')
    const [password, setPassword] = useState('')

    const handleCreateUser = async () => {
        // Validate inputs
        if (!username || !userType || !password) {
            message.error('Please fill out all fields.')
            return
        }
        // Check for spaces in username, userType, and password
        if(/\s/.test(username) || /\s/.test(userType) || /\s/.test(password)){
            message.error('Username, user type, and password cannot contain spaces.')
            return
        }

        setLoading(true)

        try{
            const bodyData = {
                username: username,
                user_type: userType,
                hash_password: password
            }

            const res = await fetchWithAuth(`${API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)
            })

            if (!res.ok) throw new Error('Failed to create user')

            const createUser = await res.json()

            //
            if (onUserCreate) {
                onUserCreate(createUser)
            }
            //

            message.success('User created successfully')
            setUsername('')
            setUserType('')
            setPassword('')
            setIsCreateModuleOpen(false)
        }
        catch (error) {
            console.error('Error:', error)
            message.error(error.message || 'Failed to create user')
        }
        finally {
            setLoading(false)
        }
    }

    return(<Modal
        title={`Create New User`}
        open={isVisible}
        onCancel={() => {
            setIsCreateModuleOpen(false)
            setUsername('')
            setUserType('')
            setPassword('')
        }}
        footer={null}
        destroyOnHidden={true}
        top-centered
    >
        <Flex style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Text strong>Username:</Text>
            <Input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Text strong>User Type:</Text>
            <Select placeholder="Select user type" value={userType} onChange={(value) => setUserType(value)}>
                <Select.Option value="superuser">Superuser</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
            </Select>
            <Text strong>Password:</Text>
            <Input.Password placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="primary" loading={loading} onClick={handleCreateUser} style={{ alignSelf: 'center', width: '100px', marginTop: '10px' }} >
                Create User
            </Button>
        </Flex>
    </Modal>)
}

export default CreateUser