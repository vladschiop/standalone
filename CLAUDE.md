# CLAUDE.md - Coding Best Practices

This document outlines the coding standards and best practices for this Next.js project.

## Project Setup
- Framework: Next.js 15.4.5 with React 19.1.0
- Language: TypeScript
- Styling: TailwindCSS v4
- Linting: ESLint with Next.js config

## Code Standards

### TypeScript
- Use strict TypeScript configuration
- Always define proper types for props, state, and function parameters
- Avoid `any` type - use specific types or `unknown` when necessary
- Use interface over type for object definitions when possible

### React/Next.js Conventions
- Use functional components with hooks over class components
- Prefer Server Components when possible (Next.js App Router default)
- Use proper Next.js imports for routing, images, and metadata
- Follow Next.js file-based routing conventions

### Code Style
- Use consistent naming conventions:
  - Components: PascalCase (e.g., `UserProfile`)
  - Files: kebab-case for pages, camelCase for utilities
  - Variables/functions: camelCase
  - Constants: UPPER_SNAKE_CASE
- Keep components small and focused (single responsibility)
- Use meaningful variable and function names
- Prefer destructuring for props and imports

### File Organization
- Group related files in feature-based folders
- Keep components close to where they're used
- Use barrel exports (index.ts) for cleaner imports
- Separate business logic from UI components

### Styling with TailwindCSS
- Use Tailwind utility classes for styling
- Create custom components for repeated patterns
- Use semantic class names in custom CSS when needed
- Maintain responsive design principles (mobile-first)

### Testing & Quality
- Run linting before commits: `npm run lint`
- Ensure TypeScript compilation passes: `npm run build`
- Write meaningful commit messages
- Test components and functionality before submitting

### Performance
- Use Next.js Image component for optimized images
- Implement proper loading states
- Use React.memo() for expensive components
- Lazy load components when appropriate

### Security
- Never commit sensitive data (API keys, passwords)
- Validate all user inputs
- Use environment variables for configuration
- Follow secure coding practices

## Development Workflow
1. Create feature branch from main
2. Write code following these standards
3. Run `npm run lint` and `npm run build`
4. Test functionality thoroughly
5. Commit with descriptive message
6. Create pull request for review

## Commands
- Development: `npm run dev`
- Build: `npm run build`
- Start production: `npm start`
- Lint: `npm run lint`