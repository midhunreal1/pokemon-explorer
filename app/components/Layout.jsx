import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, title = 'Pokemon Explorer' }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Explore Pokemon with our web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <nav className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Pokemon Explorer
          </Link>
        </div>
      </nav>
      
      <main className="container mx-auto p-4">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Powered by PokeAPI</p>
      </footer>
    </div>
  );
}