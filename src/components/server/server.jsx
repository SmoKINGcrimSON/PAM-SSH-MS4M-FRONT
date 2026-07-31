import React from "react"
import { Card, List, Button, Dropdown, Space, Tag } from "antd"
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons"
import { useState } from "react"
import { Flex } from "antd"
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
                <Button key="edit" type="text" icon={<EditOutlined />}>Edit</Button>,
                <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={() => setIsDeleteModuleOpen(true)}>Delete</Button>,
                <Dropdown key="more" menu={{ items: moreMenuItems }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ]}>

        {/* Space component places the username and tag side by side with proper gap */}
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
                {/* here goes additional server details if needed */}
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
            </Space>
        </List.Item>
    )
}

export default Server