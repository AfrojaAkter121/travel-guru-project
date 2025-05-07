import React, { use, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const {signUp ,setUser} = use(AuthContext)
  const [error, setError] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    setError("");

    // Validation Rules
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    } else {
      setError(""); // Everything is valid
    }


    signUp(email, password).then(res => {
      updateProfile(auth.currentUser, {
        displayName : name,
        photoURL : photo
      })
      const user = res.user 
      setUser({...user,displayName : name,
        photoURL : photo })
    }).catch(err => {
      console.log(err)
    })

  };

  
  // signup with google
  const provider = new GoogleAuthProvider();
  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider).then((res) => {
      console.log(res.user);
    });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md border border-white text-white border-opacity-30">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create an account
          </h2>

          {/* name */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full border-b focus:outline-none py-2"
            />
            {/* photo  */}
            <input
              type="text"
              name="photo"
              required
              placeholder="photoURL"
              className="w-full border-b focus:outline-none py-2"
            />
            {/* email */}
            <input
              type="email"
              name="email"
              placeholder="Username or Email"
              required
              className="w-full border-b focus:outline-none py-2"
            />
            {/* password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border-b focus:outline-none py-2"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* submit btn */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded mt-4"
            >
              Create an account
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-orange-500 font-medium">
              Login
            </Link>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300 text-black"></div>
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* github signup */}
          <div className="space-y-3">
            <button
              className="w-full flex items-center justify-center gap-2 border rounded-full py-2 font-semibold hover:bg-gray-100 hover:text-black"
            >
              <FaGithub size={24} />
              Continue with Github
            </button>

            {/* google signup */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 border rounded-full py-2 font-semibold hover:bg-gray-100 hover:text-black"
            >
              <FaGoogle size={24} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;