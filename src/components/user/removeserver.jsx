import { Modal, Typography } from 'antd';
import {useState, useEffect} from 'react';
import { fetchWithAuth } from '../../utils/api';

const RemoveServer = ({user, isVisible, serverId, setIsDeleteModuleOpen, onUserUpdate}) => {
    const [loading, setLoading] = useState(false);

    const deleteUserServer = async () => {
        try{
            setLoading(true);

            const response = await fetchWithAuth(`http://localhost:3000/user-server`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({user_id: user.user_id, server_id: serverId}),
                }
            )

            if (!response.ok) throw new Error('Failed to delete server');

            const updateUser = {
                ...user,
                server: user.server.filter(s => s.server_id !== serverId)
            }

            if (onUserUpdate) onUserUpdate(updateUser);
        }
        catch(error){
            console.error('Error deleting server:', error);
        }
        finally{
            setLoading(false);
            setIsDeleteModuleOpen(false);
        }
    }

    return (
        <Modal
            open={isVisible}
            loading={loading}
            onCancel={() => setIsDeleteModuleOpen(false)}
            onOk={deleteUserServer}
        >
            <Typography.Text>Are you sure you want to remove the server "{user?.server?.find(s => s.server_id === serverId)?.hostname}"?</Typography.Text>
        </Modal>
    );
};

export default RemoveServer;