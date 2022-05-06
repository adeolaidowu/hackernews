import React, { useState } from "react";
import Router from "next/router";
import { useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "../constants/constants";
//import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      alert("login done");
      localStorage.setItem(AUTH_TOKEN, login.token);
      Router.push("/");
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      Router.push("/");
    },
  });

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-col">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            className="border-2"
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          className="border-2"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          className="border-2 ml-3"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="cursor-pointer mr-2 focus:outline-none text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-1 mr-2 mt-2"
          onClick={() => {
            console.log("try to login");
            debugger;
            formState.login ? login() : signup();
          }}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          className="cursor-pointer mr-2 focus:outline-none text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-1 mr-2 mt-2"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
