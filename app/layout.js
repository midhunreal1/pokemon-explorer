import './globals.css';

export const metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore information about your favorite Pokemon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-red-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <a href="/" className="text-2xl font-bold">
                Pokemon Explorer
              </a>
            </div>
          </nav>
          
          <main className="container mx-auto p-4">
            {children}
          </main>
          
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>Powered by PokeAPI</p>
          </footer>
        </div>
      </body>
    </html>
  );
}