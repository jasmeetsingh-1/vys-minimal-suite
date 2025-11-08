# VYS E-Commerce Project Context

## Design System
- **Theme**: Minimal black & white
- **Colors**: Solid colors only, no gradients
- **Buttons**: No border-radius, 3D hover effect (box-shadow animation)
- **Typography**: Clean, sans-serif fonts
- **Layout**: Flexbox-based, minimal wrapper divs

## Design Tokens (index.css)
- Primary: Black (0 0% 0%)
- Background: White (0 0% 100%)
- Border: No radius (--radius: 0rem)
- Button shadows: --button-shadow and --button-shadow-hover
- Transition: --transition-smooth (0.2s cubic-bezier)

## Components Structure

### Authentication (/auth route)
- **LoginSignUpPage**: Parent component managing state
- **Login**: Email, password (show/hide), login button, switch to signup, reset password placeholder
- **SignUp**: Name, email, password (show/hide), confirm password, signup button, switch to login

### Reusable Components
- **Button**: 3D hover effect with .btn-3d class, variants: default, outline, secondary, ghost, link
- **Input**: No border-radius, 2px border, focus state changes border color

## API Integration
- Base URL: http://localhost:9944
- Signup: POST /vys/auth/new-signup
- Login: POST /vys/auth/login
- Error handling implemented with toast notifications

## Features Implemented
- Authentication flow with validation
- Email validation regex
- Password validation (min 6 characters)
- Password visibility toggle
- 3D button hover animations
- Responsive layout
- Hero section with cricket equipment
- Product preview cards

## Next Steps
- Product catalog pages
- Shopping cart functionality
- Product detail pages
- User profile/dashboard
