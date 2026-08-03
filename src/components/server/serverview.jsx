import {useLocation, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import { Flex, Button, Typography, Card } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import AddUser from "./adduser";
import RemoveUser from "./removeuser";

const { Text, Title } = Typography;

const ServerView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [server, setServer] = useState(location.state?.server || null);
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
    const [isDeleteModuleOpen, setIsDeleteModuleOpen] = useState(false);
    const [serverIdDelete, setServerIdDelete] = useState(null);
    const [userIdDelete, setUserIdDelete] = useState(null);

    const onServerUpdate = (updatedServer) => { /*i can use it for edit user, delete server and add server*/
        setServer(updatedServer);

        window.history.replaceState(
        { ...window.history.state, srv: { ...window.history.state?.srv, server: updatedServer } },
        ''
        );
    }

    useEffect(() => {
        console.log(server)
    }, [server]);

    return (
    <div style={{ padding: '48px 36px', backgroundColor: '#f4f7fe', minHeight: '100vh', width: '100%', display: 'flex',
        alignItems: 'flex-start', justifyContent: 'center'
    }}>
        <Flex vertical gap="large" style={{ width: '60%'} } >
            {/* Back Link */}
            <Button
                style={{ display: 'flex', justifyContent: 'flex-start' }}
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/servers")}
            >
                Return to servers
            </Button>

            {/* User Information Card */}
            <Card
                bordered
                style={{
                    borderColor: '#e8e8e8',
                    width: '100%',
                }}
                bodyStyle={{ padding: '20px 24px' }}>
                <Flex justify="space-between" align="center">
                    <div>
                        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                        {server.hostname.toUpperCase() || 'srv-c4m-db01'}
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                        {server.ip_address || '192.168.1.1'}:{server.ssh_port || '2344'} · {server?.user?.length ?? 0} Users
                        </Text>
                    </div>
                    <Button 
                        onMouseEnter={(e) => {e.currentTarget.style.color = '#1d4ed8', e.currentTarget.style.background = '#e0f2fe'}}
                        onMouseLeave={(e) => {e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.background = 'transparent';}}
                        type="text" 
                        style={{ color: '#8c8c8c' }}
                        onClick={() => setIsEditModuleOpen(true)}>
                        Edit Server
                    </Button>
                </Flex>
            </Card>

            {/* Servers Section Header */}
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
                Usuarios con acceso
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    style={{
                        backgroundColor: '#1d4ed8',
                        borderRadius: 6,
                        height: 38,
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}
                    onClick={() => setIsAddModuleOpen(true)}
                    >
                    Add User
                </Button>
            </Flex>

            {/* Assigned Servers Table */}
            <ul
                style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    backgroundColor: '#f4f7fe',
                    fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
                >
                {/* Header */}
                <li
                    style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 2fr 1fr',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderBottom: '1px solid #e5e7eb',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    }}
                >
                    <div>User</div>
                    <div>Level</div>
                    <div>Password</div>
                    <div></div>
                </li>

                {/* Row */}
                {
                    server?.user?.map((user) => {
                        return (
                        <li
                            key={user.username}
                            style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 2fr 2fr 1fr',
                            alignItems: 'center',
                            padding: '16px',
                            fontSize: '14px',
                            color: '#1f2937',
                            }}
                        >
                            <div>{user.username}</div>
                            <div>{user.user_type}</div>
                            <div
                            style={{
                                letterSpacing: '2px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#111827',
                            }}
                            >
                            {user.hash_password?.slice(0, 15).replace(/./g, '*')}
                            {console.log(user)}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                            <button
                                type="button"
                                style={{
                                background: 'none',
                                border: 'none',
                                color: '#6b7280',
                                fontSize: '14px',
                                cursor: 'pointer',
                                padding: 0,
                                }}
                                onClick={() => {
                                    setUserIdDelete(user.user_id);
                                    setIsDeleteModuleOpen(true);
                                }}
                            >
                                Remove
                            </button>
                            </div>
                        </li>
                        );
                    })
                }
            </ul>
        </Flex>
        {/*Other Components */}
        <RemoveUser
            server={server}
            isVisible={isDeleteModuleOpen}
            userId={userIdDelete}
            setIsDeleteModuleOpen={setIsDeleteModuleOpen}
            onServerUpdate={onServerUpdate}
        />
        <AddUser
            server={server}
            
            isVisible={isAddModuleOpen}
            setIsAddModuleOpen={setIsAddModuleOpen}
            onServerUpdate={onServerUpdate}
        />
    </div>)
}

export default ServerView