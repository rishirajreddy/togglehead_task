import { Link, Outlet } from "react-router-dom"

const AdminLayout = () => {
    console.log("sdfsd")
    return (

        <main className='mx-auto overflow-x-hidden w-full flex'>
            <div className=" h-screen w-56 px-4 pt-10 shadow">
                <div className="flex flex-col gap-4 text-lg">
                    <Link className="bg-blue-200 p-2 rounded" to={"/"}>Home</Link>
                    <Link className="bg-blue-200 p-2 rounded" to={"/banners"}>Banner</Link>
                </div>
            </div>
            <section className=" flex-auto">
                <Outlet />
            </section>
            {/* <Footer /> */}
        </main>

    )
}

export default AdminLayout
