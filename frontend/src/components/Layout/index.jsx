import { Outlet } from "react-router-dom"
import Nav from "../Nav"
import Footer from "../Footer"

const Layout = () => {
  return (
    <>
    <main className="flex items-start gap-4 max-w-[100vw]">
      <Nav />
      <div className="w-[100%] flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </main>
      <Footer />
    </>
  )
}

export default Layout