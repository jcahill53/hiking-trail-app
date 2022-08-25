import React from 'react';

import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/LoginForm';
import Register from './components/Register';
import SearchTrails from './components/SearchTrails';
import TrailResults from './components/TrailResults';
import TrailDetails from './components/TrailDetails';
import CreateMessage from './components/CreateMessage';



function App() {



  const Home = () => {

    return (
      <>
        <NavBar />
        <main>

          <section className="welcome full-height">
            <div>
              <h1 className="">Welcome</h1>
            </div>
            <div className="row">
              <Link to={`/register`}><button className="btn-standard" >Register</button></Link>
              <Link to={`/login`}><button className="btn-standard" >Login</button></Link>
            </div>
          </section>
        </main>
      </>
    )
  };

  const LoginForm = () => {

    return (
      <>
        <NavBar />
        <main>
          <div >
            <Login

            />
          </div>
        </main>
      </>
    );
  }

  const RegistrationForm = () => {

    return (
      <>
        <NavBar />
        <main>
          <div >
            <Register
            />
          </div>
        </main>
      </>
    );
  }

  const SearchTrailsPage = () => {

    return (
      <>
        <NavBar />

        <main>
          <div >
            <SearchTrails
            />
          </div>
        </main>
      </>
    );
  }

  const TrailResultsPage = () => {
    const { name } = useParams();
    return (
      <>
        <NavBar />
        <main>
          <div >
            <TrailResults
              name={name}
            />
          </div>
        </main>
      </>
    );
  }

  const TrailDetailsPage = () => {
    const { id } = useParams();
    return (
      <>
        <NavBar />
        <main>
          <div >
            <TrailDetails
              id={id}
            />
          </div>
        </main>
      </>
    );
  }

  const CreateMessagePage = () => {
    const { id } = useParams();
    return (
      <>
        <NavBar />
        <main>
          <div >
            <CreateMessage
              id={id}
            />
          </div>
        </main>
      </>
    );
  }

  return (

    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/register"
          element={<RegistrationForm />}
        />
        <Route
          path="/hikingtrails"
          element={<SearchTrailsPage />}
        />
        <Route
          path="/hikingtrails/name/:name "
          element={<TrailResultsPage />}
        />
        <Route
          path="/hikingtrails/:id"
          element={<TrailDetailsPage />}
        />
        <Route
          path="/hikingtrails/:id/comments"
          element={<CreateMessagePage />}
        />
      </Routes>

    </div>
  );

}

export default App;