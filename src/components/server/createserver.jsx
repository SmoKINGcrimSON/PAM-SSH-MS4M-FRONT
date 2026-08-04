import { Modal, Flex, Typography, Input, Button, message } from "antd"
import { useState } from "react"
import { fetchWithAuth } from '../../utils/api'

const { Text } = Typography

const CreateServer = ({isVisible, setIsCreateModuleOpen, server, onServerCreated}) => {
    const [loading, setLoading] = useState(false)
    const [hostname, setHostname] = useState('')
    const [ipAddress, setIpAddress] = useState('')
    const [sshPort, setSshPort] = useState('')
    const [mineName, setMineName] = useState('')
    const [serverPassword, setServerPassword] = useState('')

    const handleCreateServer = async () => {
        if (!hostname || !ipAddress || !sshPort || !mineName || !serverPassword) {
            message.error('Please fill out all fields.')
            return
        }

        if(/\s/.test(hostname) || /\s/.test(ipAddress) || /\s/.test(sshPort) || /\s/.test(mineName) || /\s/.test(serverPassword)) {
            message.error('Hostname, IP Address, SSH Port, Mine Name, and Server Password cannot contain spaces.')
            return
        }

        if (isNaN(Number(sshPort)) || Number(sshPort) <= 0) {
            message.error('SSH Port must be a valid positive number.')
            return
        }

        setLoading(true)

        try{
            const bodyData = {
                hostname: hostname,
                ip_address: ipAddress,
                ssh_port: Number(sshPort),
                mine_name: mineName,
                server_password: serverPassword
            }
            const res = await fetchWithAuth(`http://localhost:3000/server`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)
            })

            if (!res.ok) throw new Error('Failed to create server')

            const createServer = await res.json()

            if (onServerCreated) {
                onServerCreated(createServer)
            }

            message.success('User created successfully')
            setHostname('')
            setIpAddress('')
            setSshPort('')
            setMineName('')
            setServerPassword('')
            setIsCreateModuleOpen(false)
        } catch (error) {
            console.error('Error creating server:', error)
            message.error(error.message || 'Failed to create server')
        } finally {
            setLoading(false)
        }
    }

    return(
        <Modal 
            title={"Create New Server"}
            open={isVisible}
            onCancel={() => {
                setIsCreateModuleOpen(false)
                setHostname('')
                setIpAddress('')
                setSshPort('')
                setMineName('')
                setServerPassword('')
            }}
            footer={null}
            destroyOnHidden={true}
            top-centered
        >
            <Flex direction="column" style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Text strong>Hostname:</Text>
                <Input 
                    placeholder="server hostname..."
                    value={hostname}
                    onChange={(e) => setHostname(e.target.value)}
                />
                <Text strong>Ip Address:</Text>
                <Input 
                    placeholder="server ip address..."
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <Text strong>SSH Port:</Text>
                <Input 
                    placeholder="server ssh port..."
                    value={sshPort}
                    onChange={(e) => setSshPort(e.target.value)}
                />
                <Text strong>Mine Name:</Text>
                <Input 
                    placeholder="server mine name..."
                    value={mineName}
                    onChange={(e) => setMineName(e.target.value)}
                />
                <Text strong>Server Password:</Text>
                <Input.Password 
                    placeholder="server password..."
                    value={serverPassword}
                    onChange={(e) => setServerPassword(e.target.value)}
                />
                <Button
                    type="primary"
                    loading={loading}
                    style={{ alignSelf: 'center', width: '100px', marginTop: '10px' }}
                    onClick={handleCreateServer}
                >
                    Create Server
                </Button>
            </Flex>
        </Modal>
    )
}

export default CreateServer