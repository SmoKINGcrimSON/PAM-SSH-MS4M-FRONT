import React from 'react';
import { Tabs, Card, Button, Table, Typography, Space, Flex } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router-dom';
const { Text, Title, Link } = Typography;
import {useState} from 'react';
import EditUser from './edituser';
import RemoveServer from './removeserver';
import AddServer from './addserver';

const UserView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [user, setUser] = useState(state?.user || {});

    const [serverIdDelete, setServerIdDelete] = useState(null);

    const onUserUpdate = (updatedUser) => { /*i can use it for edit user, delete server and add server*/
        setUser(updatedUser);

        window.history.replaceState(
        { ...window.history.state, usr: { ...window.history.state?.usr, user: updatedUser } },
        ''
        );
    }

    const[isEditModuleOpen, setIsEditModuleOpen] = useState(false)
    const[isDeleteModuleOpen, setIsDeleteModuleOpen] = useState(false)
    const[isAddModuleOpen, setIsAddModuleOpen] = useState(false)

    // Custom Empty State Message for Table
    const locale = {
        emptyText: (
        <div style={{ textAlign: 'left', padding: '16px 0', color: '#8c8c8c' }}>
            This user has no assigned servers. To assign a server, click the "add Server" button above.
        </div>
        ),
    };

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
                onClick={() => navigate("/users")}
            >
                Return to users
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
                        {user.username.toUpperCase() || 'JULIA LOPEZ'}
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                        {user.username.toLowerCase() || 'jlopez'} · {user.user_type.toLowerCase() || 'user'}
                        </Text>
                    </div>
                    <Button 
                        onMouseEnter={(e) => {e.currentTarget.style.color = '#1d4ed8', e.currentTarget.style.background = '#e0f2fe'}}
                        onMouseLeave={(e) => {e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.background = 'transparent';}}
                        type="text" 
                        style={{ color: '#8c8c8c' }}
                        onClick={() => setIsEditModuleOpen(true)}>
                        Edit User
                    </Button>
                </Flex>
            </Card>

            {/* Servers Section Header */}
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
                Servidores asignados
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
                    Add Server
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
                    <div>Server</div>
                    <div>Level</div>
                    <div>Password</div>
                    <div></div>
                </li>

                {/* Row */}
                {
                    user?.server?.map((server) => {
                        return (
                        <li
                            key={server.server_id}
                            style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 2fr 2fr 1fr',
                            alignItems: 'center',
                            padding: '16px',
                            fontSize: '14px',
                            color: '#1f2937',
                            }}
                        >
                            <div>{server.hostname}</div>
                            <div>{user.user_type}</div>
                            <div
                            style={{
                                letterSpacing: '2px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#111827',
                            }}
                            >
                            {server.server_password?.replace(/./g, '*')}
                            {console.log(server)}
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
                                    setServerIdDelete(server.server_id);
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

        {/*other components*/}
        <EditUser 
                isVisible={isEditModuleOpen} 
                user={user} 
                setIsEditModuleOpen={setIsEditModuleOpen}
                onUserUpdate={onUserUpdate}
        />
        <RemoveServer
                user={user}
                isVisible={isDeleteModuleOpen} 
                serverId={serverIdDelete} 
                setIsDeleteModuleOpen={setIsDeleteModuleOpen}
                onUserUpdate={onUserUpdate}
        />
        <AddServer
                user={user}
                isVisible={isAddModuleOpen}
                setIsAddModuleOpen={setIsAddModuleOpen}
                onUserUpdate={onUserUpdate}
        />
    </div>
  );
};

export default UserView;