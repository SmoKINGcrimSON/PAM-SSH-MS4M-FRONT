import {Modal, Typography, Flex} from 'antd'
const { Text, Title } = Typography

const ShowUser = ({user, isVisible, setIsShowMoreMenuOpen} ) => {
    return(
        <Modal
            title={
                <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
                    User Details
                </Title>
            }
            open={isVisible}
            onCancel={() => setIsShowMoreMenuOpen(false)}
            top-centered
            destroyOnClose={true}
            footer={null}
        >
            <Flex vertical gap="middle" style={{ marginTop: '24px' }}>
                <Flex justify="space-between" align="center">
                    <Text strong>Username:</Text>
                    <Text>{user?.username || 'N/A'}</Text>
                </Flex>

                <Flex justify="space-between" align="center">
                    <Text strong>User Type:</Text>
                    <Text>{user?.user_type || 'N/A'}</Text>
                </Flex>

                <Flex justify="space-between" align="center" gap="middle">
                    <Text strong style={{ flexShrink: 0 }}>Hash Password:</Text>
                    <Text 
                        style={{ maxWidth: '200px' }} 
                        ellipsis={{ tooltip: user?.hash_password }}
                        copyable={user?.hash_password ? { text: user.hash_password } : false}
                    >
                        {user?.hash_password || 'N/A'}
                    </Text>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default ShowUser