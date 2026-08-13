This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
AGENTS.md
CLAUDE.md
components.json
Dockerfile
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
README.md
src/app/admin/assignments/page.tsx
src/app/admin/classes/page.tsx
src/app/admin/dashboard/page.tsx
src/app/admin/submissions/page.tsx
src/app/admin/users/page.tsx
src/app/favicon.ico
src/app/globals.css
src/app/layout.tsx
src/app/login/page.tsx
src/app/page.tsx
src/app/student/assignments/[id]/page.tsx
src/app/student/assignments/page.tsx
src/app/student/dashboard/page.tsx
src/app/student/submissions/page.tsx
src/app/teacher/assignments/[id]/edit/page.tsx
src/app/teacher/assignments/[id]/submissions/page.tsx
src/app/teacher/assignments/new/page.tsx
src/app/teacher/assignments/page.tsx
src/app/teacher/dashboard/page.tsx
src/components/shared/DeadlineBadge.tsx
src/components/shared/Navbar.tsx
src/components/ui/badge.tsx
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/dialog.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/select.tsx
src/components/ui/sonner.tsx
src/components/ui/textarea.tsx
src/lib/api/admin.ts
src/lib/api/assignments.ts
src/lib/api/auth.ts
src/lib/api/client.ts
src/lib/api/error.ts
src/lib/auth/AuthContext.tsx
src/lib/utils.ts
src/proxy.ts
src/types/index.ts
tsconfig.json
```

# Files

## File: .gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
````

## File: AGENTS.md
````markdown
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
````

## File: CLAUDE.md
````markdown
@AGENTS.md
````

## File: components.json
````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
````

## File: Dockerfile
````dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
````

## File: eslint.config.mjs
````javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
````

## File: next.config.ts
````typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.105', 'localhost'],
};
export default nextConfig;
````

## File: package.json
````json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.7.0",
    "@hookform/resolvers": "^5.7.1",
    "@tanstack/react-query": "^5.101.4",
    "axios": "^1.19.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.31.0",
    "next": "16.3.0",
    "next-themes": "^0.4.6",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "^7.85.0",
    "shadcn": "^4.16.2",
    "sonner": "^2.0.8",
    "tailwind-merge": "^3.6.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
````

## File: postcss.config.mjs
````javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
````

## File: public/file.svg
````xml
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
````

## File: public/globe.svg
````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
````

## File: public/next.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
````

## File: public/vercel.svg
````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
````

## File: public/window.svg
````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
````

## File: README.md
````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
````

## File: src/app/globals.css
````css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
````

## File: src/app/layout.tsx
````typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Assignment System',
  description: 'School Assignment & Submission Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
````

## File: src/app/page.tsx
````typescript
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.push('/login');
    else if (user.role === 'Admin') router.push('/admin/dashboard');
    else if (user.role === 'Teacher') router.push('/teacher/dashboard');
    else router.push('/student/dashboard');
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}
````

## File: src/app/teacher/assignments/[id]/edit/page.tsx
````typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  getTeacherAssignments,
  updateAssignment,
} from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import type { Assignment } from '@/types';

function toDateTimeLocal(value: string): string {
  const date = new Date(value);

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

export default function EditAssignmentPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const assignmentId = params.id as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    maxMarks: '',
    deadline: '',
    allowLate: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== 'Teacher') {
      router.push('/login');
      return;
    }

    const loadAssignment = async () => {
      try {
        const assignments = await getTeacherAssignments();

        const currentAssignment = assignments.find(
          (item) => item.id === assignmentId
        );

        if (!currentAssignment) {
          toast.error('Assignment not found');
          router.push('/teacher/dashboard');
          return;
        }

        setAssignment(currentAssignment);

        setForm({
          title: currentAssignment.title,
          description: currentAssignment.description,
          maxMarks: currentAssignment.maxMarks.toString(),
          deadline: toDateTimeLocal(currentAssignment.deadline),
          allowLate: currentAssignment.allowLate,
        });
      } catch (error: unknown) {
        toast.error(
          getApiErrorMessage(error, 'Failed to load assignment')
        );
      } finally {
        setLoading(false);
      }
    };

    void loadAssignment();
  }, [assignmentId, user, isLoading, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.maxMarks ||
      !form.deadline
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    const maxMarks = Number(form.maxMarks);

    if (!Number.isInteger(maxMarks) || maxMarks <= 0) {
      toast.error('Maximum marks must be a positive whole number');
      return;
    }

    const deadline = new Date(form.deadline);

    if (Number.isNaN(deadline.getTime())) {
      toast.error('Please enter a valid deadline');
      return;
    }

    if (deadline <= new Date()) {
      toast.error('Deadline must be in the future');
      return;
    }

    setSubmitting(true);

    try {
      await updateAssignment(assignmentId, {
        title: form.title.trim(),
        description: form.description.trim(),
        maxMarks,
        deadline: deadline.toISOString(),
        allowLate: form.allowLate,
      });

      toast.success('Assignment updated successfully');
      router.push('/teacher/dashboard');
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, 'Failed to update assignment')
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Assignment not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-2xl p-6">
        <div className="mb-6 flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            ← Back
          </Button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Assignment
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <span>
                {assignment.className} · {assignment.subjectName}
              </span>

              <Badge
                variant={
                  assignment.status === 'Published'
                    ? 'default'
                    : 'secondary'
                }
              >
                {assignment.status}
              </Badge>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>

                <Input
                  id="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description *
                </Label>

                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Class</Label>

                  <Input
                    value={assignment.className}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>

                  <Input
                    value={assignment.subjectName}
                    disabled
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Class and subject cannot be changed after an
                assignment has been created.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">
                    Maximum Marks *
                  </Label>

                  <Input
                    id="maxMarks"
                    type="number"
                    min="1"
                    max="1000"
                    value={form.maxMarks}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        maxMarks: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Deadline *
                  </Label>

                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={form.deadline}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deadline: event.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="allowLate"
                  type="checkbox"
                  checked={form.allowLate}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      allowLate: event.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />

                <Label
                  htmlFor="allowLate"
                  className="cursor-pointer"
                >
                  Allow late submissions
                </Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting
                    ? 'Saving...'
                    : 'Save Changes'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
````

## File: src/components/shared/Navbar.tsx
````typescript
'use client';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const { user, logout } = useAuth();

  const roleColor: Record<string, 'default' | 'secondary' | 'destructive'> = {
    Admin: 'destructive',
    Teacher: 'default',
    Student: 'secondary',
  };

  return (
    <nav className="border-b bg-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg text-gray-900">Assignment System</h1>
        {user && (
          <Badge variant={roleColor[user.role] ?? 'default'}>{user.role}</Badge>
        )}
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.fullName}</span>
          <Button variant="outline" size="sm" onClick={logout}>Sign Out</Button>
        </div>
      )}
    </nav>
  );
}
````

## File: src/components/ui/badge.tsx
````typescript
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
````

## File: src/components/ui/button.tsx
````typescript
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
````

## File: src/components/ui/card.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
````

## File: src/components/ui/dialog.tsx
````typescript
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
````

## File: src/components/ui/input.tsx
````typescript
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
````

## File: src/components/ui/label.tsx
````typescript
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
````

## File: src/components/ui/select.tsx
````typescript
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
````

## File: src/components/ui/sonner.tsx
````typescript
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
````

## File: src/components/ui/textarea.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
````

## File: src/lib/api/auth.ts
````typescript
import apiClient from './client';

export const login = async (email: string, password: string) => {
  const res = await apiClient.post('/auth/login', { email, password });
  return res.data.data;
};
````

## File: src/lib/api/error.ts
````typescript
import axios from 'axios';

interface ApiErrorBody {
  message?: string;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}
````

## File: src/lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## File: src/proxy.ts
````typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getRole(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ??
      payload.role ??
      null
    );
  } catch {
    return null;
  }
}

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const role = getRole(token);

    if (pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/teacher") && role !== "Teacher") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/student") && role !== "Student") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
````

## File: src/types/index.ts
````typescript
export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  token: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  maxMarks: number;
  deadline: string;
  status: string;
  allowLate: boolean;
  submissionCount: number;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentName: string;
  answerText: string;
  submittedAt: string;
  marks: number | null;
  maxMarks: number;
  feedback: string | null;
  status: string;
  isLate: boolean;
}

export interface ClassItem {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  subjectCount: number;
  studentCount: number;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  classId: string;
  className: string;
  createdAt: string;
}

export interface UserItem {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
````

## File: src/app/admin/classes/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getClasses, createClass, getSubjects, createSubject, assignTeacher, enrollStudent } from '@/lib/api/admin';
import { getUsers } from '@/lib/api/admin';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { ClassItem, Subject, UserItem } from '@/types';

export default function AdminClasses() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<UserItem[]>([]);
  const [students, setStudents] = useState<UserItem[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classForm, setClassForm] = useState({ name: '', description: '' });
  const [subjectForm, setSubjectForm] = useState({ name: '', classId: '' });
  const [teacherForm, setTeacherForm] = useState({ teacherId: '', subjectId: '', classId: '' });
  const [studentForm, setStudentForm] = useState({ studentId: '', classId: '' });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [cls, subs, tchrs, studs] = await Promise.all([
      getClasses(), getSubjects(), getUsers('Teacher'), getUsers('Student')
    ]);
    setClasses(cls ?? []);
    setSubjects(subs ?? []);
    setTeachers(tchrs.data ?? []);
    setStudents(studs.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }

    const loadInitialData = async () => {
      const [cls, subs, tchrs, studs] = await Promise.all([
        getClasses(), getSubjects(), getUsers('Teacher'), getUsers('Student')
      ]);
      setClasses(cls ?? []);
      setSubjects(subs ?? []);
      setTeachers(tchrs.data ?? []);
      setStudents(studs.data ?? []);
      setLoading(false);
    };

    void loadInitialData();
  }, [user, isLoading, router]);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClass(classForm);
      toast.success('Class created');
      setClassForm({ name: '', description: '' });
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubject(subjectForm);
      toast.success('Subject created');
      setSubjectForm({ name: '', classId: '' });
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  const handleAssignTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignTeacher(teacherForm);
      toast.success('Teacher assigned');
      setTeacherForm({ teacherId: '', subjectId: '', classId: '' });
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enrollStudent(studentForm);
      toast.success('Student enrolled');
      setStudentForm({ studentId: '', classId: '' });
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  const filteredSubjects = selectedClass ? subjects.filter(s => s.classId === selectedClass) : subjects;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Classes & Subjects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Class */}
          <Card>
            <CardHeader><CardTitle>Create Class</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleCreateClass} className="space-y-3">
                <Input placeholder="Class name (e.g. Class 10 Science)" value={classForm.name}
                  onChange={e => setClassForm({...classForm, name: e.target.value})} required />
                <Input placeholder="Description (optional)" value={classForm.description}
                  onChange={e => setClassForm({...classForm, description: e.target.value})} />
                <Button type="submit" className="w-full">Create Class</Button>
              </form>
              <div className="mt-4 space-y-2">
                {classes.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.subjectCount} subjects · {c.studentCount} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Subject */}
          <Card>
            <CardHeader><CardTitle>Create Subject</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSubject} className="space-y-3">
                <Input placeholder="Subject name (e.g. Mathematics)" value={subjectForm.name}
                  onChange={e => setSubjectForm({...subjectForm, name: e.target.value})} required />
                <Select value={subjectForm.classId} onValueChange={v => setSubjectForm({...subjectForm, classId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Create Subject</Button>
              </form>
              <div className="mt-4 space-y-2">
                {subjects.map(s => (
                  <div key={s.id} className="p-3 bg-gray-50 rounded-lg border">
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.className}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assign Teacher */}
          <Card>
            <CardHeader><CardTitle>Assign Teacher to Subject</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleAssignTeacher} className="space-y-3">
                <Select value={teacherForm.teacherId} onValueChange={v => setTeacherForm({...teacherForm, teacherId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select teacher" /></SelectTrigger>
                  <SelectContent>
                    {teachers.map(t => <SelectItem key={t.id} value={t.id}>{t.fullName}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={teacherForm.classId} onValueChange={v => {
                  setTeacherForm({...teacherForm, classId: v ?? '', subjectId: ''});
                  setSelectedClass(v ?? '');
                }}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={teacherForm.subjectId} onValueChange={v => setTeacherForm({...teacherForm, subjectId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {filteredSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Assign Teacher</Button>
              </form>
            </CardContent>
          </Card>

          {/* Enroll Student */}
          <Card>
            <CardHeader><CardTitle>Enroll Student in Class</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleEnrollStudent} className="space-y-3">
                <Select value={studentForm.studentId} onValueChange={v => setStudentForm({...studentForm, studentId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                  <SelectContent>
                    {students.map(s => <SelectItem key={s.id} value={s.id}>{s.fullName}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={studentForm.classId} onValueChange={v => setStudentForm({...studentForm, classId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Enroll Student</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
````

## File: src/app/admin/dashboard/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getUsers } from '@/lib/api/admin';
import { getAdminAssignments, getAdminSubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, assignments: 0, submissions: 0 });

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }

    const load = async () => {
      const [users, assignments, submissions] = await Promise.all([
        getUsers(), getAdminAssignments(), getAdminSubmissions()
      ]);
      setStats({
        users: users.data?.length ?? 0,
        assignments: assignments?.length ?? 0,
        submissions: submissions?.length ?? 0,
      });
    };
    load();
  }, [user, isLoading, router]);

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader><CardTitle className="text-sm text-gray-500">Total Users</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-blue-600">{stats.users}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm text-gray-500">Total Assignments</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-green-600">{stats.assignments}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm text-gray-500">Total Submissions</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-purple-600">{stats.submissions}</p></CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/users')}>
            <CardHeader><CardTitle>Manage Users</CardTitle></CardHeader>
            <CardContent><p className="text-gray-500">Create and manage Admin, Teacher, and Student accounts</p></CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/classes')}>
            <CardHeader><CardTitle>Manage Classes & Subjects</CardTitle></CardHeader>
            <CardContent><p className="text-gray-500">Set up classes, subjects, and assign teachers</p></CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
````

## File: src/app/admin/users/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getUsers, createUser, deactivateUser } from '@/lib/api/admin';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { UserItem } from '@/types';

export default function AdminUsers() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'Student' });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const res = await getUsers();
    setUsers(res.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }

    const loadInitialUsers = async () => {
      const res = await getUsers();
      setUsers(res.data ?? []);
      setLoading(false);
    };

    void loadInitialUsers();
  }, [user, isLoading, router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createUser(form);
      toast.success('User created successfully');
      setOpen(false);
      setForm({ fullName: '', email: '', password: '', role: 'Student' });
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to create user'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('Deactivate this user?')) return;
    try {
      await deactivateUser(id);
      toast.success('User deactivated');
      load();
    } catch {
      toast.error('Failed to deactivate user');
    }
  };

  const roleVariant: Record<string, 'destructive' | 'default' | 'secondary'> = {
    Admin: 'destructive', Teacher: 'default', Student: 'secondary'
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}>
              + Create User
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create New User</DialogTitle></DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={form.role} onValueChange={v => setForm({...form, role: v ?? ''})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create User'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Name</th>
                  <th className="text-left p-4 font-medium text-gray-600">Email</th>
                  <th className="text-left p-4 font-medium text-gray-600">Role</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-medium">{u.fullName}</td>
                    <td className="p-4 text-gray-600">{u.email}</td>
                    <td className="p-4"><Badge variant={roleVariant[u.role]}>{u.role}</Badge></td>
                    <td className="p-4">
                      <Badge variant={u.isActive ? 'default' : 'secondary'}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {u.isActive && (
                        <Button variant="destructive" size="sm" onClick={() => handleDeactivate(u.id)}>
                          Deactivate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
````

## File: src/app/login/page.tsx
````typescript
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Invalid email or password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Assignment System</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@school.edu"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

     {process.env.NODE_ENV === 'development' && (
  <div className="mt-4 p-4 bg-gray-50 rounded-lg border text-sm space-y-1">
    <p className="font-semibold text-gray-700 mb-2">Demo Credentials:</p>
    <p><span className="font-medium">Admin:</span> admin@school.edu / Admin@123</p>
    <p><span className="font-medium">Teacher:</span> teacher1@school.edu / Teacher@123</p>
    <p><span className="font-medium">Student:</span> student1@school.edu / Student@123</p>
  </div>
)}
        </CardContent>
      </Card>
    </div>
  );
}
````

## File: src/app/student/dashboard/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getStudentAssignments, getMySubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Assignment, Submission } from '@/types';

export default function StudentDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Student') { router.push('/login'); return; }
    const load = async () => {
      const [a, s] = await Promise.all([getStudentAssignments(), getMySubmissions()]);
      setAssignments(a ?? []);
      setSubmissions(s ?? []);
      setLoading(false);
    };
    load();
  }, [user, isLoading, router]);

  const submittedIds = new Set(submissions.map(s => s.assignmentId));

  const statusColor: Record<string, string> = {
    Submitted: 'bg-blue-100 text-blue-700',
    Graded: 'bg-green-100 text-green-700',
    Late: 'bg-orange-100 text-orange-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
          <p className="text-gray-500 text-sm mt-1">
            {assignments.length} assignments · {submissions.length} submitted
          </p>
        </div>

        {/* Submissions with grades */}
        {submissions.filter(s => s.marks !== null).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Grades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {submissions.filter(s => s.marks !== null).slice(0, 3).map(s => (
                <Card key={s.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="font-medium text-sm text-gray-900 mb-1">{s.assignmentTitle}</p>
                    <p className="text-2xl font-bold text-green-600">{s.marks}/{s.maxMarks}</p>
                    {s.feedback && <p className="text-xs text-gray-500 mt-1 italic">{s.feedback}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Assignment list */}
        {assignments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No assignments yet. Check back later.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {assignments.map(a => {
              const mySubmission = submissions.find(s => s.assignmentId === a.id);
              const isSubmitted = submittedIds.has(a.id);

              return (
                <Card key={a.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{a.title}</h3>
                          {isSubmitted && mySubmission && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[mySubmission.status]}`}>
                              {mySubmission.status}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {a.className} · {a.subjectName} · {a.teacherName} · Max {a.maxMarks} marks
                        </p>
                        <div className="flex items-center gap-3">
                          <DeadlineBadge deadline={a.deadline} />
                          <span className="text-xs text-gray-500">
                            {new Date(a.deadline).toLocaleDateString()}
                          </span>
                          {a.allowLate && (
                            <span className="text-xs text-blue-500">Late submissions allowed</span>
                          )}
                        </div>
                        {mySubmission?.marks !== null && mySubmission?.marks !== undefined && (
                          <p className="text-sm font-medium text-green-600 mt-2">
                            Grade: {mySubmission.marks}/{a.maxMarks}
                            {mySubmission.feedback && ` — ${mySubmission.feedback}`}
                          </p>
                        )}
                      </div>
                      <Button size="sm" className="ml-4"
                        onClick={() => router.push(`/student/assignments/${a.id}`)}>
                        {isSubmitted ? 'View Submission' : 'Submit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
````

## File: src/app/teacher/assignments/[id]/submissions/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getAssignmentSubmissions, gradeSubmission } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { Submission } from '@/types';

export default function AssignmentSubmissions() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [gradeForm, setGradeForm] = useState({ marks: '', feedback: '', status: 'Graded' });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const data = await getAssignmentSubmissions(assignmentId);
    setSubmissions(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }

    const loadInitialSubmissions = async () => {
      const data = await getAssignmentSubmissions(assignmentId);
      setSubmissions(data ?? []);
      setLoading(false);
    };

    void loadInitialSubmissions();
  }, [user, isLoading, router, assignmentId]);

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    try {
      await gradeSubmission(selected.id, {
        marks: parseInt(gradeForm.marks),
        feedback: gradeForm.feedback,
        status: gradeForm.status
      });
      toast.success('Submission graded successfully');
      setSelected(null);
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to grade'));
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor: Record<string, string> = {
    Submitted: 'bg-blue-100 text-blue-700',
    Graded: 'bg-green-100 text-green-700',
    Late: 'bg-orange-100 text-orange-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>← Back</Button>
          <h2 className="text-2xl font-bold text-gray-900">
            Submissions ({submissions.length})
          </h2>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {submissions.map(s => (
              <Card key={s.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{s.studentName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[s.status]}`}>
                          {s.status}
                        </span>
                        {s.isLate && <Badge variant="destructive" className="text-xs">Late</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{s.answerText}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Submitted: {new Date(s.submittedAt).toLocaleString()}</span>
                        {s.marks !== null && (
                          <span className="font-medium text-green-600">
                            Marks: {s.marks}/{s.maxMarks}
                          </span>
                        )}
                      </div>
                      {s.feedback && (
                        <p className="text-xs text-gray-500 mt-1 italic">Feedback: {s.feedback}</p>
                      )}
                    </div>
                    <Button size="sm" className="ml-4"
                      onClick={() => {
                        setSelected(s);
                        setGradeForm({
                          marks: s.marks?.toString() ?? '',
                          feedback: s.feedback ?? '',
                          status: 'Graded'
                        });
                      }}>
                      {s.status === 'Graded' ? 'Re-grade' : 'Grade'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Grade Submission — {selected?.studentName}</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg border max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-700">{selected.answerText}</p>
                </div>
                <form onSubmit={handleGrade} className="space-y-3">
                  <div className="space-y-1">
                    <Label>Marks (max {selected.maxMarks})</Label>
                    <Input type="number" min="0" max={selected.maxMarks}
                      value={gradeForm.marks}
                      onChange={e => setGradeForm({...gradeForm, marks: e.target.value})}
                      required />
                  </div>
                  <div className="space-y-1">
                    <Label>Feedback (optional)</Label>
                    <Textarea value={gradeForm.feedback}
                      onChange={e => setGradeForm({...gradeForm, feedback: e.target.value})}
                      placeholder="Write feedback for the student..." rows={3} />
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <Select value={gradeForm.status} onValueChange={v => setGradeForm({...gradeForm, status: v ?? ''})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Graded">Graded</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save Grade'}
                  </Button>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
````

## File: src/app/teacher/assignments/new/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { createAssignment } from '@/lib/api/assignments';
import { getClasses, getSubjects } from '@/lib/api/admin';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { ClassItem, Subject } from '@/types';

export default function NewAssignment() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState({
    title: '', description: '', classId: '', subjectId: '',
    maxMarks: '', deadline: '', allowLate: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }
    const load = async () => {
      const [cls, subs] = await Promise.all([getClasses(), getSubjects()]);
      setClasses(cls ?? []);
      setSubjects(subs ?? []);
    };
    load();
  }, [user, isLoading, router]);

  const filteredSubjects = form.classId
    ? subjects.filter(s => s.classId === form.classId)
    : subjects;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.classId || !form.subjectId || !form.maxMarks || !form.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await createAssignment({
        ...form,
        maxMarks: parseInt(form.maxMarks),
        deadline: new Date(form.deadline).toISOString(),
      });
      toast.success('Assignment created as Draft');
      router.push('/teacher/dashboard');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to create assignment'));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>← Back</Button>
          <h2 className="text-2xl font-bold text-gray-900">New Assignment</h2>
        </div>

        <Card>
          <CardHeader><CardTitle>Assignment Details</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input placeholder="e.g. Chapter 5 Algebra Exercises"
                  value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea placeholder="Describe the assignment in detail..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  rows={4} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select value={form.classId} onValueChange={v => setForm({...form, classId: v ?? '', subjectId: ''})}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Select value={form.subjectId} onValueChange={v => setForm({...form, subjectId: v ?? ''})}>
                    <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>
                      {filteredSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Marks *</Label>
                  <Input type="number" min="1" max="1000" placeholder="100"
                    value={form.maxMarks} onChange={e => setForm({...form, maxMarks: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <Label>Deadline *</Label>
                  <Input type="datetime-local"
                    value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} required />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="allowLate" checked={form.allowLate}
                  onChange={e => setForm({...form, allowLate: e.target.checked})}
                  className="w-4 h-4" />
                <Label htmlFor="allowLate" className="cursor-pointer">
                  Allow late submissions
                </Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? 'Creating...' : 'Create Assignment (Draft)'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
````

## File: src/components/shared/DeadlineBadge.tsx
````typescript
'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

const DAY_MS = 1000 * 60 * 60 * 24;

export default function DeadlineBadge({ deadline }: { deadline: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    const initialTimer = window.setTimeout(updateNow, 0);
    const interval = window.setInterval(updateNow, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, []);

  if (now === null) return <Badge variant="outline">Due date</Badge>;

  const diff = new Date(deadline).getTime() - now;
  const days = Math.floor(diff / DAY_MS);

  if (diff < 0) return <Badge variant="destructive">Overdue</Badge>;
  if (days === 0) return <Badge className="bg-orange-500">Due Today</Badge>;
  if (days <= 3) return <Badge className="bg-yellow-500">Due in {days}d</Badge>;
  return <Badge className="bg-green-500">Due in {days}d</Badge>;
}
````

## File: src/lib/api/admin.ts
````typescript
import apiClient from './client';
import type { ClassItem, Subject, UserItem } from '@/types';

interface ApiResponse<T> {
  data: T;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserInput {
  fullName: string;
  email: string;
}

export interface CreateClassInput {
  name: string;
  description?: string | null;
}

export interface CreateSubjectInput {
  name: string;
  classId: string;
}

export interface AssignTeacherInput {
  teacherId: string;
  subjectId: string;
  classId: string;
}

export interface EnrollStudentInput {
  studentId: string;
  classId: string;
}

// Users
export const getUsers = async (role?: string): Promise<PagedResponse<UserItem>> => {
  const res = await apiClient.get<ApiResponse<PagedResponse<UserItem>>>(
    `/admin/users${role ? `?role=${role}` : ''}`
  );
  return res.data.data;
};

export const createUser = async (data: CreateUserInput): Promise<UserItem> => {
  const res = await apiClient.post<ApiResponse<UserItem>>('/admin/users', data);
  return res.data.data;
};

export const updateUser = async (id: string, data: UpdateUserInput): Promise<UserItem> => {
  const res = await apiClient.put<ApiResponse<UserItem>>(`/admin/users/${id}`, data);
  return res.data.data;
};

export const deactivateUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/users/${id}`);
};

// Classes
export const getClasses = async (): Promise<ClassItem[]> => {
  const res = await apiClient.get<ApiResponse<ClassItem[]>>('/admin/classes');
  return res.data.data;
};

export const createClass = async (data: CreateClassInput): Promise<ClassItem> => {
  const res = await apiClient.post<ApiResponse<ClassItem>>('/admin/classes', data);
  return res.data.data;
};

// Subjects
export const getSubjects = async (classId?: string): Promise<Subject[]> => {
  const res = await apiClient.get<ApiResponse<Subject[]>>(
    `/admin/subjects${classId ? `?classId=${classId}` : ''}`
  );
  return res.data.data;
};

export const createSubject = async (data: CreateSubjectInput): Promise<Subject> => {
  const res = await apiClient.post<ApiResponse<Subject>>('/admin/subjects', data);
  return res.data.data;
};

// Teacher assignment
export const assignTeacher = async (data: AssignTeacherInput): Promise<void> => {
  await apiClient.post('/admin/teacher-subjects', data);
};

// Student enrollment
export const enrollStudent = async (data: EnrollStudentInput): Promise<void> => {
  await apiClient.post('/admin/student-classes', data);
};
````

## File: src/lib/api/assignments.ts
````typescript
import apiClient from './client';
import type { Assignment, Submission } from '@/types';

interface ApiResponse<T> {
  data: T;
}

export interface CreateAssignmentInput {
  title: string;
  description: string;
  classId: string;
  subjectId: string;
  maxMarks: number;
  deadline: string;
  allowLate: boolean;
}

export interface UpdateAssignmentInput {
  title: string;
  description: string;
  maxMarks: number;
  deadline: string;
  allowLate: boolean;
}

export interface GradeSubmissionInput {
  marks: number;
  feedback: string;
  status: string;
}

// Teacher
export const getTeacherAssignments = async (): Promise<Assignment[]> => {
  const res = await apiClient.get<ApiResponse<Assignment[]>>('/teacher/assignments');
  return res.data.data;
};

export const createAssignment = async (data: CreateAssignmentInput): Promise<Assignment> => {
  const res = await apiClient.post<ApiResponse<Assignment>>('/teacher/assignments', data);
  return res.data.data;
};

export const updateAssignment = async (id: string, data: UpdateAssignmentInput): Promise<Assignment> => {
  const res = await apiClient.put<ApiResponse<Assignment>>(`/teacher/assignments/${id}`, data);
  return res.data.data;
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await apiClient.delete(`/teacher/assignments/${id}`);
};

export const publishAssignment = async (id: string): Promise<Assignment> => {
  const res = await apiClient.patch<ApiResponse<Assignment>>(`/teacher/assignments/${id}/publish`);
  return res.data.data;
};

export const getAssignmentSubmissions = async (id: string): Promise<Submission[]> => {
  const res = await apiClient.get<ApiResponse<Submission[]>>(`/teacher/assignments/${id}/submissions`);
  return res.data.data;
};

export const gradeSubmission = async (
  submissionId: string,
  data: GradeSubmissionInput
): Promise<Submission> => {
  const res = await apiClient.patch<ApiResponse<Submission>>(
    `/teacher/submissions/${submissionId}/grade`,
    data
  );
  return res.data.data;
};

// Student
export const getStudentAssignments = async (): Promise<Assignment[]> => {
  const res = await apiClient.get<ApiResponse<Assignment[]>>('/student/assignments');
  return res.data.data;
};

export const getStudentAssignment = async (id: string): Promise<Assignment> => {
  const res = await apiClient.get<ApiResponse<Assignment>>(`/student/assignments/${id}`);
  return res.data.data;
};

export const submitAssignment = async (id: string, answerText: string): Promise<Submission> => {
  const res = await apiClient.post<ApiResponse<Submission>>(`/student/assignments/${id}/submit`, {
    answerText,
  });
  return res.data.data;
};

export const updateSubmission = async (
  submissionId: string,
  answerText: string
): Promise<Submission> => {
  const res = await apiClient.put<ApiResponse<Submission>>(`/student/submissions/${submissionId}`, {
    answerText,
  });
  return res.data.data;
};

export const getMySubmissions = async (): Promise<Submission[]> => {
  const res = await apiClient.get<ApiResponse<Submission[]>>('/student/submissions');
  return res.data.data;
};

// Admin
export const getAdminAssignments = async (): Promise<Assignment[]> => {
  const res = await apiClient.get<ApiResponse<Assignment[]>>('/admin/assignments');
  return res.data.data;
};

export const getAdminSubmissions = async (): Promise<Submission[]> => {
  const res = await apiClient.get<ApiResponse<Submission[]>>('/admin/submissions');
  return res.data.data;
};
````

## File: src/lib/api/client.ts
````typescript
import axios from 'axios';

interface StoredAuth {
  token?: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5062/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const data = JSON.parse(stored) as StoredAuth;
        if (data.token) {
          config.headers.Authorization = `Bearer ${data.token}`;
        }
      }
    } catch {
      localStorage.removeItem('auth');
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth');
      document.cookie = 'token=; path=/; max-age=0';
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
````

## File: src/app/admin/assignments/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getAdminAssignments } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types';

export default function AdminAssignments() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }
    getAdminAssignments()
      .then(data => setAssignments(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">All Assignments</h2>
        {assignments.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No assignments.</CardContent></Card>
          : <Card><CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Class</th>
                    <th className="text-left p-4">Teacher</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Deadline</th>
                    <th className="text-left p-4">Submissions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map(a => (
                    <tr key={a.id} className="border-b">
                      <td className="p-4 font-medium">{a.title}</td>
                      <td className="p-4">{a.className}</td>
                      <td className="p-4">{a.teacherName}</td>
                      <td className="p-4"><Badge variant={a.status === 'Published' ? 'default' : 'secondary'}>{a.status}</Badge></td>
                      <td className="p-4">{new Date(a.deadline).toLocaleDateString()}</td>
                      <td className="p-4">{a.submissionCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent></Card>
        }
      </main>
    </div>
  );
}
````

## File: src/app/admin/submissions/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getAdminSubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/types';

export default function AdminSubmissions() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }
    getAdminSubmissions()
      .then(data => setSubmissions(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">All Submissions</h2>
        {submissions.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No submissions.</CardContent></Card>
          : <Card><CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Assignment</th>
                    <th className="text-left p-4">Student</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Marks</th>
                    <th className="text-left p-4">Late</th>
                    <th className="text-left p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(s => (
                    <tr key={s.id} className="border-b">
                      <td className="p-4 font-medium">{s.assignmentTitle}</td>
                      <td className="p-4">{s.studentName}</td>
                      <td className="p-4"><Badge variant="secondary">{s.status}</Badge></td>
                      <td className="p-4">{s.marks ?? '-'}</td>
                      <td className="p-4">{s.isLate ? 'Yes' : 'No'}</td>
                      <td className="p-4">{new Date(s.submittedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent></Card>
        }
      </main>
    </div>
  );
}
````

## File: src/app/student/assignments/[id]/page.tsx
````typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  getStudentAssignment,
  getMySubmissions,
  submitAssignment,
  updateSubmission,
} from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import type { Assignment, Submission } from '@/types';

export default function StudentAssignmentPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [assignment, setAssignment] =
    useState<Assignment | null>(null);

  const [mySubmission, setMySubmission] =
    useState<Submission | null>(null);

  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isPastDeadline, setIsPastDeadline] =
    useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== 'Student') {
      router.push('/login');
      return;
    }

    const load = async () => {
      try {
        const [assignmentData, submissions] =
          await Promise.all([
            getStudentAssignment(id),
            getMySubmissions(),
          ]);

        setAssignment(assignmentData);

        setIsPastDeadline(
          new Date(
            assignmentData.deadline
          ).getTime() < Date.now()
        );

        const existing = submissions.find(
          (submission) =>
            submission.assignmentId === id
        );

        if (existing) {
          setMySubmission(existing);
          setAnswerText(
            existing.answerText ?? ''
          );
        }
      } catch (error: unknown) {
        toast.error(
          getApiErrorMessage(
            error,
            'Failed to load assignment'
          )
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [user, isLoading, router, id]);

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const trimmedAnswer = answerText.trim();

    if (!trimmedAnswer) {
      toast.error('Please write your answer');
      return;
    }

    setSubmitting(true);

    try {
      const created = await submitAssignment(
        id,
        trimmedAnswer
      );

      setMySubmission(created);

      setAnswerText(
        created.answerText ?? trimmedAnswer
      );

      toast.success(
        'Assignment submitted successfully'
      );
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          'Failed to submit assignment'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!mySubmission || !assignment) return;

    const deadlinePassed =
      new Date(
        assignment.deadline
      ).getTime() < Date.now();

    if (deadlinePassed) {
      setIsPastDeadline(true);

      toast.error(
        'Submission can no longer be edited because the deadline has passed'
      );

      return;
    }

    const trimmedAnswer = answerText.trim();

    if (!trimmedAnswer) {
      toast.error('Please write your answer');
      return;
    }

    setSubmitting(true);

    try {
      const updated = await updateSubmission(
        mySubmission.id,
        trimmedAnswer
      );

      setMySubmission(updated);

      setAnswerText(
        updated.answerText ?? trimmedAnswer
      );

      setEditing(false);

      toast.success(
        'Submission updated successfully'
      );
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          'Failed to update submission'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cancelEditing = () => {
    if (mySubmission) {
      setAnswerText(
        mySubmission.answerText ?? ''
      );
    }

    setEditing(false);
  };

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Assignment not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-3xl p-6">
        <div className="mb-6 flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {assignment.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {assignment.className}
              </Badge>

              <Badge variant="outline">
                {assignment.subjectName}
              </Badge>

              <Badge variant="outline">
                Max {assignment.maxMarks} marks
              </Badge>

              <DeadlineBadge
                deadline={assignment.deadline}
              />
            </div>

            <p className="text-sm text-gray-500">
              Teacher: {assignment.teacherName}
              {' | '}
              Deadline:{' '}
              {new Date(
                assignment.deadline
              ).toLocaleString()}
            </p>

            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-gray-700">
                {assignment.description}
              </p>
            </div>

            {assignment.allowLate && (
              <p className="text-sm text-blue-600">
                Late submissions are allowed for this
                assignment.
              </p>
            )}
          </CardContent>
        </Card>

        {mySubmission && !editing && (
          <Card className="mb-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-base">
                Your Submission
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>
                  {mySubmission.status}
                </Badge>

                {mySubmission.isLate && (
                  <Badge variant="destructive">
                    Late
                  </Badge>
                )}
              </div>

              <div className="rounded-lg border bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {mySubmission.answerText}
                </p>
              </div>

              {mySubmission.marks !== null && (
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-lg font-bold text-green-700">
                    Grade: {mySubmission.marks} /{' '}
                    {mySubmission.maxMarks}
                  </p>

                  {mySubmission.feedback && (
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">
                        Feedback:
                      </span>{' '}
                      {mySubmission.feedback}
                    </p>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-500">
                Submitted:{' '}
                {new Date(
                  mySubmission.submittedAt
                ).toLocaleString()}
              </p>

              {!isPastDeadline ? (
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setEditing(true)
                    }
                  >
                    Edit Submission
                  </Button>

                  <p className="text-xs text-gray-500">
                    You can update your submission
                    until the assignment deadline.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  The deadline has passed. This
                  submission can no longer be edited.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {mySubmission && editing && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">
                Edit Submission
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleUpdate}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="editAnswer">
                    Update your answer *
                  </Label>

                  <Textarea
                    id="editAnswer"
                    value={answerText}
                    onChange={(event) =>
                      setAnswerText(
                        event.target.value
                      )
                    }
                    placeholder="Update your answer here..."
                    rows={8}
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Saving...'
                      : 'Save Changes'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEditing}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {!mySubmission && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Your Answer
              </CardTitle>
            </CardHeader>

            <CardContent>
              {isPastDeadline &&
              !assignment.allowLate ? (
                <div className="py-6 text-center">
                  <p className="font-medium text-red-500">
                    The deadline has passed
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    This assignment does not allow
                    late submissions.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {isPastDeadline &&
                    assignment.allowLate && (
                      <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                        <p className="text-sm text-orange-600">
                          You are submitting after the
                          deadline. This submission
                          will be marked as Late.
                        </p>
                      </div>
                    )}

                  <div className="space-y-2">
                    <Label htmlFor="answer">
                      Write your answer *
                    </Label>

                    <Textarea
                      id="answer"
                      value={answerText}
                      onChange={(event) =>
                        setAnswerText(
                          event.target.value
                        )
                      }
                      placeholder="Type your answer here..."
                      rows={8}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Submitting...'
                      : 'Submit Assignment'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
````

## File: src/app/student/assignments/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getStudentAssignments } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types';

export default function StudentAssignments() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Student') { router.push('/login'); return; }
    getStudentAssignments()
      .then(data => setAssignments(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Assignments</h2>
        {assignments.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No assignments available.</CardContent></Card>
          : <div className="space-y-3">
              {assignments.map(a => (
                <Card key={a.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push('/student/assignments/' + a.id)}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{a.title}</p>
                      <p className="text-sm text-gray-500">{a.className} - {a.subjectName} | By: {a.teacherName} | Marks: {a.maxMarks}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {a.allowLate && <Badge variant="outline">Late OK</Badge>}
                      <DeadlineBadge deadline={a.deadline} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        }
      </main>
    </div>
  );
}
````

## File: src/app/student/submissions/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getMySubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/types';

export default function StudentSubmissions() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Student') { router.push('/login'); return; }
    getMySubmissions()
      .then(data => setSubmissions(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Submissions</h2>
        {submissions.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No submissions yet.</CardContent></Card>
          : <div className="space-y-3">
              {submissions.map(s => (
                <Card key={s.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{s.assignmentTitle}</p>
                        <p className="text-sm text-gray-500 mt-1">Submitted: {new Date(s.submittedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={s.status === 'Graded' ? 'default' : s.status === 'Late' ? 'destructive' : 'secondary'}>{s.status}</Badge>
                        {s.isLate && <Badge variant="destructive">Late</Badge>}
                      </div>
                    </div>
                    {s.marks !== null && (
                      <div className="mt-3 p-3 bg-green-50 rounded">
                        <p className="font-medium">Marks: {s.marks}</p>
                        {s.feedback && <p className="text-sm text-gray-600 mt-1">Feedback: {s.feedback}</p>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
        }
      </main>
    </div>
  );
}
````

## File: src/app/teacher/assignments/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getTeacherAssignments } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types';

export default function TeacherAssignments() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }
    getTeacherAssignments()
      .then(data => setAssignments(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Assignments</h2>
          <Button onClick={() => router.push('/teacher/assignments/new')}>+ New Assignment</Button>
        </div>
        {assignments.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No assignments yet.</CardContent></Card>
          : <div className="space-y-3">
              {assignments.map(a => (
                <Card key={a.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push('/teacher/assignments/' + a.id + '/submissions')}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{a.title}</p>
                      <p className="text-sm text-gray-500">{a.className} - {a.subjectName} | Marks: {a.maxMarks}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={a.status === 'Published' ? 'default' : 'secondary'}>{a.status}</Badge>
                      <DeadlineBadge deadline={a.deadline} />
                      <Badge variant="outline">{a.submissionCount} submissions</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        }
      </main>
    </div>
  );
}
````

## File: src/app/teacher/dashboard/page.tsx
````typescript
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getTeacherAssignments, deleteAssignment, publishAssignment } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { Assignment } from '@/types';

export default function TeacherDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getTeacherAssignments();
    setAssignments(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }

    const loadInitialAssignments = async () => {
      const data = await getTeacherAssignments();
      setAssignments(data ?? []);
      setLoading(false);
    };

    void loadInitialAssignments();
  }, [user, isLoading, router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this assignment?')) return;
    try {
      await deleteAssignment(id);
      toast.success('Assignment deleted');
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Cannot delete published assignment'));
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishAssignment(id);
      toast.success('Assignment published — students can now see it');
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to publish'));
    }
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
            <p className="text-gray-500 text-sm mt-1">{assignments.length} total assignments</p>
          </div>
          <Button onClick={() => router.push('/teacher/assignments/new')}>+ New Assignment</Button>
        </div>

        {assignments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No assignments yet</p>
              <Button onClick={() => router.push('/teacher/assignments/new')}>Create your first assignment</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {assignments.map(a => (
              <Card key={a.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{a.title}</h3>
                        <Badge variant={a.status === 'Published' ? 'default' : 'secondary'}>
                          {a.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {a.className} · {a.subjectName} · Max {a.maxMarks} marks
                      </p>
                      <div className="flex items-center gap-3">
                        <DeadlineBadge deadline={a.deadline} />
                        <span className="text-xs text-gray-500">
                          {new Date(a.deadline).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {a.submissionCount} submission{a.submissionCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
  <Button
    size="sm"
    variant="outline"
    onClick={() =>
      router.push(`/teacher/assignments/${a.id}/edit`)
    }
  >
    Edit
  </Button>

  {a.status === 'Draft' && (
    <Button
      size="sm"
      variant="outline"
      onClick={() => handlePublish(a.id)}
    >
      Publish
    </Button>
  )}

  <Button
    size="sm"
    variant="outline"
    onClick={() =>
      router.push(`/teacher/assignments/${a.id}/submissions`)
    }
  >
    Submissions
  </Button>

  {a.status === 'Draft' && (
    <Button
      size="sm"
      variant="destructive"
      onClick={() => handleDelete(a.id)}
    >
      Delete
    </Button>
  )}
</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
````

## File: src/lib/auth/AuthContext.tsx
````typescript
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

type Role = 'Admin' | 'Teacher' | 'Student';

interface User {
  userId: string;
  email: string;
  fullName: string;
  role: Role;
}

interface LoginResponseData {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: Role;
  };
}

interface ApiResponse<T> {
  data: T;
}

interface StoredAuth {
  token: string;
  user: User;
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeTimer = window.setTimeout(() => {
      const stored = localStorage.getItem('auth');
      if (stored) {
        try {
          const data = JSON.parse(stored) as StoredAuth;
          setUser(data.user);
          setToken(data.token);
          document.cookie = `token=${data.token}; path=/; max-age=86400`;
        } catch {
          localStorage.removeItem('auth');
          document.cookie = 'token=; path=/; max-age=0';
        }
      }
      setIsLoading(false);
    }, 0);

    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      router.replace('/login');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.clearTimeout(initializeTimer);
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', {
      email,
      password,
    });
    const data = response.data.data;
    const nextUser: User = {
      userId: data.user.id,
      email: data.user.email,
      fullName: data.user.fullName,
      role: data.user.role,
    };

    setUser(nextUser);
    setToken(data.token);
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: nextUser }));
    document.cookie = `token=${data.token}; path=/; max-age=86400`;

    if (nextUser.role === 'Admin') router.push('/admin/dashboard');
    else if (nextUser.role === 'Teacher') router.push('/teacher/dashboard');
    else router.push('/student/dashboard');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  return <Ctx.Provider value={{ user, token, isLoading, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const context = useContext(Ctx);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
````
