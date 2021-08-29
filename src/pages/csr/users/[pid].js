import React from 'react'

function User({ user }) {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className="grid">
          <div className="card">
            <h2>{user.name}</h2>
            <p>{user.phone}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.pid}`
  )
  const user = await res.json()

  return { props: { user } }
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  const paths = users.map((user) => ({
    params: { pid: user.id + '' },
  }))

  return { paths, fallback: false }
}

export default User
