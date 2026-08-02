import "../index.css"
import ProfileHeader from "../components/ProfileHeader"
import SideNav from "../components/SideNav"
import MainContent from "../components/MainContent"

const HomePage = () => {
  return (
    <div className="main-container">
        <ProfileHeader />
        <MainContent />
    </div>
  )
}

export default HomePage