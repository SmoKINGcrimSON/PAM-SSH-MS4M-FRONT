import Server from "./server";
import { Card, List, Button } from "antd";
import { useState, useEffect } from "react";
import FilterServer from "./filterserver";
import { Flex } from "antd";
import CreateServer from "./createserver";
import ShowServer from "./showserver";
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

    const handleServerDelete = (deletedServerId) => {
        setServers((prevServers) => prevServers.filter(server => server.server_id !== deletedServerId));
    };

    useEffect(() => {
        //const cachedServers = sessionStorage.getItem('servers');

        //if(cachedServers) {
        //    setServers(JSON.parse(cachedServers));
        //    setLoading(false);
        //    return;
        //}

        const token = localStorage.getItem('token')

        if (!token) {
            console.error('No token found in localStorage')
            return
        }

        fetch(`${API_URL}/server`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const serverList = Array.isArray(data) ? data : [];
                setServers(serverList)
                console.log(`Fetched servers: ${JSON.stringify(data)}`)
                //sessionStorage.setItem('servers', JSON.stringify(serverList));
            })
            .catch((error) => console.error('Error fetching servers:', error))

            .finally(() => setLoading(false));
    }, []);

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
                            Server Management
                        </span>

                        {/* here goes the filter component */}
                        <Flex direction="row" style={{ gap: '20px', alignItems: 'center' }}>
                            <FilterServer handleSearchChange={(value) => setSearchText(value)} />
                            <Button type="primary" onClick={() => setIsCreateModuleOpen(true)}>Create Server</Button>
                        </Flex>
                    </div>
                }
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)', borderRadius: '12px' }}
                bodyStyle={{ padding: '12px 24px' }}
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={filteredServers}
                    pagination={{ pageSize: 5 }}
                    renderItem={(server) => (
                        <Server
                            key={server.server_id}
                            server={server}
                            onServerDelete={handleServerDelete}
                        />
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