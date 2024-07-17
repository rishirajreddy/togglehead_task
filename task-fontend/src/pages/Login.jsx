/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../apis/user";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (payload) => {
        const res = await login(payload)
        console.log(res.data)
        if (res.data.user.role !== "authorized") {
            localStorage.setItem("adminToken", res.data.token)
            navigate("/admin/banner")
        } else {
            localStorage.setItem("user-token", res.data.token)
            localStorage.setItem("user-details", res.data.user)
        }
        setMessage("Logged in successfully!")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Please enter both username and password.');
        } else {
            setErrorMessage('');
            handleLogin({ email, password })

            console.log('Username:', email);
            console.log('Password:', password);
        }
    };

    return (
        <section className="w-full h-[80vh] grid place-items-center">
            <div className="w-full max-w-lg">
                {message && <p className="text-lg text-center text-green-500">{message}</p>}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-medium text-black/65 mb-8">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <p className="inline-block  text-sm" >
                            Don't have account <Link className="text-blue-500 hover:text-blue-800" to={"/signup"}>Signup</Link>                        </p>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </section>
    )
}

export default Login
