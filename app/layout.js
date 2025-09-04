import './globals.css';

export const metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore information about your favorite Pokemon',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <nav className="glass-effect p-4 shadow-lg border-b border-cyan-500/30">
            <div className="container mx-auto flex justify-between items-center">
              <a href="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
                Pokemon Explorer
              </a>
            </div>
          </nav>
          
          <main className="container mx-auto p-6">
            {children}
          </main>
          
          <footer className="glass-effect text-center p-6 mt-12 border-t border-cyan-500/30">
            <p className="neon-text-cyan text-sm">Powered by PokeAPI</p>
          </footer>
        </div>
      </body>
    </html>
  );
}