import { signIn } from "next-auth/react";
import SingleInput from "../components/SingleInput";
import {
  IconFacebookColored,
  IconGoogleColored,
  IconMail,
  IconUser,
} from "../assets/icons";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/router";

function SignIn() {
  const router = useRouter();
  const {
    error_msg,
    errorMsgHandler,
    formInputs,
    signUp,
    toggleSignUp,
    signUpProcessing,
    signUpSuccessHandler,
    signUpFailHandler,
    isLoading,
    signInProcessing,
    signInSuccessHandler,
    signInFailHandler,
  } = useGlobalContext();

  // FORM SUBMIT HANDLER - LOGIN / SIGNUP
  async function submitHandler(e) {
    e.preventDefault();

    const { username, email, email_username, password, matching_password } =
      formInputs;

    // SIGN UP
    if (signUp) {
      // validating inputs
      if (!username || !email || !password || !matching_password) {
        errorMsgHandler("Provide all inputs");
        return;
      }

      if (username.includes(" ") || email.includes(" ")) {
        errorMsgHandler("Space is not allowed in username / email");
        return;
      }

      if (!email.includes("@")) {
        errorMsgHandler("Invalid email address");
        return;
      }

      if (password !== matching_password) {
        errorMsgHandler("Password not matching");
        return;
      }

      if (password.length < 7 || matching_password.length < 7) {
        errorMsgHandler("Password can not be less than 7 characters");
        return;
      }

      // if all inputs are valid, start signing up
      signUpProcessing();

      // send data to api
      try {
        const resp = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            matching_password,
          }),
          header: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();
        // if error in response
        if (!resp.ok) {
          throw new Error(data.msg || "Your account could not be created!");
        }

        // if successful
        signUpSuccessHandler(data);
      } catch (error) {
        // if error happened
        console.log(error);
        signUpFailHandler(error.message);
      }
    } else {
      // SIGN IN
      // validating inputs
      if (!email_username || !password) {
        errorMsgHandler("Provide all inputs");
        return;
      }

      if (email_username.includes(" ")) {
        errorMsgHandler("Space is not allowed in username / email");
        return;
      }

      // if all inputs are valid, start signing in
      signInProcessing();
      try {
        const resp = await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          email_username,
          password,
        });
        if (!resp.ok) {
          throw new Error(resp.error);
        }
        // if sign in is successful
        router.push("/");
        signInSuccessHandler();
      } catch (error) {
        console.log(error);
        signInFailHandler(error.message);
      }
    }
  }

  return (
    // grid container
    <main className="grid h-screen place-items-center bg-gray-50  font-manrope text-secondary sm:grid-rows-[1fr_auto] sm:justify-items-stretch">
      {/* Login section */}
      <section className="w-[90%] xs:px-6 sm:grid sm:w-auto sm:place-items-center">
        {/* global container */}
        <div className="relative rounded-2xl bg-white px-5 py-10 shadow-md duration-300 hover:shadow-lg xs:px-10 xs:pb-20 xs:pt-16">
          {/* top icon container */}
          <div className="absolute left-1/2 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/10 p-2 text-2xl text-primary/70 xs:p-4 xs:text-4xl">
            <IconUser />
          </div>

          {/* CONTENT */}
          <h3 className="mb-9 text-center text-2xl font-extrabold text-gray-800">
            {signUp ? "Create Account" : "Sign In"}
          </h3>

          {/* form */}
          <form className="mb-5">
            {signUp ? (
              <SingleInput
                placeholder="Username"
                icon={<IconUser />}
                name="username"
              />
            ) : (
              ""
            )}
            <SingleInput
              placeholder={signUp ? "Email" : "Email / Username"}
              type={signUp ? "email" : "text"}
              icon={<IconMail />}
              name={signUp ? "email" : "email_username"}
            />
            <SingleInput
              placeholder="Password"
              type="password"
              name="password"
            />
            {signUp ? (
              <SingleInput
                placeholder="Confirm password"
                type="password"
                name="matching_password"
              />
            ) : (
              ""
            )}

            {/* error message */}
            <small className="-mt-4 block font-semibold text-red-500">
              {error_msg}
            </small>

            {/* submit button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-sm bg-primary px-6 py-2 text-lg font-bold text-white duration-300 hover:bg-primary/80 disabled:cursor-not-allowed sm:text-xl"
              onClick={submitHandler}
              disabled={isLoading ? true : false}
            >
              {signUp ? "Sign up" : "Sign In"}
            </button>

            {/* toggle sign in & sign up */}
            <p className="mt-2 text-center text-sm text-gray-500">
              {signUp ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                className="font-bold text-primary"
                onClick={toggleSignUp}
              >
                {signUp ? "Sign In" : "Create account"}
              </button>
            </p>
          </form>

          {/* OR */}
          <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="border border-gray-200"></div>
            <p className="text-lg font-bold text-gray-600 sm:text-xl">OR</p>
            <div className="border border-gray-200"></div>
          </div>

          {/* button flex container */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-lg border p-2  duration-300 hover:bg-primary hover:text-white xs:p-3">
              <IconGoogleColored className="text-4xl" /> Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border p-3 duration-300 hover:bg-primary/80 hover:text-white">
              <IconFacebookColored className="text-3xl" /> Sign in with Facebook
            </button>
          </div>
        </div>
      </section>
      {/* Bottom bar */}
      <section className="hidden h-10 bg-primary sm:block"></section>
    </main>
  );
}

export default SignIn;
