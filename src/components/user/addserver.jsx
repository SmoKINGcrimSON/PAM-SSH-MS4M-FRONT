import { message } from 'antd';
import {Modal, Spin, Select, Flex, Dropdown, Typography, Divider, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

const AddServer = ({user, isVisible, setIsAddModuleOpen, onUserUpdate}) => {
    const [loading, setLoading] = useState(false);
    const [serverList, setServerList] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [sshUsername, setSshUsername] = useState('');
    const [sshPassword, setSshPassword] = useState('');

    useEffect(() => {
        if (!isVisible) return;
        setLoading(true);
        console.log(user)

        const fetchServers = async () => {
            const servers = await fetchWithAuth('http://localhost:3000/server', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json());
                
            const serverNotAccessible = [];

            servers.forEach(server => {
                if (!(user.server ?? []).some(s => s.server_id === server.server_id)) {
                    serverNotAccessible.push(server);
                }
            });
            setServerList(serverNotAccessible);
            setLoading(false);
        }

        fetchServers();
    }, [isVisible]);

    const handleAssignServer = async () => {
        try{
            if (!selectedServer) throw new Error('No server selected');

            setLoading(true);

            const res = await fetchWithAuth('http://localhost:3000/user-server',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    server_id: selectedServer.server_id,
                    ssh_username: sshUsername,
                    encrypted_password: sshPassword
                })
            })

            console.log(selectedServer)

            if (!res.ok) throw new Error('Failed to assign server');

            const updatedServer = {
                ...user,
                server: [...(user.server ?? []), selectedServer]
            }

            if (onUserUpdate) onUserUpdate(updatedServer);

            message.success(`Server ${selectedServer.hostname} assigned successfully`);
        }
        catch(error){
            message.error(error.message || 'Failed to assign server');
        }
        finally{
            setLoading(false);
            setIsAddModuleOpen(false);
        }
    }

    return(
        <Modal
            open={isVisible}
            onCancel={() => {
                setIsAddModuleOpen(false)
                setSelectedServer(null)
                setSshUsername('')
                setSshPassword('')
            }}
            footer={null}
        >
            <Typography.Title level={4} style={{ marginBottom: '-16px', padding: '0px 8px' }}>Assign Server</Typography.Title>
            <Divider style={{ padding: '0px 8px' }}/>
            <Flex vertical gap={8} style={{ width: '100%', padding: '8px 8px' }} align="start">
                <Flex vertical gap={4} style={{ width: '100%', marginBottom: '16px' }} align="start">
                    <Typography.Text>Server</Typography.Text>
                    {
                        loading ? (
                        <Spin/>
                    ) : (
                        <Select
                            style={{ width: '100%' }}
                            placeholder="select a server"
                            value={selectedServer?.server_id}
                            onChange={(value) => {
                                const server = serverList.find(s => s.server_id === value);
                                setSelectedServer(server);
                            }}>
                            {
                                serverList.map(server => (
                                    <Select.Option
                                        key={server.server_id}
                                        value={server.server_id}>
                                        {server.hostname}
                                    </Select.Option>
                            ))}
                        </Select>
                    )}
                </Flex>

                <Flex vertical gap={4} style={{ width: '100%', marginBottom: '16px' }} align="start">
                    <Typography.Text>Ssh Username</Typography.Text>
                    <Input placeholder="ssh username" value={sshUsername} onChange={(e) => setSshUsername(e.target.value)} />
                </Flex>

                <Flex vertical gap={4} style={{ width: '100%', marginBottom: '16px' }} align="start">
                    <Typography.Text>Password</Typography.Text>
                    <Input.Password placeholder="password" value={sshPassword} onChange={(e) => setSshPassword(e.target.value)} />
                </Flex>

                <Flex vertical gap={4} style={{ width: '100%'}} align="center">
                    <Button type="primary" onClick={handleAssignServer}>Assign Server</Button>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default AddServer;