import React, { use } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

export default function LoginPage() {
  const {logIn, setUser} = use(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e)=> {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password).then(res => {
      console.log(res.user)
      setUser(res.user)
      navigate(`${location?.state ? location.state : '/'}`)
    }).catch(err => {
      console.log(err)
    })
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md border border-white text-white border-opacity-30">

        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name='email'
            placeholder="Username or Email"
            className="w-full border-b focus:outline-none py-2"
          />
          <input
            type="password"
            name='password'
            placeholder="Password"
            className="w-full border-b focus:outline-none py-2"
          />

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#" className="text-orange-500 hover:underline">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to='/auth/register' className="text-orange-500 font-medium">
            Create an account
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100">
          <FaGithub  size={24}/>
            Continue with Github
          </button>
          <button className="w-full flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-100">
          <FaGoogle size={24}/>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
