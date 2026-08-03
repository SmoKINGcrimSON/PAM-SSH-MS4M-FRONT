import { message } from 'antd';
import {Modal, Spin, Select, Flex, Dropdown, Typography, Divider, Input, Button } from 'antd';
import { useState, useEffect } from 'react';

const AddUser = ({server, isVisible, setIsAddModuleOpen, onServerUpdate}) => {
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sshUsername, setSshUsername] = useState('');
    const [sshPassword, setSshPassword] = useState('');

    useEffect(() => {
        if (!isVisible) return;
        setLoading(true);
        console.log(server)

        const fetchServers = async () => {
            const users = await fetch('http://localhost:3000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json());
                
            const userNotAssigned = [];

            users.forEach(user => {
                if (!(server.user ?? []).some(u => u.user_id === user.user_id)) {
                    userNotAssigned.push(user);
                }
            });
            setUserList(userNotAssigned);
            setLoading(false);
        }

        fetchServers();
    }, [isVisible]);

    const handleAssignServer = async () => {
        try{
            if (!selectedUser) throw new Error('No user selected');

            setLoading(true);

            const res = await fetch('http://localhost:3000/user-server',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    user_id: selectedUser.user_id,
                    server_id: server.server_id,
                    ssh_username: sshUsername,
                    encrypted_password: sshPassword
                })
            })

            console.log(selectedUser)

            if (!res.ok) throw new Error('Failed to assign server');

            const updatedServer = {
                ...server,
                user: [...(server.user ?? []), selectedUser]
            }

            if (onServerUpdate) onServerUpdate(updatedServer);

            message.success(`User ${selectedUser.username} assigned to server ${server.hostname} successfully`);
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
            onCancel={() => setIsAddModuleOpen(false)}
            footer={null}
        >
            <Typography.Title level={4} style={{ marginBottom: '-16px', padding: '0px 8px' }}>Assign Server</Typography.Title>
            <Divider style={{ padding: '0px 8px' }}/>
            <Flex vertical gap={8} style={{ width: '100%', padding: '8px 8px' }} align="start">
                <Flex vertical gap={4} style={{ width: '100%', marginBottom: '16px' }} align="start">
                    <Typography.Text>User</Typography.Text>
                    {
                        loading ? (
                        <Spin/>
                    ) : (
                        <Select
                            style={{ width: '100%' }}
                            placeholder="select a server"
                            value={selectedUser?.user_id}
                            onChange={(value) => {
                                const user = userList.find(u => u.user_id === value);
                                setSelectedUser(user);
                            }}>
                            {
                                userList.map(user => (
                                    <Select.Option
                                        key={user.user_id}
                                        value={user.user_id}>
                                        {user.username}
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

export default AddUser;