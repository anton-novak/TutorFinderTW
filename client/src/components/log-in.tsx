import React, { ChangeEvent, useEffect, useState } from "react";
import fetchFunction from "../api-services";
import { useNavigate } from "react-router-dom";
import { User } from "../custom-types/types";
import { PORT } from "../env";

interface Props {
  toggleLoginModal(): void;
  toggleLogin(): void;
}

export default function LogInModal({ toggleLoginModal, toggleLogin }: Props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange (event: ChangeEvent<HTMLInputElement>, setter: (data: string) => void) {
    const target = event.target as HTMLInputElement;
    setter(target.value);
  }

  async function handleSubmit() {
    const credentials = {
      email: login,
      password: password
    };
      try {
      const sendLoginDetails = await fetchFunction(
        `http://localhost:${PORT}/login`,
        "POST",
        (parsedResponse: { userData: User, token: string }) => {
          parsedResponse.token ? sessionStorage.setItem('token', parsedResponse.token) : null;
          const userData = parsedResponse.userData;
          userData._id ? sessionStorage.setItem('id', userData._id) : null;
          sessionStorage.setItem('name', userData.name);
          sessionStorage.setItem('type', userData.type);
          sessionStorage.setItem('email', userData.email);
          sessionStorage.setItem('isComplete', userData.isComplete.toString());
          },
        credentials
      )
        .then(() => {
          toggleLoginModal();
          if (sessionStorage.getItem('isComplete') === 'true') {
            toggleLogin();
            if (sessionStorage.getItem('type') === 'tutor') {
              navigate('/messages');
            } else {
              navigate('/tutors');
            }
          } else if (sessionStorage.length > 0) {
            toggleLogin();
            sessionStorage.getItem('type') === 'tutor' ? navigate('/tutorDetailsForm') : null;
            sessionStorage.getItem('type') === 'student' ? navigate('/studentDetailsForm'): null;
          } else {
            window.alert('Login failed: invalid credentials');
            navigate('/');
          }
        })
        .catch((error) => {
          console.error(error);
          window.alert('Login failed');
        });
    } catch (error) {
      console.error(error);
      window.alert('Login failed');
    }
  }

  useEffect(() => {
    document.getElementById("closeLoginModal")?.addEventListener('click', () => {
      toggleLoginModal();
    })
  })
 
  return (
    <div id="loginModal" className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Log in</p>
          <button id="closeLoginModal" className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <form id="loginForm">
            <div className="field">
              <label className="label">E-mail</label>
              <div className="control">
                <input className="input" required type="text" placeholder="Your e-mail" 
                  onChange={(event) => handleChange(event, setLogin)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" required type="password" placeholder="Your password" 
                  onChange={(event) => handleChange(event, setPassword)} 
                  onKeyDown={(event) => { event.keyCode === 13 ? handleSubmit () : null }} />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button className="button is-success ml-3 mr-3" onClick={() => handleSubmit()}>
            Login
          </button>
        </footer>
      </div>
    </div>
  )
}