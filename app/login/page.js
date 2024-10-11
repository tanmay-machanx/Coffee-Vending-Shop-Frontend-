'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { userAgent } from "next/server";
export default function Login() {
    const router = useRouter();
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [Message, SetMessage] = useState("");
    const [EmailMessage, SetEmailMessage] = useState(false);
    const [PasswordMessage, SetPasswordMessage] = useState(false);
    const [Loading, SetLoading] = useState(false);

    useEffect(() => {
        SetEmail("");
        SetPassword("");
        SetEmailMessage(false);
        SetPasswordMessage(false);
    }, []);

    async function HandleSubmit(e) {
        e.preventDefault();

        // Basic validation
        if (Email === "") {
            SetEmailMessage(true);
        } else {
            SetEmailMessage(false);
        }

        if (Password === "") {
            SetPasswordMessage(true);
        } else {
            SetPasswordMessage(false);
        }

        if (Email === "" || Password === "") {
            return;
        }

        SetLoading(true);

        try {
            const response = await axios.post("http://localhost:8082/auth/login", {
                username: Email,
                password: Password,
            });
            console.log(response);
            if (response.status === 200) {
                SetMessage(`Welcome, ${Email}`);
                Cookies.set("jwt", response.data);
                router.push("/");
            }
        } catch (e) {
            if (e.response && e.response.status === 401) {
                SetMessage("Unauthorized User, Please Enter Correct Email and Password");
            } else {
                SetMessage("Something went wrong. Please try again.");
            }
        } finally {
            SetLoading(false);
        }
    }

    return (
        <div className="w-5/12 mx-auto my-20">
            <h1 className="text-center font-bold text-2xl my-8">Login Page</h1>
            {Message && (
                <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-300 dark:text-black mb-12" role="alert">
                    <span className="font-medium">Info alert!</span> {Message}
                </div>
            )}
            <form className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${Loading ? "opacity-70" : null}`} onSubmit={HandleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                        Email
                    </label>
                    <input
                        onChange={e => SetEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Email"
                        type="text"
                        placeholder="Email"
                        value={Email}
                    />
                    {EmailMessage && <p className="text-red-500 text-xs italic">Please Enter Your Email.</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        onChange={e => SetPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={Password}
                    />
                    {PasswordMessage && <p className="text-red-500 text-xs italic">Please Enter Your Password.</p>}
                </div>
                <div className="flex hover:opacity-80">
                    <button
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        disabled={Loading}
                    >
                        {Loading ? "Signing In..." : "Sign In"}
                    </button>
                </div>
                <div className="mx-auto text-center my-8">Don't have an Account ? <Link href="/signup" className="text-blue-500 text-center">SignUp</Link></div>
            </form>
        </div>
    );
}
