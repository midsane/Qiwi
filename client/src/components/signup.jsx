import { LoaderAtom, LoaderMsgAtom, ToastMsgAtom } from "@/atom/atom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export default function Signup() {
    const setToastMsg = useSetRecoilState(ToastMsgAtom)
    const setLoading = useSetRecoilState(LoaderAtom)
    const setLoaderMsg = useSetRecoilState(LoaderMsgAtom)
    const navigation = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        setLoading(true)
        setLoaderMsg("Registering User!")
        fetch(import.meta.env.VITE_BACKEND_URL+"newUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            setToastMsg("Signup successfull")
            setLoaderMsg("")
            setLoading(false)
            navigation("../auth/login")
        })
        .catch(error => {
            setToastMsg("Signup failed")
        });
        setLoaderMsg("")
        setLoading(false)
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen ">

            <main className="container mx-auto mt-16 max-w-md px-4">
                <div className="rounded-lg bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                   

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#0095ff] focus:outline-none focus:ring-1 focus:ring-[#0095ff]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#0095ff] focus:outline-none focus:ring-1 focus:ring-[#0095ff]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#0095ff] focus:outline-none focus:ring-1 focus:ring-[#0095ff]"
                            />
                        </div>

                      

                        <button
                            type="submit"
                            className="w-full rounded-md bg-[#0095ff] px-4 py-2 text-white hover:bg-[#0085ee] focus:outline-none focus:ring-2 focus:ring-[#0095ff] focus:ring-offset-2"
                        >
                            Create Account
                        </button>
                    </form>
                    <Link to={"../auth/login"}>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            {"Don't have an account?"}
                            <span className="text-orange-900" >login</span>
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
