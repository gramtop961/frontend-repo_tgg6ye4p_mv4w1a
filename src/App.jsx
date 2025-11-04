import { useState } from 'react';
import Hero from './components/Hero';
import BlogForm from './components/BlogForm';
import GeneratedPreview from './components/GeneratedPreview';
import RecentPosts from './components/RecentPosts';
import Footer from './components/Footer';

function App() {
  const [generated, setGenerated] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-sky-50">
      <Hero />
      <main className="px-6">
        <BlogForm onGenerated={setGenerated} />
        <GeneratedPreview post={generated} />
        <RecentPosts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
