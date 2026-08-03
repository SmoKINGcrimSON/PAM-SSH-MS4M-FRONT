import React from "react"
import { Card, List, Button, Dropdown, Space, Tag, Flex } from "antd"
import { EditOutlined, DeleteOutlined, MoreOutlined, DesktopOutlined } from "@ant-design/icons"
import { useState } from "react"
import {useNavigate} from "react-router-dom"

const Server = ({server, onServerDelete}) => {

    const [isShowModuleOpen, setIsShowModuleOpen] = useState(false);
    const [isDeleteModuleOpen, setIsDeleteModuleOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const onClickCard = () => {
        navigate(`/server/${server.server_id}`, {state: {server}})
    }

    return (
            <Card

                style={{
                    width: "100%",
                    borderRadius: '12px',
                    border: hovered ? '1px solid #1677ff' : '1px solid #8c8c8c',
                    cursor: 'pointer',
                }}
                bodyStyle={{ padding: '20px' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClickCard}
            >
                {/* Top Header: Icon and Environment Badge */}
                <Flex justify="space-between" align="flex-start" style={{ marginBottom: '20px' }}>
                    {/* Square Icon Container */}
                    <div
                        style={{
                            width: '44px',
                            height: '44px',
                            //backgroundColor: '#1e222d',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            //border: '1px solid #6e6f74',
                            //boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
                            color: '#8c8c8c',
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
                        {`${server?.user?.length ?? 0} usuarios con acceso`}
                    </span>
                </Flex>
            </Card>
    )
}

export default Server