import React from 'react'
import { List, Tag, Button, Dropdown, Space, Card, Flex, Avatar, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import EditUser from './edituser'
import DeleteUser from './deleteuser'
import ShowUser from './showuser'

const { Title, Text } = Typography

const User = ({ user, onUserUpdate, onUserDelete }) => {
    const[isEditModuleOpen, setIsEditModuleOpen] = useState(false)
    const[isDeleteModuleOpen, setIsDeleteModuleOpen] = useState(false)
    const[isShowMoreMenuOpen, setIsShowMoreMenuOpen] = useState(false)

    const moreMenuItems = [
        { 
            key: '1', 
            label: 'View Details',
            onClick:() => {
                setIsShowMoreMenuOpen(true)
            }},
    ]

    return (
        <List.Item
            style={{ padding: '18px 12px' }} // Gives rows vertical breathing room
            actions={[
                /*
                <Button  key="edit" type="text" icon={<EditOutlined />} onClick={() => setIsEditModuleOpen(true)}>Edit</Button>,
                <Button  key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => setIsDeleteModuleOpen(true)}>Delete</Button>,
                <Dropdown key="more" menu={{ items: moreMenuItems }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>*/
            ]}>

        {/* Space component places the username and tag side by side with proper gap */}
            {
                /*
                <Space size="large" align="center">
                <span style={{ fontWeight: 600, fontSize: '15px' }}>{user.username}</span>
                <Tag color={user.user_type === 'admin' ? 'volcano' : 'blue'}>
                    {user.user_type.toUpperCase()}
                </Tag>
                <EditUser 
                isVisible={isEditModuleOpen} 
                user={user} 
                setIsEditModuleOpen={setIsEditModuleOpen}
                onUserUpdate={onUserUpdate} />
                <DeleteUser 
                isVisible={isDeleteModuleOpen} 
                user={user} 
                setIsDeleteModuleOpen={setIsDeleteModuleOpen}
                onUserDelete={onUserDelete} />
                <ShowUser
                isVisible={isShowMoreMenuOpen}
                user={user}
                setIsShowMoreMenuOpen={setIsShowMoreMenuOpen} />
            </Space>
                */
            <Card
                style={{
                    width: 300,
                    backgroundColor: '#12131a',
                    borderColor: '#262938',
                    borderRadius: 12,
                }}
                styles={{ body: { padding: 16 } }}
                >
                <Flex vertical gap="middle">
                    {/* Header: Avatar + User Info */}
                    <Flex align="center" gap={12}>
                    <Avatar
                        size={48}
                        style={{
                        backgroundColor: '#1668dc',
                        fontWeight: 'bold',
                        }}
                    >
                        {user?.username?.charAt(0).concat(user?.username?.charAt(1) || '').toUpperCase() || 'E'}
                    </Avatar>

                    <Flex vertical style={{ lineHeight: 1.2 }}>
                        <Title level={5} style={{ color: '#fff', margin: 0, fontSize: '15px' }}>
                        {user?.username || 'holder_1'}
                        </Title>
                        <Text style={{ color: '#8c8c8c', fontSize: '13px' }}>
                        {user?.username || 'holder_1'}
                        </Text>
                    </Flex>
                    </Flex>

                    {/* Role Badge */}
                    <div>
                        <Tag
                            style={{
                            backgroundColor: '#1d2330',
                            color: '#91caff',
                            borderColor: 'transparent',
                            borderRadius: 12,
                            padding: '2px 12px',
                            fontSize: '12px',
                            margin: 0,
                            }}
                        >
                            {user?.user_type || 'user'}
                        </Tag>
                    </div>

                    {/* Footer Info */}
                    <Text style={{ color: '#8c8c8c', fontSize: '13px' }}>
                    {user?.server?.length ?? 0} servidores asignados
                    </Text>
                </Flex>
            </Card>
            }
        </List.Item>
    )
}

export default User