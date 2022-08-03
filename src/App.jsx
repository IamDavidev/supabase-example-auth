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
  console.log('🚀 ~ file: App.jsx ~ line 14 ~ signInWithGoogle ~ user', user);
  console.log(
    '🚀 ~ file: App.jsx ~ line 14 ~ signInWithGoogle ~ session',
    session
  );
  console.log('🚀 ~ file: App.jsx ~ line 14 ~ signInWithGoogle ~ error', error);
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
  console.log('🚀 ~ file: App.jsx ~ line 28 ~ App ~ user', user);

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
    </div>
  );
}

export default App;
