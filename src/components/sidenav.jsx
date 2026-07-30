import '../index.css';
import logo from '../assets/ms4m-logo.png';

const SideNav = () => {
    return (
        <aside className="side-nav" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        }}>
            <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }}/>
        </aside>
    );
}

export default SideNav;