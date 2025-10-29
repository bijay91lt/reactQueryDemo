import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types";

const fetchPage = async (page: number): Promise<Post[]> => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
    )
    if(!res.ok) throw new Error('Failed to fetch page')
    return res.json()
}

export default function PasignatedPosts() {
    const [page, setPage] = useState(1)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => fetchPage(page),
    })

    if(isLoading) return <div>Loading page {page}...</div>
    if(isError) return <div>Error: {(error as Error).message}</div>

    return (
        <div>
            <h2>Pasignated Posts (Page {page})</h2>
            {data?.map((post) => (
                <div key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.body}</p>
                </div>
            ))}

            <div>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled= {page === 1}>
                    Prev 
                </button>

                <span>Page</span>
                <button onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
        </div>
    )
}