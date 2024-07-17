
import { useEffect, useState } from 'react';
import { getFaqs } from '../apis/faq';
const FAQ = () => {
    const [faqs, setFaqs] = useState([])
    const getAllFaqs = async () => {
        try {
            const res = await getFaqs();
            
            setFaqs(res?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllFaqs()
    }, [])

    


    return (
        <>
            <ul className="max-w-2xl overflow-hidden mx-auto mt-20 divide-y h-[500px]">
                <h2 className="text-center font-medium mb-8"> Some Frequently Asked Question</h2>
                {faqs?.map((item) => {
                    return <li key={item?.id}>
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
                    </li>
                })}
            </ul>
        </>
    )

}

export default FAQ
