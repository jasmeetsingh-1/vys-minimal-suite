import { Menu, Heart, ShoppingBag, User, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { authReducers } from '@/react-store/slicesReducers';
import store from '@/react-store/store.jsx';

interface RootState {
  cartItems: {
    items: Record<string, unknown>;
  };
  authData: {
    userId: string | null;
    name: string | null;
    email: string | null;
  };
}

const handleMenuClick = () => {
  // Dummy function - to be implemented
};

const handleSearchClick = () => {
  // Dummy function - to be implemented
};

const handleWishlistClick = () => {
  // Dummy function - to be implemented
};

export const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cartItems.items);
  const authData = useSelector((state: RootState) => state.authData);
  const cartCount = Object.keys(cartItems).length;
  const isAuthenticated = !!authData.userId || !!localStorage.getItem('userId');

  const handleUserClick = () => {
    if (isAuthenticated) {
      // Logout functionality
      localStorage.removeItem('userId');
      store.dispatch(authReducers.clearAuthData());
      navigate('/');
    } else {
      // Navigate to login
      navigate('/auth');
    }
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 py-4">
        <div className="flex items-center justify-between gap-8">
          <button className="md:hidden" onClick={handleMenuClick}>
            <Menu className="w-6 h-6" />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:opacity-70 transition-opacity">Home</Link>
            <Link to="/collections" className="text-foreground hover:opacity-70 transition-opacity">Collections</Link>
            <Link to="/new" className="text-foreground hover:opacity-70 transition-opacity">New</Link>
          </nav>

          {/* <Link to="/" className="text-2xl font-bold absolute left-1/2 -translate-x-1/2">▶</Link> */}

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hidden md:flex" onClick={handleSearchClick}>
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleWishlistClick}>
              <Heart className="w-5 h-5" />
            </Button>
            <Link to="/checkout">
              <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90 relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/checkout" className="text-sm font-medium hover:opacity-70">Cart</Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full w-10 h-10 bg-primary text-primary-foreground hover:bg-primary/90" 
              onClick={handleUserClick}
              title={isAuthenticated ? "Logout" : "Login"}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
