import React from "react"
import { Card, List, Button, Dropdown, Space, Tag, Flex } from "antd"
import { EditOutlined, DeleteOutlined, MoreOutlined, DesktopOutlined } from "@ant-design/icons"
import { useState } from "react"
import ShowServer from "./showserver"
import DeleteServer from "./deleteserver"

const Server = ({server, onServerDelete}) => {
    const [isShowModuleOpen, setIsShowModuleOpen] = useState(false);
    const [isDeleteModuleOpen, setIsDeleteModuleOpen] = useState(false);

    const moreMenuItems = [
        { 
            key: '1', 
            label: 'View Details',
            onClick: () => setIsShowModuleOpen(true)
        }
    ]

    return (
        <List.Item
            style={{ padding: '18px 12px' }} // Gives rows vertical breathing room
            actions={[
                /*
                <Button key="edit" type="text" icon={<EditOutlined />}>Edit</Button>,
                <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => setIsDeleteModuleOpen(true)}>Delete</Button>,
                <Dropdown key="more" menu={{ items: moreMenuItems }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>*/
            ]}>

        {/* Space component places the username and tag side by side with proper gap */}
            {
                /*
            <Space size="large" align="center">
                <span style={{ fontWeight: 600, fontSize: '15px' }}>{server.hostname}</span>
                <Tag color={'blue'}>
                    {server.mine_name.toUpperCase()}
                </Tag>
                <Flex direction="column" style={{ gap: '10px' }}>
                    <span style={{ fontSize: '15px', color: 'gray' }}>IP</span>
                    <span style={{ fontWeight: 600, fontSize: '15px' }}>{server.ip_address}</span>
                </Flex>
                <Flex direction="column" style={{ gap: '10px' }}>
                    <span style={{ fontSize: '15px', color: 'gray' }}>Port</span>
                    <span style={{ fontWeight: 600, fontSize: '15px' }}>{server.ssh_port}</span>
                </Flex>
                <ShowServer
                isVisible={isShowModuleOpen}
                setIsShowModuleOpen={setIsShowModuleOpen}
                server={server}
                />
                <DeleteServer
                isVisible={isDeleteModuleOpen}
                setIsDeleteModuleOpen={setIsDeleteModuleOpen}
                server={server}
                onServerDelete={onServerDelete}
                />
            </Space>*/
            }

            <Card
                style={{
                    width: 320,
                    backgroundColor: '#121316',
                    borderRadius: '12px',
                    border: '1px solid #1f2023',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                }}
                bodyStyle={{ padding: '20px' }}
                >
                {/* Top Header: Icon and Environment Badge */}
                <Flex justify="space-between" align="flex-start" style={{ marginBottom: '20px' }}>
                    {/* Square Icon Container */}
                    <div
                        style={{
                            width: '44px',
                            height: '44px',
                            backgroundColor: '#1e222d',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #2a2f3d',
                        }}
                    >
                        <DesktopOutlined style={{ fontSize: '20px', color: '#5b82f6' }} />
                    </div>

                    {/* Orange Environment Tag */}
                    <Tag
                        variant="filled"
                        style={{
                            backgroundColor: 'rgba(217, 119, 6, 0.15)',
                            color: '#f59e0b',
                            borderRadius: '16px',
                            padding: '2px 12px',
                            fontSize: '12px',
                            fontWeight: 500,
                            margin: 0,
                        }}
                    >
                        {server?.mine_name?.toUpperCase() || 'ANTAMINA'}
                    </Tag>
                </Flex>

                {/* Main Info Section — FIXED: Changed direction="column" to vertical */}
                <Flex vertical gap={4}>
                    {/* Hostname — FIXED: Replaced <p> with <span> */}
                    <span
                        style={{
                            color: '#ffffff',
                            fontSize: '16px',
                            fontWeight: 700,
                            letterSpacing: '0.2px',
                        }}
                    >
                        {server?.hostname}
                    </span>

                    {/* IP Address & Port — FIXED: Replaced <p> with <span> */}
                    <span
                        style={{
                            color: '#60a5fa',
                            fontSize: '13px',
                            fontWeight: 500,
                            marginBottom: '12px',
                        }}
                    >
                        {server?.ip_address}:{server?.ssh_port}
                    </span>

                    {/* Access Count — FIXED: Replaced <p> with <span> */}
                    <span
                        style={{
                            color: '#94a3b8',
                            fontSize: '13px',
                        }}
                    >
                        {server?.user_count} {server?.user_count === 1 ? 'usuario con acceso' : 'usuarios con acceso'}
                    </span>
                </Flex>
            </Card>
        </List.Item>
    )
}

export default Server