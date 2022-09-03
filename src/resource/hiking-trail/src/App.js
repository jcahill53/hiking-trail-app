import React from 'react';

import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SearchTrails from './components/SearchTrails';
import TrailResults from './components/TrailResults';
import TrailDetails from './components/TrailDetails';
import CreateMessage from './components/CreateMessage';
import Logout from './components/Logout';




function App() {


  const Home = () => {

    return (
      <div className="home">
        <NavBar />
        <main className="">

          <section className="welcome">
            <h2 className="app-name">ParkNHike </h2>
            <div className="wecome-background">
              <div className="welcome-text">
                <h1 >Welcome,</h1>
                <h2>We're glad you're here!</h2>
                <h3><span>ParkNHike</span> is a real-time, online resource for hiking trails in Oregon State.  ParkNHike helps identify and combat congestion at our trails to help you optimize your hiking.</h3>
              </div>
              <p className="welcome-text"> You are welcome to register for a free account</p>
            </div>
            <div className="welcome-register">
              <div className="row">
                <Link to={`/register`}><button className="welcome-button">Register</button></Link>
                <Link to={`/login`}><button className="welcome-button">Login</button></Link>
                <Link to={`/hikingtrails`}><button className="welcome-button">Trail Search</button></Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  };

  const LoginFormPage = () => {

    return (
      <>
        <NavBar />
        <main>
          <div >
            <LoginForm

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
            <RegisterForm
            />
          </div>
        </main>
      </>
    );
  }

  const LogoutPage = () => {

    return (
      <>
        <NavBar />
        <main>
          <div >
            <Logout
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
          element={<LoginFormPage />}
        />
        <Route
          path="/register"
          element={<RegistrationForm />}
        />
        <Route
          path="/logout"
          element={<LogoutPage />}
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
          path="/createmessage/:id"
          element={<CreateMessagePage />}
        />
      </Routes>

    </div>
  );

}

export default App;