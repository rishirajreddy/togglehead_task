import { useEffect, useState } from "react";
import { createFaqs, getFaqs, updatedFaq } from "../apis/faq";

const CreateFAQs = () => {
    const [faqs, setFaqs] = useState("")
    const getAllFaqs = async () => {
        try {
            const res = await getFaqs();
            // console.log(res)
            setFaqs(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllFaqs()
    }, [])

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState()
    const [updateId, setUpdateId] = useState()
    const [showModal, setShowModel] = useState(false)
    const token = localStorage.getItem("adminToken")
    const createFaq = async (data) => {
        try {
            const res = await createFaqs(data, token)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const showModalhandle = (id) => {
        setShowModel(true)
        console.log(id)
        setUpdateId(id)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!question) newErrors.question = "Question is required";
        if (!answer) newErrors.answer = "Answer is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setMessage("FAQ created successfully");
            // Logic to handle FAQ submission
            createFaq({ question, answer })
            console.log({ question, answer });
            setQuestion('');
            setAnswer('');
        }
    };
    const handleUpdatedOrder = async () => {
        console.log("hit")
        try {
            console.log(updateId, order)
            const res = await updatedFaq(updateId, order, token)
            await getAllFaqs()
            setShowModel(false)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className="w-full grid place-items-center">
                <div className="w-full max-w-lg">
                    {message && <p className="text-green-500 text-lg text-center italic">{message}</p>}
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <h2 className="text-3xl font-medium text-black/65 mb-8">Create FAQ</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                                Question
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="question"
                                type="text"
                                placeholder="Question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                            {errors.question && <p className="text-red-500 text-xs italic">{errors.question}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                Answer
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="answer"
                                placeholder="Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            ></textarea>
                            {errors.answer && <p className="text-red-500 text-xs italic">{errors.answer}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create FAQ
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            <div className="relative mt-20 divide-y">
                <ul className="max-w-2xl overflow-hidden mx-auto  h-[400px]">
                    {faqs && faqs?.map((item) => {
                        return <li key={item?._id} className="flex items-center">
                            <span className="inline-flex">{item.order}</span>
                            <details className="group">
                                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                    <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                        </path>
                                    </svg>
                                    <span>{item?.question}</span>
                                </summary>

                                <article className="px-4 pb-4">
                                    <p>
                                        {item?.answer}
                                    </p>
                                </article>
                            </details>
                            <span onClick={() => showModalhandle(item._id)} className="inline-flex ml-auto cursor-pointer text-blue-500">Change Order</span>
                        </li>
                    })}
                </ul>
                {showModal && <div className="shadow p-4 absolute top-32 left-[50%] bg-white z-[9999] border">
                    <input type="text" onChange={(e) => setOrder(e.target.value)} name="order" id="" placeholder="adsf" className="border border-black/20 w-fit p-2 rounded" />
                    <button onClick={handleUpdatedOrder} className="bg-blue-500 text-white py-1 px-3 rounded">Update</button>
                </div>}
            </div>

        </>
    )
}

export default CreateFAQs