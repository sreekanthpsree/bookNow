import React, { Fragment, useContext, useEffect, useState } from 'react'
import LoginModal from '../modals/LoginModal';
import Link from 'next/link';
import { createUser, loginUser } from '@/api/api';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login, setAuthCookie } from '@/store/features/auth-slice';
import { toggleModal } from '@/store/features/modal-slice';
import { useAuthContext } from '@/store/context/AuthContextProvider';
import { getCookie } from 'cookies-next';
import { getUserCookies } from '@/helper/getCookies';

function LoginSignup() {
    const [user, setUser] = useState(false);
    const userCreateInitialData = {
        email: "",
        name: "",
        username: "",
        mobileNumber: "",
        password: ""
    }
    const [createUserData, setCreateUserData] = useState(userCreateInitialData)
    const [userCreated, setUserCreated] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [userData, setUserData] = useAuthContext()
    const dispatch = useDispatch()
    const handleFormChange = async (e) => {
        const { name, value } = e.target
        setCreateUserData({ ...createUserData, [name]: value })
        setFormErrors({
            ...formErrors,
            [name]: "",
        });
    }

    async function validateCreateForm(type) {
        const errors = []
        if (type === "create") {
            for (const key in createUserData) {
                if (createUserData[key].trim() === "" || createUserData[key] === undefined) {
                    errors[key] = "This field is required"
                }
            }
        } else {
            if (createUserData["email"].trim() === "") {
                errors["email"] = "Please enter a valid email to login"
            }
            if (createUserData["password"].trim() === "") {
                errors["password"] = "Please enter a password to login"
            }
        }

        setFormErrors(errors)
        if (errors.length > 0) {
            return true
        } else {
            return false
        }
    }
    async function handleCreateUser() {
        try {
            let hasError = await validateCreateForm("create");
            if (hasError) {
                return
            } else {
                const response = await createUser(createUserData);
                if (response.success === "1") {
                    setUser(false)
                    setCreateUserData(userCreateInitialData)
                    setUserCreated(true)
                } else {
                    setSubmitError(response.errorMessage);
                }
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    async function handleloginUser() {
        try {
            let hasError = await validateCreateForm("login");
            if (hasError) {
                return
            } else {
                const response = await loginUser(createUserData);
                if (response.success === 1) {
                    dispatch(login({ ...response.userDetails, token: response.token }))
                    dispatch(toggleModal({ isOpen: false }))
                    setCreateUserData(userCreateInitialData)
                    setSubmitError("")
                    await setUserData(getUserCookies("user"))
                } else {
                    console.log(response);
                    setSubmitError(response.message);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (userCreated) {
            setUserCreated(true);
            setTimeout(() => {
                setUserCreated(false);
            }, 3000);
        }
    }, [userCreated]);
    return (
        <Fragment>
            <LoginModal className="w-full">
                <div className="m-0 mb-4  flex flex-col gap-x-3 gap-y-4 sm:grid-cols-6">

                    {submitError &&
                        <div className="sm:col-span-4 ms-2">
                            <div className='text-red-600 font-semibold'>{submitError}!</div>
                        </div>}
                    {userCreated &&
                        <div className="sm:col-span-4 ms-2">
                            <div className='text-red-600'>Created a profile login to continue!</div>
                        </div>}
                    <div className="sm:col-span-4 w-100 ms-2">
                        <label
                            htmlFor="email"
                            className="w-full block text-md font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={createUserData.email}
                                onChange={handleFormChange}
                                autoComplete="email"
                                className="block w-75 flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Email"
                            />
                            {formErrors.email && <div className='text-red-600'>{formErrors.email}</div>
                            }
                        </div>
                    </div>
                    {user && (
                        <>
                            <div className="sm:col-span-4 ms-2">
                                <label
                                    htmlFor="name"
                                    className="w-full block text-md font-medium leading-6 text-gray-900"
                                >
                                    Name
                                </label>
                                <div>
                                    <input
                                        type="name"
                                        name="name"
                                        id="name"
                                        value={createUserData.name}
                                        onChange={handleFormChange}
                                        required
                                        autoComplete="name"
                                        className="block w-75 flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Name"
                                    />
                                    {formErrors.name && <div className='text-red-600'>{formErrors.name}</div>
                                    }
                                </div>
                            </div>
                            <div className="sm:col-span-4 ms-2">
                                <label
                                    htmlFor="email"
                                    className="w-full block text-md font-medium leading-6 text-gray-900"
                                >
                                    User Name
                                </label>
                                <div>
                                    <input
                                        type="username"
                                        name="username"
                                        id="username"
                                        value={createUserData.username}
                                        onChange={handleFormChange}
                                        required
                                        autoComplete="username"
                                        className="block w-75 flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="User Name"
                                    />
                                    {formErrors.username && <div className='text-red-600'>{formErrors.username}</div>}
                                </div>
                            </div>
                            <div className="sm:col-span-4 ms-2">
                                <label
                                    htmlFor="email"
                                    className="w-full block text-md font-medium leading-6 text-gray-900"
                                >
                                    Mobile Number
                                </label>
                                <div>
                                    <input
                                        type="mobileNumber"
                                        name="mobileNumber"
                                        value={createUserData.mobileNumber}
                                        id="mobileNumber"
                                        required
                                        onChange={handleFormChange}
                                        autoComplete="mobileNumber"
                                        className="block w-75 flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Mobile Number"
                                    />
                                    {formErrors.mobileNumber && <div className='text-red-600'>{formErrors.mobileNumber}</div>}

                                </div>
                            </div>
                        </>
                    )}

                    <div className="sm:col-span-4 ms-2">
                        <label
                            htmlFor="email"
                            className="w-full block text-md font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={createUserData.password}
                                required
                                onChange={handleFormChange}
                                autoComplete="password"
                                className="block w-75 flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Enter a valid password"
                            />
                            {formErrors.password && <div className='text-red-600'>{formErrors.password}</div>}
                        </div>

                        {!user ? (
                            <>
                                <span>
                                    <Link href={"#"}>Forgot password?</Link>
                                </span>
                                <span>
                                    <button
                                        onClick={() => {
                                            setUser(true);
                                        }}
                                        className="text-red-700"
                                    >
                                        New user? Sign up
                                    </button>
                                </span>
                            </>
                        ) : (
                            <span>
                                <button
                                    className="text-red-700"
                                    onClick={() => {
                                        setUser(false);
                                    }}
                                >
                                    Already have a account? Sign In
                                </button>
                            </span>
                        )}

                        {!user ? (
                            <div className="sm:col-span-4 mt-4">
                                <button
                                    type="submit"
                                    onClick={handleloginUser}
                                    className="bg-red-500 p-2 border-0 rounded-lg shadow-sm hover:bg-red-700 text-white"
                                >
                                    Login
                                </button>
                            </div>
                        ) : (
                            <div className="sm:col-span-4 mt-4">
                                <button onClick={handleCreateUser}
                                    type="submit"
                                    className="bg-red-500 p-2 border-0 rounded-lg shadow-sm hover:bg-red-700 text-white"
                                >
                                    Create a User
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </LoginModal>
        </Fragment>

    )
}

export default LoginSignup