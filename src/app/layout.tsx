'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const pathname = usePathname();


  const isAuthPage =
    pathname.startsWith('/auth/sign-in') || pathname.startsWith('/auth/sign-up');

  return (
    <html lang="en">
      <head>
        <link rel="manifest" id="tenant-manifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={`${inter.className} bg-gray-100`} style={{ margin: 0 }}>
        <ClerkProvider>
          {isAuthPage ? (
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {children}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  pt: '60px',
                  px: '12px',
                  transition: theme =>
                    theme.transitions.create(['width', 'margin'], {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
              >
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: { xs: 1, sm: 3 },
                    overflow: 'auto',
                    backgroundColor: '#F3F4F6',
                    height: '100%',
                    borderRadius: '8px',
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
