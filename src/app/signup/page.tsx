"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signup(e:any) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", userData);
      console.log("Response is :-", res);
      toast.success("Signup successfull");
      router.push("/verifyemail");
    } catch (error) {
      console.log("SignUp Failed");
      toast.error("Signup Failed");
    }finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    if (
      userData.email.length > 0 &&
      userData.password.length > 0 &&
      userData.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [userData]);

  return (
    <div className="flex items-center min-h-screen justify-center">
      <div>
        <h1 className="text-center text-4xl mb-2">{loading ? "Processing" : "Sign Up -"}</h1>
        <form className="flex flex-col w-50% justify-between" >
          <label htmlFor="username">Username:
            <input  className="p-2 border-2 border-black rounded-lg mx-2"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              type="text"
              name="username"
              id="username"
              value={userData.username}
            />
          </label>
          <label htmlFor="email">Email:
            <input className="p-2 border-2 border-black rounded-lg mx-2"
            onChange={(e)=>{
                setUserData((prev)=>({
                    ...prev,email:e.target.value,
                }))
            }}
              type="email"
              name="email"
              id="email"
              value={userData.email}
            />
          </label>
          <label htmlFor="password">Password:
            <input className="p-2 border-2 border-black rounded-lg mx-2"
            onChange={(e)=>{
                setUserData((prev)=>({
                    ...prev,password:e.target.value
                }))
            }}
              type="password"
              name="password"
              id="password"
              value={userData.password}
            />
          </label>
          <button onClick={signup} type="submit" className="bg-gray-400 px-3 pt-2 rounded-xl flex items-center justify-center text-white">{buttonDisabled?"Fill Form Completely":"Submit"}</button>
        </form>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </div>
  );
}

export default SignupPage;
