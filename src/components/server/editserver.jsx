import { Flex } from "antd";
import { Button, Typography, Input, message } from "antd";
import { Modal } from "antd";
import {useState} from "react";
import { fetchWithAuth } from '../../utils/api';

const {Text, Title} = Typography;
const API_URL = 'http://localhost:3000'


const EditServer = ({server, isVisible, setIsEditModuleOpen, onServerUpdate}) => {
    const [loading, setLoading] = useState(false);
    const [hostname, setHostname] = useState(server.hostname);
    const [ipAddress, setIpAddress] = useState(server.ip_address);
    const [sshPort, setSshPort] = useState(server.ssh_port);
    const [mineName, setMineName] = useState(server.mine_name);
    const [serverPassword, setServerPassword] = useState(server.server_password);

    const handleSaveChanges = async () => {
        if (!hostname || !ipAddress || !sshPort || !mineName || !serverPassword){
            message.error('Please fill out all fields.')
            return
        }

        if (/\s/.test(hostname) || /\s/.test(ipAddress) || /\s/.test(sshPort) || /\s/.test(mineName) || /\s/.test(serverPassword)) {
            message.error('Hostname, IP Address, SSH Port, Mine Name, and Server Password cannot contain spaces.')
            return
        }

        if (isNaN(Number(sshPort)) || Number(sshPort) <= 0) {
            message.error('SSH Port must be a valid positive number.')
            return
        }

        const BodyData = {
            hostname: hostname,
            ip_address: ipAddress,
            ssh_port: sshPort,
            mine_name: mineName,
            server_password: serverPassword,
        }

        try{
            setLoading(true);
            const res = await fetchWithAuth(`${API_URL}/server/${server.server_id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(BodyData)
            })
                .catch((error) => {
                    throw new Error('Network error: ' + error.message);
                })
            
            if (!res.ok) throw new Error('Failed to update server')

            const updatedServer = {
                ...server,
                hostname: hostname,
                ip_address: ipAddress,
                ssh_port: sshPort,
                mine_name: mineName,
                server_password: serverPassword,
            }

            if (onServerUpdate){
                onServerUpdate(updatedServer)
            }

            message.success('Server updated successfully')
            setIsEditModuleOpen(false);
        }
        catch(error){
            message.error(error.message || 'Failed to update server')
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <Modal
            open={isVisible}
            onCancel={() => setIsEditModuleOpen(false)}
            footer={null}
        >
            <Flex vertical style={{ padding: '8px' }} width="100%">
                <Title level={4} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                    gap: '8px'
                 }}>
                    <p>Edit</p>
                    <p style={{ color: 'red' }}>{server.hostname.toUpperCase()}</p>
                </Title>
                <Flex direction="column" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px'}}>
                    <Text strong>Hostname:</Text>
                    <Input
                        placeholder="server hostname..."
                        value={hostname}
                        onChange={(e) => setHostname(e.target.value)}
                    />
                </Flex>
                <Flex direction="column" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px'}}>
                    <Text strong>Ip Address:</Text>
                    <Input 
                        placeholder="server ip address..."
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                    />
                </Flex>
                <Flex direction="column" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px'}}>
                    <Text strong>SSH Port:</Text>
                    <Input 
                        placeholder="server ssh port..."
                        value={sshPort}
                        onChange={(e) => setSshPort(e.target.value)}
                    />
                </Flex>
                <Flex direction="column" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px'}}>
                    <Text strong>Mine Name:</Text>
                    <Input 
                        placeholder="server mine name..."
                        value={mineName}
                        onChange={(e) => setMineName(e.target.value)}
                    />
                </Flex>
                <Flex direction="column" style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px'}}>
                    <Text strong>Server Password:</Text>
                    <Input.Password 
                        placeholder="server password..."
                        value={serverPassword}
                        onChange={(e) => setServerPassword(e.target.value)}
                    />
                </Flex>
                <Flex width="100%" justify="center">
                    <Button type="primary" onClick={handleSaveChanges} style={{ width: '125px' }} loading={loading}>
                        Save Changes
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    );
};

export default EditServer;