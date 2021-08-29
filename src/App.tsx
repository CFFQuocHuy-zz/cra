import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="container">
        <main className="main">
          <h1 className="title">
            Welcome to <a href="https://reactjs.org">React.js!</a>
          </h1>

          <div className="grid">
            <Link to="/" className="card">
              <h2>Home &rarr;</h2>
            </Link>
            <Link to="/users" className="card">
              <h2>Users &rarr;</h2>
            </Link>
          </div>
        </main>

        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/user/:uid">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

interface IUser {
  id: number;
  name: string;
  phone: string;
}

function Users() {
  const [users, setUsers] = useState<Array<IUser>>();

  const handleFetchUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const usersFet = await res.json();
      setUsers(usersFet);
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid">
      {users?.map((user) => (
        <Link to={`/user/${user.id}`} key={user.id} className="card">
          <h2>{user.name}</h2>
          <p>{user.phone}</p>
        </Link>
      ))}
    </div>
  );
}

interface IUserParams {
  uid: string | undefined;
}

function User() {
  const { uid } = useParams<IUserParams>();
  const [user, setUsers] = useState<IUser>();

  const handleFetchUser = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${uid}`
      );
      const userFet = await res.json();

      setUsers(userFet);
    } catch (err) {
      console.error({ err });
    }
  };

  useEffect(() => {
    handleFetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h2>{user?.name}</h2>
        <p>{user?.phone}</p>
      </div>
    </div>
  );
}
