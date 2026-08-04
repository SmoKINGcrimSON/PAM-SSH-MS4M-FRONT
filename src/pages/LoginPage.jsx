import { Button, Input, message, Typography, Card, Flex } from "antd"
import {useState, useEffect} from "react"
import {useNavigate, useLocation} from "react-router-dom"

const {Text} = Typography

const API_URL = 'http://localhost:3000'

const LoginPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleLogin = async () => {
        if (!username || !password){
            message.error('Please fill out all fields.')
            return
        }

        if (/\s/.test(username) || /\s/.test(password)) {
            message.error('Username and Password cannot contain spaces.')
            return
        }

        try{
            setLoading(true)
            const res = await fetch(`${API_URL}/auth/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(
                    {
                        username: username,
                        hash_password: password
                    }
                )
            })

            if (!res.ok) throw new Error('Failed to login')

            const data = await res.json()

            console.log(data.accessToken)
            localStorage.setItem('token', data.accessToken)
            navigate('/')
        }
        catch(error){
            message.error('Login failed. Please check your credentials and try again.')
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw',
            backgroundColor: '#0b2545'
         }}>
            <Card style={{ width: '320px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <Flex align="center" justify="center" direction="column" style={{ marginTop: '-20px', gap: '10px' }}>
                    <div style={{color: "#2563eb", fontSize: '24px', backgroundColor:'#e8f0fe',
                        width: '50px', height: '50px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    }}>☉</div>
                </Flex>
                <Typography.Title level={3} style={{ textAlign: 'center', marginTop: '10px', color: '#1e293b',
                     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.5px',
                     fontSize: '17px'}}>
                    PAM · MS4M
                </Typography.Title>
                <p style={{marginTop:'-5px', textAlign: 'center', color: '#5b6b82', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serifs'}}>
                    Priviledge Management System
                </p>
                <Flex style={{ marginTop: '20px' }} vertical gap="5px">
                    <Text style={{color: '#5b6b82', fontWeight: '600', fontSize: '15px'}}>Username</Text>
                    <Input style={{borderColor: '#dde3ee'}} placeholder="Enter your username"
                     value={username} onChange={(e) => setUsername(e.target.value)} />
                </Flex>
                <Flex style={{ marginTop: '15px' }} vertical gap="5px">
                    <Text style={{color: '#5b6b82', fontWeight: '600', fontSize: '15px'}}>Password</Text>
                    <Input.Password style={{borderColor: '#dde3ee'}} placeholder="Enter your password"
                     value={password} onChange={(e) => setPassword(e.target.value)} />
                </Flex>
                <Flex style={{ marginTop: '20px', marginBottom: '-10px' }} vertical gap="5px">
                    <Button type="primary" style={{ width: '100%', height: '35px' }} onClick={handleLogin} loading={loading}>Login</Button>
                </Flex>
            </Card>
        </div>
    )
}

export default LoginPage