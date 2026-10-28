import { useQuery } from '@tanstack/react-query';
import React from 'react'


async function fetchPost() {

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1'
  )

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }

  return response.json()
}

const App = () => {
const {
    data,
    isPending,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ['playground-post'],
    queryFn: fetchPost,
    retry: 0,
    staleTime: 10_000,
  })

  return (
    <main>
      <h1>Query States Playground</h1>

      <p>Pending: {String(isPending)}</p>
      <p>Fetching: {String(isFetching)}</p>
      <p>Error: {String(isError)}</p>
      <p>Success: {String(isSuccess)}</p>

      {isPending && <p>Loading post...</p>}

      {isError && <p>Error: {error.message}</p>}

      {isSuccess && (
        <article>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </article>
      )}

      <button onClick={() => refetch()}>
        Refetch Post
      </button>
    </main>
  )
}

export default App