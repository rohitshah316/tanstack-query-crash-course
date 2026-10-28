import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { fetchPost } from './api/posts';

const App = () => {
  const [postId,setPostId]=useState(1);

  const {data,isPending,isError,error}=useQuery({
    queryKey:['post',postId],
    queryFn:()=>fetchPost(postId)
  })


  if (isPending) {
    return <p>Loading post...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }
  return (
    <main>
      <h1>Post Details</h1>

      <p>
        <strong>Post ID:</strong> {postId}
      </p>

      <button
        onClick={() => setPostId((id) => id - 1)}
        disabled={postId <= 1}
      >
        Previous
      </button>

      <button
        onClick={() => setPostId((id) => id + 1)}
      >
        Next
      </button>

      <article>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </article>
    </main>
  )
}

export default App