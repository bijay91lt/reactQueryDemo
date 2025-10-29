import PostList from './components/PostList';
// import AddPostForm from './components/AddPostForm'
import PasignatedPosts from './components/PasignatedPosts'

export default function App() {
  return (
    <div>
      <h1>My Blog</h1>

      {/* Your original list */}
      <section>
        <h2>All Posts (Simple)</h2>
        <PostList />
      </section>

      <hr />

      {/* Paginated version — NEW */}
      <section>
        <h2>All Posts (Paginated)</h2>
        <PasignatedPosts />
      </section>
    </div>
  )
}