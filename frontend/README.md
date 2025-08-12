# Fake & Fictional Tanks

A React application showcasing fake and fictional tanks from various media sources. This project has been converted from Next.js to Vite React with JSX and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Components**: Navigation menu, comment forms, and correction panels
- **Modern UI**: Clean and professional design with smooth animations
- **Accessibility**: Proper semantic HTML and ARIA labels

## Tech Stack

- **React 18**: Latest version with hooks and modern patterns
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **ESLint**: Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fake-fictional-tanks
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── NavigationMenu.jsx
│   ├── TableOfContents.jsx
│   ├── CommentForm.jsx
│   └── CorrectionPanel.jsx
├── lib/                # Utility functions
│   └── utils.js
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## Components

### NavigationMenu
A responsive navigation header with dropdown menus, search functionality, and dark mode toggle.

### TableOfContents
An expandable table of contents that allows users to navigate to different sections of the page.

### CommentForm
A form component for users to leave comments with validation and submission feedback.

### CorrectionPanel
A floating panel that allows users to suggest corrections to the content.

## Styling

The project uses Tailwind CSS for styling with custom CSS variables for theming. The design is responsive and follows modern web design principles.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the linter: `npm run lint`
5. Submit a pull request

## License

This project is licensed under the ISC License. 