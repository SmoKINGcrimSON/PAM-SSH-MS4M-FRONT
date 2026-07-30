import { Modal, message } from 'antd'
import { useState } from 'react'

const DeleteUser = (({isVisible, setIsDeleteModuleOpen, onUserDelete, user}) => {
    const[loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)

        try{
            const res = await fetch(`http://localhost:3000/user/${user?.user_id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(!res.ok) throw new Error('Failed to delete user')

            message.success('User deleted successfully')

            if (onUserDelete) {
                onUserDelete(user?.user_id)
            }

            setIsDeleteModuleOpen(false)
        } 
        catch (error) {
            console.error('Error:', error)
            message.error('Failed to delete user.')
        } finally {
            setLoading(false)
        }
    }

    return(
        <Modal
            title={`Are you sure you want to delete ${user?.username || 'this user'}?`}
            open={isVisible}
            onOk={handleDelete}
            confirmLoading={loading}
            onCancel={() => setIsDeleteModuleOpen(false)}
            onText="Delete"
            okButtonProps={{ danger: true }}
            destroyOnClose={true}
            top-centered>
                <p>This action cannot be undone.</p>
        </Modal>
    )
})

export default DeleteUser