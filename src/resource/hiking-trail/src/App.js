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
        <main className="">

          <section className="welcome">
            <div>
              <h2>App className</h2>
              <h1 className="">Welcome</h1>
              <h2>We're glad you're here!</h2>
              <h3>App Name is a real-time, online resource for hiking trails in</h3>
              <h3>Washington State.  App Name helps identify and combat</h3>
              <h3>congestion at our trails to help you optimize your hiking.</h3>

            </div>
            <div className="register">
              <p> You are also welcome to register for a free account</p>
              <div className="row">
                <Link to={`/register`}><button className="welcome-button">Register</button></Link>
                <Link to={`/login`}><button className="welcome-button">Login</button></Link>
              </div>
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