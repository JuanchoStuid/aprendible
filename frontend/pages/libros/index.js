import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    // const set = new Set(res);
    
    const data = await res.json()
    console.log(data);

    // const result = Array.from(set).map(element => element + 1);

    return {
        props: {
            books: data.data
        }
    }
}

const BookList = ({ books }) => {
    async function handleDelete(event, bookId) {
        event.preventDefault()

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })

        if(res.ok) {
            window.location.href = '/libros'
        }
            const data = await res.json()
            setErrors(data.errors)
            setSubmitting(false)
    }

    return (
        <div>
            <pre>{JSON.stringify(books)}</pre>
            <h1>Libros</h1>
            <ul>
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link href={`/libros/${book.id}`}>
                            {book.title}
                        </Link>
                        {' - '}
                        <Link href={`/libros/${book.id}/editar`}>
                            Editar
                        </Link>
                        {' - '}
                        <form
                            onSubmit={(e) => handleDelete(e, book.id)}
                            style={{display: 'inline'}}
                        >
                            <button>Eliminar</button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear">Crear Libro</Link>
            <p></p>
        </div>
    );
};

export default BookList;