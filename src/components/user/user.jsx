import React from 'react'
import { List, Tag, Button, Dropdown, Space } from 'antd'
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import EditUser from './edituser'
import DeleteUser from './deleteuser'
import ShowUser from './showuser'

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
                <Button key="edit" type="text" icon={<EditOutlined />} onClick={() => setIsEditModuleOpen(true)}>Edit</Button>,
                <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => setIsDeleteModuleOpen(true)}>Delete</Button>,
                <Dropdown key="more" menu={{ items: moreMenuItems }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ]}>

        {/* Space component places the username and tag side by side with proper gap */}
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
        </List.Item>
    )
}

export default User