This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


/easy-grade
│
├── /public                    # Static assets like images, fonts, etc.
│   ├── /images
│   └── favicon.ico
│
├── /src                       # Source folder for your main app code
│   ├── /components            # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── GradeForm.tsx
│   │   ├── AnswerCard.tsx
│   │   └── Rubric.tsx
│   │
│   ├── /hooks                 # Custom React hooks (if needed)
│   │   └── useFetchAnswers.ts
│   │
│   ├── /layouts               # Layout components
│   │   └── MainLayout.tsx
│   │
│   ├── /pages                 # Main pages of your application
│   │   ├── /api               # API routes
│   │   │   ├── answers.ts     # API logic for fetching/processing answers
│   │   │   ├── grades.ts      # API for grading logic
│   │   │   └── rubric.ts      # API for rubric fetching
│   │   ├── _app.tsx           # Application wrapper for global state/providers
│   │   ├── _document.tsx      # Custom HTML document (for Tailwind or Meta setup)
│   │   ├── index.tsx          # Landing page
│   │   ├── submit.tsx         # Submission page for uploading handwritten answers
│   │   └── grade.tsx          # Grading page to view the results
│   │
│   ├── /styles                # Custom styles
│   │   ├── globals.css        # Global CSS (Tailwind's @apply can be used here)
│   │   ├── tailwind.css       # Tailwind configuration and imports
│   │   └── components.module.css  # Component-specific styles if needed
│   │
│   ├── /utils                 # Helper functions/utilities
│   │   ├── apiClient.ts       # Helper to make API calls (Axios, Fetch)
│   │   ├── gradingUtils.ts    # Grading-specific logic
│   │   └── ocrUtils.ts        # OCR and text processing utilities
│   │
│   └── /config                # Configuration files (if any)
│       └── tailwind.config.js # Tailwind CSS configuration
│
├── .gitignore                 # Git ignore file
├── next-env.d.ts              # Next.js type support for TypeScript
├── next.config.js             # Next.js configuration
├── postcss.config.js          # PostCSS configuration for Tailwind
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Package dependencies and scripts
└── README.md  


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
