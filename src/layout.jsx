import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './hooks/ScrollToTop'

function Layout() {
    return (
        <>
            <ScrollToTop/>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout