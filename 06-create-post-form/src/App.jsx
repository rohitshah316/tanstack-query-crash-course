
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createPost } from './api/posts'

function App() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: createPost,
    onSuccess:()=>{
      setTitle('')
      setBody('')
    }
  })

  function handleSubmit(event) {
    event.preventDefault()

    mutate({
      title,
      body,
      userId: 1,
    })
  }

  return (
    <main>
      <h1>Create a Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter post title"
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
            placeholder="Write your post"
            required
          />
        </div>

        <br />

        <button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {isPending && <p>Submitting post...</p>}

      {isError && <p>Error: {error.message}</p>}

      {isSuccess && (
        <section>
          <h2>Post created successfully!</h2>
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Body: {data.body}</p>
        </section>
      )}
    </main>
  )
}

export default App
