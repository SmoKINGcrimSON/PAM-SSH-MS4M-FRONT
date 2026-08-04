import { Modal, Typography } from 'antd';
import {useState, useEffect} from 'react';
import { fetchWithAuth } from '../../utils/api';

const RemoveUser = ({server, isVisible, userId, setIsDeleteModuleOpen, onServerUpdate}) => {
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
                    body: JSON.stringify({user_id: userId, server_id: server.server_id}),
                }
            )

            if (!response.ok) throw new Error('Failed to delete server');

            const updateServer = {
                ...server,
                user: server.user.filter(u => u.user_id !== userId)
            }

            if (onServerUpdate) onServerUpdate(updateServer);
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
            <Typography.Text>Are you sure you want to remove the user "{server?.user?.find(u => u.user_id === userId)?.username}"?</Typography.Text>
        </Modal>
    );
};

export default RemoveUser;