import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

function Home() {
  const { data, status } = useSession();

  // if session is loading`
  if (status === "loading") {
    return (
      <main className="grid min-h-screen min-w-full place-items-center px-6 lg:px-10">
        <h3>Loading...</h3>
      </main>
    );
  }

  // if user is not logged in
  if (!data) {
    useRouter().replace("/sign-in");
    return;
  }

  const {
    user: { name },
  } = data;

  return (
    <>
      <main className="grid min-h-screen min-w-full place-items-center px-6 lg:px-10">
        <div className="text-center">
          <h1 className="mb-10 text-4xl font-bold text-gray-800 lg:text-6xl">
            Welcome, <span className="capitalize text-primary">{name}</span>{" "}
          </h1>
          <p className="mb-20 text-9xl">&#x1f60a;</p>
          <button
            className="rounded-lg bg-primary px-8 py-3 font-bold text-white duration-300 hover:bg-primary/80 lg:px-14 lg:text-xl"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </main>
    </>
  );
}

export default Home;
