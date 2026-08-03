import "../index.css"
import MainContent from "../components/MainContent"
import HeaderNav from "../components/sidenav"

const HomePage = () => {
  return (
    <div className="main-container">
        <HeaderNav />
        <MainContent />
    </div>
  )
}

export default HomePage