import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../apis/user';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!city) newErrors.city = 'City is required';
        if (!state) newErrors.state = 'State is required';
        if (!phone) newErrors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number is invalid';
        if (!countryCode) newErrors.countryCode = 'Country Code is required';
        return newErrors;
    };


    const registerUser = async (payload) => {
        try {
            const res = await register(payload)
            console.log(res.data)
            setMessage("User Registered!")
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setMessage('');
        } else {
            setErrors({});

            // setMessage('Signup successful.');
            const payload = {
                name: name,
                email: email,
                password: password,
                city: city,
                state: state,
                phone: phone,
                country_code: countryCode,
            }

            registerUser(payload)

            // Clear the form fields
            setName('');
            setEmail('');
            setPassword('');
            setCity('');
            setState('');
            setPhone('');
            setCountryCode('+91');

        }
    };

    return (
        <section className="w-full h-[80vh] grid place-items-center">
            <div className="w-full max-w-lg">
                {message && <p className="text-green-500 text-lg text-center italic">{message}</p>}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-medium text-black/65 mb-8">Signup</h2>
                    <div className="mb-4 flex gap-4 justify-around">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}

                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}

                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}

                    </div>
                    <div className="mb-4 flex gap-4 justify-around">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                City
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="city"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}

                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                                State
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="state"
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}

                        </div>
                    </div>

                    <div className="mb-4 flex gap-4 justify-around">
                        <div className=''>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country_code">
                                Country Code
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="country_code"
                                type="text"
                                placeholder="Country Code"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                disabled
                            />
                            {errors.countryCode && <p className="text-red-500 text-xs italic">{errors.countryCode}</p>}

                        </div>
                        <div className=''>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="text"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}

                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <p>Already have an account <Link to={"/login"} className='text-blue-500'>Login</Link></p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
