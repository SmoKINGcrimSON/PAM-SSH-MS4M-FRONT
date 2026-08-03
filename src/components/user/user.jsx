import React from 'react'
import { List, Tag, Button, Dropdown, Space, Card, Flex, Avatar, Typography } from 'antd'
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const User = ({ user, onUserUpdate, onUserDelete }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const[hovered, setHovered] = useState(false)

    const moreMenuItems = [
        { 
            key: '1', 
            label: 'View Details',
            onClick:() => {
                setIsShowMoreMenuOpen(true)
            }},
    ]

    return (
            <Card
                style={{
                    width: '100%',
                    borderRadius: 12,
                    border: hovered ? '1px solid #1677ff' : '1px solid #8c8c8c',
                }}
                styles={{ body: { padding: 16 } }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => navigate(`/user/${user.user_id}`, { state: { user } })}
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
    )
}

export default User