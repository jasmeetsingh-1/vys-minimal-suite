import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import heroImage from '@/assets/hero-cricket.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-foreground">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">VYS</h1>
          
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate('/auth')}>
                Login
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Premium Sports Equipment
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover our collection of professional-grade cricket bats and balls. 
                Crafted for performance, designed for champions.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="border-2 border-foreground overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Premium cricket equipment" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 border-t-2 border-foreground">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-12 text-center">Featured Products</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1 */}
            <div className="border-2 border-foreground p-6 flex flex-col gap-4">
              <div className="aspect-square bg-secondary flex items-center justify-center">
                <span className="text-4xl font-bold">BAT</span>
              </div>
              <h4 className="text-2xl font-bold">Professional Cricket Bat</h4>
              <p className="text-muted-foreground">
                Premium willow construction for maximum power and control
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold">$299</span>
                <Button>Add to Cart</Button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="border-2 border-foreground p-6 flex flex-col gap-4">
              <div className="aspect-square bg-secondary flex items-center justify-center">
                <span className="text-4xl font-bold">BALL</span>
              </div>
              <h4 className="text-2xl font-bold">Match Cricket Ball</h4>
              <p className="text-muted-foreground">
                Tournament-grade leather ball for professional play
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold">$49</span>
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 VYS Sports Equipment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
