kear;
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import './App.css';
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY;

const client = createClient(supabaseURL, supabaseAnonKey);

async function signInWithGoogle() {
  const { user, session, error } = await client.auth.signIn({
    provider: 'google',
  });
}

export async function signInWithGithub() {
  const { user, error, session } = await client.auth.signIn({
    provider: 'github',
  });
}

export async function signInWithGmailAndPassword() {
  const { user, session, error } = await client.auth.signUp(
    {
      email: 'yjejuvfqfvmiegilka@nthrw.com',
      password: 'example-password',
    },
    {
      data: {
        name: 'profile name',
        banner: 'url.com',
        bio: "I'm a bio",
      },
    }
  );
}

async function singInWithEmail() {
  const userAuth = await client.auth.signIn({
    email: 'yjejuvfqfvmiegilka@nthrw.com',
    password: 'example-password',
  });
  return userAuth;
}

export function getCurrentUser() {
  const user = client.auth.user();
  return user;
}

export async function getUser({ token }) {
  const user = await client.auth.api.getUser(token);
  return user;
}

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setUser(session);
    });
  }, []);
  return (
    <div className="App">
      <button
        onClick={() => {
          signInWithGoogle();
        }}>
        Sign in with Google
      </button>
      <button
        onClick={() => {
          signInWithGmailAndPassword();
        }}>
        Sign in with Gmail And Password
      </button>
      <button
        onClick={() => {
          singInWithEmail();
        }}>
        sign in
      </button>
    </div>
  );
}

export default App;
