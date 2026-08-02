import { Typography } from 'antd';
import '../index.css';

const { Title } = Typography;

const ProfileHeader = () => {
  return (
    <header className="profile-header">
      <Title level={5} style={{ color: 'white', margin: 0 }}>
        PAM - MS4M
      </Title>
    </header>
  );
};

export default ProfileHeader;