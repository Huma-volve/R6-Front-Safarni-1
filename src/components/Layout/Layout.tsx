import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
  return<>
  <div className="min-h-screen flex flex-col w-full">

<Navbar user={{ name: 'Sarah', avatarUrl: 'https://i.pravatar.cc/40' }} />

    <div className="container mx-auto">
        <Outlet />
    </div>

</div>
  
  </>
}

export default Layout