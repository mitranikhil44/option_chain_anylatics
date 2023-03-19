import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // State to store user's login credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Get navigation object from react-router
  let navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("x-auth-token")) {
      // If user is logged in, redirect to home page after a delay of 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      // If user is not logged in, navigate to login or signup page
      navigate("/login" || "/signUp");
    }
    // eslint-disable-next-line
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login request to server
    const response = await fetch(`${props.host}api/auth_user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // Get response from server in JSON format
    const json = await response.json();

    if (json.success) {
      // If login is successful, save auth token in local storage
      localStorage.setItem("x-auth-token", json.authtoken);

      // Show success alert
      props.showAlert("You are successfully login your account", "green");

      // Clear the form fields
      setCredentials({ email: "", password: "" });

      // Redirect to home page after a delay of 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      // If login fails, show error alert
      props.showAlert("Invalid Details", "red");
    }
  };

  // Function to update state when form fields change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Render the login form
  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-center mb-8">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="h-16"
                alt="Logo"
              />
            </div>
            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
              Log In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-gray-800 font-semibold mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                  placeholder="you@example.com"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-800 font-semibold mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
                  placeholder="********"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-center mt-4">
              <span className="text-gray-700">Don't have an account?</span>
              <a
                className="text-blue-500 font-semibold hover:text-blue-600 transition duration-150 ease-in-out ml-1"
                href="/signUp"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
