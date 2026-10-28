import React from 'react'

const App = () => {
  return (
    <main>
      <h1>TanStack Query Crash Course</h1>
      <h2>01: Setup and Fundamentals</h2>

      <p>React is running, and TanStack Query is configured.</p>

      <p>Next up: etching posts from an API.</p>
    </main>
  )
}

export default App




//queryclient: a central object that manages query cache and query-related operations for your application
// It helps manage:
// Caching — stores query results so they can be reused.
// Query management — keeps track of queries and their state.
// Invalidation — marks cached data as stale when it needs refreshing.
// Refetching — fetches data again when appropriate.


//devtools: is a debugging panel that helps you see what tanstack query is doing inside application