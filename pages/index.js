import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

function Home({ data }) {
  const { name } = data.user;
  // incase of signing in from other providers, pick out only the first name
  const displayName = name.split(" ")[0];

  return (
    <>
      <main className="grid min-h-screen min-w-full place-items-center px-6 lg:px-10">
        <div className="text-center">
          <h1 className="mb-10 text-4xl font-bold text-gray-800 lg:text-6xl">
            Welcome,{" "}
            <span className="capitalize text-primary">{displayName}</span>
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

export async function getServerSideProps({ req, res }) {
  const data = await getServerSession(req, res, authOptions);

  if (!data) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  // removing any user property that is undefined
  let newUser = {};
  for (const key in data.user) {
    if (data.user[key]) {
      newUser[key] = data.user[key];
    }
  }

  return {
    props: {
      data: { ...data, user: newUser },
    },
  };
}

export default Home;
