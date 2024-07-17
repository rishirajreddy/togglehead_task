import { useEffect, useState } from 'react';
import { createBanner, getBanners, updateBanner } from '../apis/banner';
import { baseUrlImage } from '../constant/contant';

const BannerUpload = () => {
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');
    const [message, setMessage] = useState('');
    const [banners, setBanners] = useState('')

    const getBannersApi = async () => {
        try {
            const res = await getBanners();
            console.log(res.data)
            setBanners(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handlUpload = async (formData) => {
        console.log(formData.get("title"))
        try {
            const token = localStorage.getItem("adminToken")
            console.log(token)
            const res = await createBanner(formData, token)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleRedirectUrlChange = (e) => {
        setRedirectUrl(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !imageFile || !description || !redirectUrl) {
            setMessage('Please fill out all fields.');
        } else {
            // Assuming validation passes, you can proceed with your upload logic
            setMessage('Banner uploaded successfully.');

            const formData = new FormData();

            formData.append('title', title);
            formData.append('image', imageFile);
            formData.append('description', description);
            formData.append('redirect_url', redirectUrl);

            console.log('FormData:', formData); // Check FormData before passing to handlUpload

            handlUpload(formData);
        }
    };

    useEffect(() => {
        getBannersApi()
    }, [])

    const [order, setOrder] = useState()
    const [updateId, setUpdateId] = useState()
    const [showModal, setShowModel] = useState(false)
    const token = localStorage.getItem("adminToken")
    const showModalhandle = (id) => {
        setShowModel(true)
        console.log(id)
        setUpdateId(id)

    }
    const handleUpdatedOrder = async () => {
        console.log("hit")
        try {
            console.log(updateId, order)
            const res = await updateBanner(updateId, order, token)
            await getBannersApi()
            setShowModel(false)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <section className="w-full h-[80vh] grid place-items-center">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-medium text-black/65 mb-8">Upload Banner</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                Image
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                placeholder="Description"
                                value={description}
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="redirect_url">
                                Redirect URL
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="redirect_url"
                                type="text"
                                placeholder="Redirect URL"
                                value={redirectUrl}
                                onChange={handleRedirectUrlChange}
                            />
                        </div>
                        {message && <p className="text-green-500 text-xs italic">{message}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <section className='relative'>
                {banners &&
                    <div className='flex flex-col gap-4 w-fit mx-auto'>
                        {banners?.map((item) => {
                            return <div key={item._id} className='flex gap-4 items-center'
                            >
                                <h2>{item?.order}</h2>
                                <img src={baseUrlImage + item?.image_url} alt="" className='w-32 h-16 object-cover' />
                                <h2>{item?.title}</h2>
                                <h2>{item?.description}</h2>
                                <button onClick={() => showModalhandle(item._id)} className='bg-blue-500 text-white py-1 px-3 rounded ml-auto'>Change Order</button>
                            </div>

                        })}
                    </div>

                }
                {showModal && <div className="shadow p-4 absolute top-32 left-[50%] bg-white z-[9999] border">
                    <input type="text" onChange={(e) => setOrder(e.target.value)} name="order" id="" placeholder="adsf" className="border border-black/20 w-fit p-2 rounded" />
                    <button onClick={handleUpdatedOrder} className="bg-blue-500 text-white py-1 px-3 rounded">Update</button>
                </div>}
            </section>
        </>

    );
};

export default BannerUpload;