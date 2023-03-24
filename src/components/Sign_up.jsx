import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// This component is responsible for rendering a sign up form
const Sign_up = (props) => {
  // State for storing form input values
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    // Check if user is already logged in
    useEffect(() => {
      if (localStorage.getItem("x-auth-token")) {
        // If user is logged in, redirect to home page after a delay of 1 second
        setTimeout(() => {
          navigate("/dasboard");
        }, 1000);
      } else {
        // If user is not logged in, navigate to login or signup page
        navigate("/signUp");
      }
      // eslint-disable-next-line
    }, []);

  // Get the navigate function from the React Router hook
  let navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    // Validate the password and conform password fields
    if (credentials.confirmPassword !== credentials.password) {
      props.showAlert("Conform password and password dosen't match", "red");
      alert("Conform password and password dosen't match");
    } else {
      // Make an API request to register the user
      const response = await fetch(`${props.host}api/auth_user/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        // If registration was successful, save the auth token and redirect to home page
        localStorage.setItem("x-auth-token", json.authtoken);
        props.showAlert("Your account has created successfully", "green");
        setCredentials({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          navigate("/dasboard");
        }, 1000);
      } else {
        // If there was an error with registration, display an error message
        props.showAlert("Invalid Credentials", "red");
      }
    }
  };

  // Handle form input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Render the sign up form
  return (
    <>
      <section className="min-h-screen my-2 py-5 bg-gray-100 flex justify-center items-center">
        <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden md:max-w-xl">
          <div className="md:flex  md:items-center md:justify-center">
            <div>
              <img
                class="h-full w-full p-2 object-cover md:w-48 md:h-32"
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                alt="sign_up"
              />
            </div>
            <div className="p-8">
              <div className="text-center">
                <h1 className="font-bold text-4xl mb-5">Sign up</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={onChange}
                    required
                    minlength="5"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email Id
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={onChange}
                    required
                    minlength="5"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  />
                  <p className="mt-2 text-gray-500 text-xs italic">
                    We'll never share your email with anyone else.
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={onChange}
                    required
                    minlength="5"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  />
                </div>

                <div class="mb-6">
                  <label
                    for="confirmPassword"
                    class="block text-gray-700 font-bold mb-2"
                  >
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={onChange}
                    required
                    minlength="5"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                </div>
              </form>

              <hr className="my-6 border-gray-300 w-full" />

              <p className="mt-3 mb-0 text-center text-gray-500">
                Have already an account?{" "}
                <Link to="/login" className="font-bold text-indigo-500">
                  <u>Login here</u>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sign_up;
