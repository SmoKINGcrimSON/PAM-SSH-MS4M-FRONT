import Server from "./server";
import { Card, List, Button } from "antd";
import { useState, useEffect } from "react";
import FilterServer from "./filterserver";
import { Flex } from "antd";
import CreateServer from "./createserver";

const API_URL = "http://localhost:3000"

const Servers = () => {

    const [loading, setLoading] = useState(true);
    const [servers, setServers] = useState([]);
    const [searchText, setSearchText] = useState('');

    //create server modal state
    const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
    

    // Derive filtered list dynamically (safely handling missing hostnames)
    const filteredServers = (servers || []).filter((server) => {
        const hostname = server?.hostname?.toLowerCase() || '';
        return hostname.includes(searchText.toLowerCase());
    });

    const handleServerCreate = (newServer) => {
        setServers((prevServers) => [...prevServers, newServer]);
    };

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            console.error('No token found in localStorage')
            return
        }

        const fetchData = async () => {
            const servers = [];

            try{
                const resUserServer = await fetch(`${API_URL}/user-server`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!resUserServer.ok) throw new Error('Failed to fetch user-server');
                const data = await resUserServer.json();
                const take_server_id = [];
                const userServerList = Array.isArray(data) ? data : [];

                userServerList.forEach(userServer => {
                    const serverId = userServer.server?.server_id || userServer.server_id;

                    if (serverId && !take_server_id.includes(serverId)) {
                        const server = userServer.server;
                        const user = userServer.user;

                        const combinedServer = {
                            ...server,
                            user: [user], // Initialize with 1 user
                        };

                        servers.push(combinedServer);
                        take_server_id.push(serverId);
                    }

                    if (serverId && take_server_id.includes(serverId)){
                        const existingServer = servers.find(
                            s => s.server_id === serverId
                        );

                        const userExists = existingServer.user.some(
                            user => user.user_id === userServer.user.user_id
                        );

                        if (!userExists) {
                            existingServer.user.push(userServer.user);
                        }
                    }
                })

                console.log(servers);
            }
            catch (error){
                console.error('Error in user-server fetch:', error);
            }

            try{
                const resServer = await fetch(`${API_URL}/server`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!resServer.ok) throw new Error('Failed to fetch server');
                const data = await resServer.json();

                const serverList = Array.isArray(data) ? data : [];
                serverList.forEach(server => {
                    if (!servers.some(s => s.server_id === server.server_id)){
                        servers.push(server);
                    }
                });

                setServers(servers);
            }
            catch (error){
                console.error('Error in server fetch:', error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div style={{ maxWidth: '1200px', width: '90%', margin: '40px auto' }}>
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
                            Server Management
                        </span>

                        {/* here goes the filter component */}
                        <Flex direction="row" style={{ gap: '20px', alignItems: 'center' }}>
                            <FilterServer handleSearchChange={(value) => setSearchText(value)} />
                            <Button type="primary" onClick={() => setIsCreateModuleOpen(true)}>+ New Server</Button>
                        </Flex>
                    </div>
                }
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)', borderRadius: '12px' }}
                bodyStyle={{ padding: '12px 24px' }}
            >
                <List
                    loading={loading}
                    grid={{ gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 4, 
                    }}
                    //itemLayout="horizontal"
                    dataSource={filteredServers}
                    pagination={{ pageSize: 8 }}
                    renderItem={(server) => (
                        <List.Item
                        style={{ padding: '18px 12px' }}
                        >
                            <Server
                                key={server.server_id}
                                server={server}
                            />
                        </List.Item>
                    )}
                />
                <CreateServer 
                    isVisible={isCreateModuleOpen}
                    setIsCreateModuleOpen={setIsCreateModuleOpen}
                    onServerCreated={handleServerCreate}
                />
            </Card>
        </div>
    )
}

export default Servers;