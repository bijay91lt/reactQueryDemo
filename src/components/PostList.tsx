import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types";

const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')

    if(!res.ok) throw new Error('Failed to fetch posts')
    
    return res.json()
}

export default function PostList(){
    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    if(isLoading) return <div>Loading Posts...</div>
    if(isError) return <div>Error: {(error as Error).message}</div>

    return (
        <ul>
            {data?.map(post => (
                <li key = {post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    )
}