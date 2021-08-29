import React from 'react'
import Link from 'next/link'

function Post({ users }) {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className="grid">
          {users.map((user) => (
            <Link href={`/csr/users/${user.id}`} key={user.id}>
              <a className="card">
                <h2>{user.name}</h2>
                <p>{user.phone}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  if (!users) {
    return {
      notFound: true,
    }
  }

  return {
    props: { users },
    revalidate: 3,
  }
}

export default Post
