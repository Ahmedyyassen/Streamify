import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import 'stream-chat-react/dist/css/v2/index.css';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


  const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
