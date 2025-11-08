# VYS E-Commerce Project Context

## Design System
- **Theme**: Minimal black & white
- **Colors**: Solid colors only, no gradients
- **Buttons**: No border-radius, 3D hover effect (box-shadow animation)
- **Typography**: Clean, sans-serif fonts
- **Layout**: Flexbox-based, minimal wrapper divs
- **Modals**: Use React Bootstrap Modal throughout the project

## Design Tokens (index.css)
- Primary: Black (0 0% 0%)
- Background: White (0 0% 100%)
- Border: No radius (--radius: 0rem)
- Button shadows: --button-shadow (2px) and --button-shadow-hover (3px)
- Floating shadows: --shadow-float, --shadow-float-hover, --shadow-subtle
- Transition: --transition-smooth (0.15s ease)

## Animation Classes
- `.btn-3d`: 3D button effect with box-shadow animation
- `.float-effect`: Floating effect with translateY on hover
- `.subtle-float`: Subtle box-shadow for depth

## Components Structure

### Authentication (/auth route)
- **LoginSignUpPage**: Parent component managing state
- **Login**: Email, password (show/hide), login button, switch to signup, reset password button
- **SignUp**: Name, email, password (show/hide), confirm password, signup button, switch to login

### Reset Password (/auth/resetPassword)
- **ResetModal**: Modal for checking email and initiating reset flow
  - Email field with validation
  - Check if user exists via API
  - Enable "Get Reset Link" if user found
  - Show error if user not found
- **ResetPage**: Page for resetting password with token
  - Reads email, userId, token from query params
  - New password and confirm password fields
  - Shows email (non-editable text)
  - Reset password button

### Reusable Components
- **Button**: 3D hover effect with .btn-3d class, variants: default, outline, secondary, ghost, link
- **Input**: No border-radius, 1px border, focus state changes border color
- **Modal**: React Bootstrap Modal for all modal implementations

## API Integration
- Base URL: http://localhost:9944
- Signup: POST /vys/auth/new-signup
- Login: POST /vys/auth/login
- Check Email: POST /vys/auth/check-email
- Reset Password: POST /vys/auth/reset-password
- Error handling implemented with toast notifications

## Features Implemented
- Authentication flow with validation
- Email validation regex
- Password validation (min 6 characters)
- Password visibility toggle
- Reset password flow (modal and page)
- 3D button hover animations
- Floating box-shadow effects
- Responsive layout
- Hero section with cricket equipment
- Product preview cards

## Development Guidelines
1. Keep code minimal and clean
2. Avoid unnecessary wrapper divs
3. Use flexbox for layouts
4. Use React Bootstrap Modal for all modals
5. Keep code human readable
6. Always update context file with new implementations
7. Follow the same theme for all new UI components

## Pending Items
- [ ] Email sending API integration for reset password flow
  - Currently using dummy timer (2 second delay)
  - Need to implement actual email sending functionality
  - Should show "sending email" state and success message

## Next Steps
- Product catalog pages
- Shopping cart functionality
- Product detail pages
- User profile/dashboard
