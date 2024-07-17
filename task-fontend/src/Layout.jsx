import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main className='mx-auto relative overflow-x-hidden'>
            <Header />
            <section className=" mx-auto">
                <Outlet />
            </section>
            {/* <Footer /> */}
        </main>
    )
}

export default Layout
