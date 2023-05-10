"use client";
import { useEffect, useState } from "react";
import loginService from "@/services/authservice";
import Link from "next/link";
import { redirect } from "next/navigation";
import bg from "@/assets/bg1.jpg";
import Image from "next/image";

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          email
          <br />
          <input
            className="input input-bordered w-full max-w-xs"
            type="email"
            value={props.email}
            name="Email"
            onChange={props.handleEmailChange}
          />
        </div>
        <div>
          password
          <input
            className="input input-bordered w-full max-w-xs"
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <div className="grid place-items-center pt-4">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Home() {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedSolidarityUser");
    if (loggedUserJSON) {
      const userToken = JSON.parse(loggedUserJSON);
      redirect("/homepage");
    }
  }, [response]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", email, password);
    try {
      const loginResponse = await loginService.login({
        email,
        password,
      });

      window.localStorage.setItem(
        "loggedSolidarityUser",
        JSON.stringify(loginResponse)
      );
      setResponse(loginResponse);
      changeEmail("");
      changePassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    // <div className=" w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
    <>
      <Image
        className="object-center object-cover pointer-events-none"
        src={bg}
        fill
        alt={"background image not loaded"}
      />
      <div className="relative z-1 grid h-screen place-items-center">
        <h1 className="font-extrabold text-4xl">Phishing Website Detection</h1>
        <LoginForm
          email={email}
          password={password}
          handleEmailChange={({ target }) => changeEmail(target.value)}
          handlePasswordChange={({ target }) => changePassword(target.value)}
          handleSubmit={handleLogin}
        />
        <Link href={"/register"}>Not a user yet? Signup here</Link>
      </div>
    </>
  );
}
