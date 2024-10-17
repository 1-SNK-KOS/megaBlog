import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authSliceLogin } from "../store/authSlice";
import { useState } from "react";
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        console.log("Login.js :: login method :: data :: ", data);
        setError('')

        try {
            const session = await authService.login(data)
            console.log("Login.js :: login method :: session :: ", session);
            if (session) {
                const userData = await authService.getCurrentUserStatus()
                console.log("Login.js :: login method ::  userData :: ", userData);
                if (userData) {
                    dispatch(authSliceLogin(userData))
                    navigate('/')
                }

            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email : '
                            placeholder="Enter your email ... "
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid Email Address"
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            placeholder='Enter your password ... '
                            type='password'
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="Submit"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )



}

export default Login