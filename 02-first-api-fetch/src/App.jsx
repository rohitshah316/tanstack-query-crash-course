import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchPosts } from './api/posts';

const App = () => {

  const {data,isPending,isError,error}=useQuery({
    queryKey:['posts'],
    queryFn:fetchPosts,
  })

  if(isPending){
    return <p>Loading posts...</p>
  }

  if(isError){
    return <p>Error: {error.message}</p>
  }
  return (
    <main>
      <h1>Posts</h1>

      {data.map((post)=>(
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