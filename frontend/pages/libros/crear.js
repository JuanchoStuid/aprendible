import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'

const BookCreate = () => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handelSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })

        if(res.ok) {
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
            const data = await res.json()
            setErrors(data.errors)
            setSubmitting(false)
        

    }

    return (
        <>
            <h1>BookCreate</h1>
            <form onSubmit={handelSubmit}>
                <input
                    onChange={(e) => setBookTitle(e.target.value)}
                    value={bookTitle}
                    disabled={submitting}
                    type="text"
                ></input>
                <button
                    disabled={submitting}
                >{submitting ? 'Enviando...' : 'Enviar'}</button>
                {errors.title && (
                    <span style={{color: 'red', display: 'block'}}>{errors.title}</span>
                )}
            </form>
            <br></br>
            <Link href="/libros">Book List</Link>

            {/* <p>{JSON.stringify(errors)}</p> */}
        </>
    )
}

export default BookCreate