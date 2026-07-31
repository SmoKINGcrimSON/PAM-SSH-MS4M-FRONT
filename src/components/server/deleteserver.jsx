import { Modal, message } from "antd"
import { useState } from "react"

const API_URL = "http://localhost:3000"

const DeleteServer = ({ isVisible, setIsDeleteModuleOpen, onServerDelete, server }) => {
    const [loading, setLoading] = useState(false)

    const HandleDelete = async () => {
        if (!server?.server_id) {
            message.error('No valid server selected for deletion.')
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`${API_URL}/server/${server?.server_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!res.ok) throw new Error('Failed to delete server')

            if (onServerDelete) {
                onServerDelete(server.server_id)
            }

            message.success('Server deleted successfully')
            setIsDeleteModuleOpen(false)
        } catch (error) {
            console.error('Error:', error)
            message.error(error.message || 'Failed to delete server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title={`Are you sure you want to delete ${server?.hostname || 'this server'}?`}
            open={isVisible}
            confirmLoading={loading}
            onCancel={() => setIsDeleteModuleOpen(false)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            destroyOnClose={true}
            top-center
            onOk={HandleDelete} /* Fixed casing here */
        >
            <p>This action cannot be undone.</p>
        </Modal>
    )
}

export default DeleteServer