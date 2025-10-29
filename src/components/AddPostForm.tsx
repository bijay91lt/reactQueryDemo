import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewPost } from '../types';
import type { Post } from '../types';

const createPost = async (newPost: NewPost): Promise<Post> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}, 
        body: JSON.stringify(newPost),
    })
    return res.json()
}

export default function AddPostForm() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createPost,
        onMutate: async(newPost) => {

            await queryClient.cancelQueries({ queryKey: ['posts']})

            const previousPosts = queryClient.getQueryData<Post[]>(['posts'])

            queryClient.setQueryData<Post[]>(['posts'], (old) => [
                ...(old || []),
                { id: Date.now(), ...newPost },
            ])

            return {previousPosts}
        },
        onError: (err, newPosts, context) => {
            console.log(err)
            console.log(newPosts)
            queryClient.setQueryData(['posts'], context?.previousPosts)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['posts']})
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const title = (form.elements.namedItem('title') as HTMLInputElement).value
        const body = (form.elements.namedItem('body') as HTMLTextAreaElement).value

        mutation.mutate({ title, body })
        form.reset()
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Title' required />
            <textarea name="body" id="" placeholder='Body' required></textarea>
            <button type='submit' disabled={mutation.isPending}>
                {mutation.isPending ? 'Adding...': 'Add Post'}
            </button>
            {mutation.isError && <p>Error: {(mutation.error as Error).message}</p>}
        </form>
    )
}