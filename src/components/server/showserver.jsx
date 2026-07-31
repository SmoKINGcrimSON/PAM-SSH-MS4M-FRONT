import { Flex, Typography } from "antd"
import { Modal } from "antd"

const { Text, Title } = Typography

const ShowServer = ({server, isVisible, setIsShowModuleOpen}) => {
    return(
        <Modal
        title={
            <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
                Server Details
            </Title>
        }
        open={isVisible}
        onCancel={() => setIsShowModuleOpen(false)}
        footer={null}
        >
            <Flex vertical gap="middle" style={{ marginTop: '24px' }}>
                <Flex justify="space-between" align="center" width="100%">
                    <Text strong>Hostname:</Text>
                    <Text>{server.hostname.toUpperCase()}</Text>
                </Flex>
                <Flex justify="space-between" align="center" width="100%">
                    <Text strong>IP Address:</Text>
                    <Text>{server.ip_address}</Text>
                </Flex>
                <Flex justify="space-between" align="center" width="100%">
                    <Text strong>Port:</Text>
                    <Text>{server.ssh_port}</Text>
                </Flex>
                <Flex justify="space-between" align="center" width="100%">
                    <Text strong>Mine:</Text>
                    <Text>{server.mine_name.toUpperCase()}</Text>
                </Flex>
            </Flex>
        </Modal>
    )
}

export default ShowServer