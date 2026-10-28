
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from './api/posts'

async function searchPosts(searchTerm) {
  const posts = await fetchPosts()

  if (!searchTerm.trim()) {
    return posts
  }

  const search = searchTerm.toLowerCase()

  return posts.filter((post) => (
    post.title.toLowerCase().includes(search) ||
    post.body.toLowerCase().includes(search)
  ))
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts', searchTerm],
    queryFn: () => searchPosts(searchTerm),
  })

  if (isPending) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <main>
      <h1>Search Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <p>Matching posts: {data.length}</p>
      <p>Fetching: {String(isFetching)}</p>

      {data.length === 0 && <p>No posts found.</p>}

      {data.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <hr />
        </article>
      ))}
    </main>
  )
}

export default App
