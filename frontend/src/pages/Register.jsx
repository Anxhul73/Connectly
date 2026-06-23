import { useState } from 'react';
import api from '../services/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const handleRegister = async () => {

        setError("")

        if( !username || !email || !password ) {
            setError(" All fields are required! ")
            return;
        }

        if (username.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            const res = await api.post(
                "/auth/register",
                {
                    username,
                    email,
                    password
                }
            )

            localStorage.setItem(
                "token",
                res.data.token
            )

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            )

            navigate("/feed");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            )
            
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className= "min-h-screen flex items-center justify-center">
            <div className = "w-96 bg-slate-800 p-8 rounded-2xl flex flex-col gap-4 shadow-md " >

                <h1 className=" uppercase text-3xl font-bold text-white mb-6" >
                    Create an Account
                </h1>

                { error && (
                    <p className="text-red-400 text-sm">
                        {error}
                    </p>
                )}
                
                <input 
                type="text"
                placeholder= "Username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-700
                    text-white 
                    placeholder:text-slate-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-purple-600
                    hover:bg-purple-400
                    transition-all
                    duration-300
                "
                />

                <input 
                type="email"
                placeholder= "Email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-700
                    text-white 
                    placeholder:text-slate-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-purple-600
                    hover:bg-purple-400
                    transition-all
                    duration-300
                "
                />
                <input 
                type="password"
                placeholder= "Password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                    w-full
                    p-3
                    rounded-lg
                    bg-slate-700
                    text-white 
                    placeholder:text-slate-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-purple-600
                    hover:bg-purple-400
                    transition-all
                    duration-300
                "
                />
                
                <button 
                    onClick={handleRegister}
                    disabled= {loading}
                    className="
                    w-full
                    p-3
                    rounded-lg
                    bg-purple-600
                    text-white
                    hover:bg-purple-400
                    transition-all
                    duration-300
                    cursor-pointer
                "
                 >
                    {loading ? "Creating Account..." : "Register"}
                </button>
            </div>
        </div>
    )

}

export default Register;