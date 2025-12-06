import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-cricket.jpg';
import { HomePage } from '@/components/Home/HomePage';
import { Header } from '@/components/Header/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
              <div className="border border-foreground overflow-hidden float-effect">
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

      {/* Products Section */}
      <section className="border-t border-foreground">
        <HomePage />
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 VYS Sports Equipment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
