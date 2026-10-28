
import { useState } from 'react'
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost } from './api/posts'

function App() {
  const queryClient = useQueryClient()

  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')


  const {
    data: posts,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const {
    mutate,
    isPending: isCreating,
    isSuccess,
    isError: isCreateError,
    error: createError,
    data: createdPost,
  } = useMutation({
    mutationFn: createPost,

    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey:['posts']
      })
    }
  })

  function handleSubmit(event) {
    event.preventDefault()

    mutate(
      {
        title,
        body,
        userId: 1,
      },
      {
        onSuccess: () => {
          setTitle('')
          setBody('')
        },
      }
    )
  }

  if (isPending) {
    return <p>Loading posts...</p>
  }

  if (isError) {
    return <p>Error loading posts: {error.message}</p>
  }

  return (
    <main>
      <h1>Posts</h1>

      <h2>Create a Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="body">Body</label>
          <br />
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {isCreateError && (
        <p>Error creating post: {createError.message}</p>
      )}

      {isSuccess && (
        <p>
          Created post successfully! Returned ID: {createdPost.id}
        </p>
      )}

      <hr />

      <h2>All Posts ({posts.length})</h2>

      {posts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr />
        </article>
      ))}
    </main>
  )
}

export default App
