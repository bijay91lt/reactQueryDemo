import type { User } from "../types"
import type { Post } from "../types"
import { useQuery } from "@tanstack/react-query"

const fetchUser = async (userId: number): Promise<User> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  return res.json()
}


function PostWithUser({ post }: { post: Post }) {
  const { data: user } = useQuery({
    queryKey: ['user', post.id], // 🔑 dependent key
    queryFn: () => fetchUser(post.id),
    enabled: !!post.id, // only run if userId exists
  })

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <small>By: {user?.name || 'Loading user...'}</small>
    </div>
  )
}

export default  PostWithUser;