import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoginModal } from './LoginModal';
import { ThemeToggle } from './theme-toggle';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

function setRef<T>(ref: React.Ref<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function useComposedRefs<T>(...refs: React.Ref<T>[]) {
  return useCallback((node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  }, refs);
}
export const Welcome = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'> & WelcomeProps>(
  ({ disabled, startButtonText, onStartCall }, ref) => {
    const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
    const [currentStatSlide, setCurrentStatSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHoveringIcon, setIsHoveringIcon] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(ref, sectionRef);

    const features = [
      {
        title: 'Instant IT Support',
        desc: 'Get immediate assistance with hardware, software, network issues, and password resets through natural voice conversation.',
      },
      {
        title: 'Smart Troubleshooting',
        desc: "AI-powered diagnostics guide you through step-by-step solutions with real-time support powered by LiveKit's infrastructure.",
      },
      {
        title: 'Automatic Ticket Creation',
        desc: 'When issues need escalation, tickets are automatically created and sent to our IT team for quick follow-up.',
      },
    ];

    const stats = [
      { value: '24/7', label: 'IT Support', sublabel: 'Always available when you need help' },
      {
        value: 'Instant',
        label: 'Issue Resolution',
        sublabel: 'Quick troubleshooting and solutions',
      },
      { value: 'Smart', label: 'Ticket System', sublabel: 'Auto-escalation to IT team' },
      { value: '99%', label: 'Success Rate', sublabel: 'Fast and accurate IT assistance' },
    ];

    useEffect(() => {
      const timings = [0, 250, 500];
      const timeouts = timings.map((delay, index) =>
        setTimeout(() => {
          setVisibleFeatures((prev) => [...prev, index]);
        }, delay)
      );
      return () => timeouts.forEach((timeout) => clearTimeout(timeout));
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStatSlide((prev) => (prev + 1) % stats.length);
      }, 4000);
      return () => clearInterval(interval);
    }, [stats.length]);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
      const scrollContainer = sectionRef.current;
      const handleScroll = () => {
        if (scrollContainer) {
          setScrollY(scrollContainer.scrollTop);
        }
      };

      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }, []);

    const getFeatureIcon = (index: number) => {
    const icons = [
      // Headset icon for IT Support
      <svg
        key="headset"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a7 7 0 00-14 0v2m14 0v4a2 2 0 01-2 2h-2"
        />
      </svg>,
      // Tool/wrench icon for Troubleshooting
      <svg
        key="tool"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>,
      // Ticket/clipboard icon for Ticket System
      <svg
        key="ticket"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>,
    ];
    return icons[index];
  };

    const handleStartCall = () => {
      if (disabled) return;

      const loginTimestamp = localStorage.getItem('loginTimestamp');
      const oneHour = 60 * 60 * 1000;

      if (loginTimestamp && Date.now() - parseInt(loginTimestamp, 10) < oneHour) {
        // If a valid session exists, start the call directly
        onStartCall();
      } else {
        // Otherwise, open the login modal
        setIsLoginOpen(true);
      }
    };

    return (
      <>
        {/* 🌙 Transparent & Aesthetic Scrollbar Styling */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
          * {
            font-family: 'Inter', sans-serif !important;
          }
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(168, 130, 255, 0.4); /* A gentle purple */
            border-radius: 12px;
            transition: background 0.3s ease;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(168, 130, 255, 0.6);
          }
          html.dark ::-webkit-scrollbar-thumb {
            background: rgba(168, 130, 255, 0.3); /* A gentle purple for dark mode */
          }
          html.dark ::-webkit-scrollbar-thumb:hover {
            background: rgba(168, 130, 255, 0.5);
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>

        {/* Animated Background Orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="animate-float absolute -z-10 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500/5 to-violet-500/5 blur-3xl sm:h-96 sm:w-96"
              style={{ top: '-10%', left: '-5%' }}
            />
            <div
              className="animate-float-reverse absolute -z-10 h-64 w-64 rounded-full bg-gradient-to-r from-violet-500/5 to-indigo-500/5 blur-3xl sm:h-96 sm:w-96"
              style={{ bottom: '-10%', right: '-5%' }}
            />
          </div>
        </div>

        <section
          ref={composedRef}
          className={cn(
            'fixed inset-0 flex h-screen w-screen flex-col overflow-y-auto bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50',
            'dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-800/20 dark:to-slate-900',
            disabled ? 'z-10' : 'z-20'
          )}
        >
          {/* Header Navigation */}
          <div className="xs:px-6 xs:py-5 fixed top-0 right-0 left-0 z-20 flex items-center justify-between border-b border-black/10 px-4 py-4 backdrop-blur-sm sm:px-8 sm:py-6 md:px-10 md:py-7 lg:px-16 dark:border-white/10">
            <a
              href="https://10xds.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              {/* Light Mode Logo - Black */}
              <svg
                className="xs:h-8 animate-in fade-in slide-in-from-left-4 block h-6 w-auto transition-all duration-700 group-hover:opacity-75 sm:h-10 dark:hidden"
                viewBox="0 0 88 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m69.9 27.2c0-0.1 0.2-0.3 0.5-0.4q0.4-0.2 0.6-0.2 0.4 0 0.5 0.4 0.1 0.6 0.3 1.3 0.3 0.7 0.8 1.6 0.5 0.9 1.2 1.6 0.7 0.6 1.8 1.1 1.1 0.5 2.3 0.5 0.5 0 1.1-0.1 0.5-0.2 1-0.4 0.5-0.2 0.8-0.6 0.4-0.3 0.7-0.8 0.3-0.4 0.5-1.1 0.2-0.6 0.2-1.3 0-0.5-0.1-0.9-0.2-0.5-0.4-0.9-0.2-0.4-0.4-0.8-0.3-0.3-0.7-0.7-0.4-0.4-0.7-0.6-0.3-0.3-0.8-0.6-0.5-0.3-0.8-0.5-0.3-0.2-0.9-0.6-0.5-0.3-0.8-0.4-0.1-0.1-0.3-0.2-0.6-0.4-0.9-0.6-0.4-0.2-1-0.6-0.6-0.5-0.9-0.7-0.3-0.3-0.8-0.8-0.5-0.4-0.8-0.8-0.3-0.3-0.6-0.9-0.4-0.5-0.5-1-0.2-0.5-0.3-1.1-0.1-0.6-0.1-1.2 0-1.5 0.7-2.8 0.6-1.4 1.8-2.3 1.1-0.9 2.5-1.4 1.5-0.5 3-0.5c1.4 0 5.1 0 5.1 0 0.2 0 0.3 0 0.7 0 0.1 0 0.6 0 0.8 0 0 0 0 4.6 0 7.1 0 0.2-0.2 0.3-0.4 0.3q-1.1 0-1.2-0.3 0-0.7-0.3-1.4-0.3-0.7-0.7-1.5-0.5-0.7-1.1-1.3-0.5-0.6-1.3-1-0.8-0.4-1.7-0.3-1.8 0-2.8 1-1 1-1 2.8 0 0.4 0.1 0.8 0.1 0.4 0.2 0.7 0.1 0.4 0.4 0.7 0.3 0.4 0.5 0.7 0.2 0.3 0.7 0.6 0.4 0.4 0.6 0.6 0.3 0.2 0.8 0.6 0.5 0.3 0.7 0.5 0.3 0.1 0.8 0.5 0.6 0.4 0.8 0.5 0.3 0.2 0.8 0.5 0.5 0.3 0.8 0.5 0.2 0.2 0.7 0.5 0.5 0.3 0.8 0.6 0.2 0.2 0.7 0.6 0.4 0.3 0.6 0.6 0.3 0.4 0.6 0.8 0.3 0.4 0.5 0.8 0.2 0.4 0.3 0.9 0.2 0.5 0.3 1 0.1 0.5 0.1 1.1 0 1.6-0.7 2.9-0.7 1.4-1.9 2.4-1.1 0.9-2.6 1.4-1.5 0.6-3.1 0.6c-0.1 0-2.3 0-2.4 0-0.1 0-2.5 0-2.5 0-0.1 0-3.2 0-3.2 0 0-1 0-3.1 0-4.6 0-1.4 0-1.9 0-2.9z"
                  fill="#000000"
                />
                <path
                  d="m-0.5 12.2q0-0.3 0-0.4 1.7-0.7 3.8-1.6 2.1-1 3.3-1.5 1.1-0.5 1.2-0.5 0.2 0 0.3 0.2 0.1 0.3 0.2 0.5-0.4 1.3-0.4 3.8v16.3q0 2.5 0.3 3.4 0.1 0.3 1.1 0.5 0.9 0.2 1.5 0.2 0.1 0.2 0.1 0.7 0 0.4-0.1 0.6-3.2-0.2-5-0.2-1.8 0-5 0.2-0.1-0.2-0.1-0.6 0-0.5 0.1-0.7 0.6 0 1.6-0.2 0.9-0.2 1-0.5 0.3-0.9 0.3-3.4v-15.1q0-1-0.2-1.4-0.2-0.4-0.7-0.4-0.3 0-1.3 0.3-1 0.3-1.5 0.5-0.2 0-0.3-0.2-0.1-0.1-0.2-0.2 0-0.2 0-0.3z"
                  fill="#000000"
                />
                <path
                  fillRule="evenodd"
                  d="m11.8 21.3q0-2.7 0.7-5.1 0.7-2.4 1.8-4.2 1.2-1.7 2.9-2.8 1.7-1.1 3.7-1.1 2.7 0 4.9 1.7 2.1 1.7 3.3 4.7 1.1 3 1.1 6.8 0 2.6-0.7 5-0.7 2.4-1.9 4.2-1.2 1.8-2.9 2.8-1.8 1.1-3.8 1.1-2.6 0-4.7-1.7-2.1-1.6-3.2-4.6-1.2-3-1.2-6.8zm4.4 0.1q0 3.2 0.6 5.8 0.6 2.6 1.6 4.1 1.1 1.4 2.4 1.4 1.2 0 2.1-0.9 0.9-1 1.4-2.6 0.6-1.7 0.9-3.8 0.2-2.1 0.2-4.6 0-3.2-0.5-5.7-0.5-2.5-1.6-3.9-1-1.4-2.3-1.4-1.5 0-2.6 1.6-1.1 1.5-1.7 4.2-0.5 2.6-0.5 5.8z"
                  fill="#000000"
                />
                <path
                  d="m34.6 5.2q1.2-0.6 1.5-0.6 0.5 0 0.5 0.5 0 0.8-1.6 2.4l-0.8 0.9 2 3.2 1.2-0.8 0.3 0.5q-0.3 0.5-0.9 1.1-0.7 0.5-1.4 0.5-0.4 0-0.6-0.4l-2-3-0.3 0.5q-0.9 1.1-0.9 1.8 0 0.3 0.1 0.5l-0.4 0.2q-0.7 0.4-1.1 0.4-0.4 0-0.4-0.5 0-0.8 1.6-2.5l0.9-1-1.8-2.8-1.1 0.7-0.3-0.5q0.1-0.3 0.9-1 0.9-0.7 1.4-0.7 0.3 0 0.4 0.2l1.9 2.9q1.1-1.3 1.1-1.9 0-0.2-0.1-0.4z"
                  fill="#000000"
                />
                <path
                  d="m25.2 35c4.2-0.2 10.3-1.1 14.9-3 6.4-2.6 12.2-5.8 17.8-13.3 5-6.7 5.2-17.2 5.2-17.2h2.9c0 0-0.1 6-2.6 11.5-2.5 5.8-7 11.3-13.4 15.4-5.4 3.3-10.7 4.8-12.9 5.4-6 1.4-11.9 1.2-11.9 1.2z"
                  fill="#6e3c95"
                />
                <path
                  d="m54 21.9c-1.3 1.5-3.9 3.6-4.8 4.2-1.2 0.9-2.2 0.6-2.2-0.6 0-1.2 0-15.7 0-15.7l-2.8-0.4v-1.2c0 0 10.3 0 11.3 0 2.1 0 4.4 0.4 5.6 0.9 0.7 0.3 3.4 1.2 5 2.9 1.7 1.7 2.5 2.9 3.2 5.6 0.7 2.7 0.4 5.1 0.2 6.3-0.2 1.2-0.8 3.7-2.5 5.7-1.8 2-3.2 3.1-6.8 4.2-1.8 0.5-3.9 0.6-5.2 0.6-1.3 0-10.9 0-10.9 0v-1.3c0 0 1.7-0.3 1.9-0.3 1.4-0.6 0.7-1.2 1.7-1.9 1.2-0.8 6-3.9 6-3.9 0 0-1.5 1.8-2.1 2.7-0.8 1.3-0.7 2.4-0.1 2.9 0.3 0.3 0.7 0.3 3.4 0.3 1.9 0 4.8-0.5 7-2.8 1.3-1.3 1.9-3.1 2.1-3.8 0.2-0.7 0.7-2.9 0.5-6-0.2-3-0.7-3.8-1-4.7-0.4-1.2-2.1-3.3-3.2-4-1-0.7-2.6-1.8-5.9-1.8-1 0-2.9 0-2.9 0 0 1.9 0 2.1 0 2.6 0 6.7 0 9.4 0 9.8 0 0.4 0.4 0.6 0.8 0.5 0.5-0.2 1.7-0.8 1.7-0.8z"
                  fill="#000000"
                />
              </svg>

              {/* Dark Mode Logo - White */}
              <svg
                className="xs:h-8 animate-in fade-in slide-in-from-left-4 hidden h-6 w-auto transition-all duration-700 group-hover:opacity-90 sm:h-10 dark:block"
                viewBox="0 0 88 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m69.9 27.2c0-0.1 0.2-0.3 0.5-0.4q0.4-0.2 0.6-0.2 0.4 0 0.5 0.4 0.1 0.6 0.3 1.3 0.3 0.7 0.8 1.6 0.5 0.9 1.2 1.6 0.7 0.6 1.8 1.1 1.1 0.5 2.3 0.5 0.5 0 1.1-0.1 0.5-0.2 1-0.4 0.5-0.2 0.8-0.6 0.4-0.3 0.7-0.8 0.3-0.4 0.5-1.1 0.2-0.6 0.2-1.3 0-0.5-0.1-0.9-0.2-0.5-0.4-0.9-0.2-0.4-0.4-0.8-0.3-0.3-0.7-0.7-0.4-0.4-0.7-0.6-0.3-0.3-0.8-0.6-0.5-0.3-0.8-0.5-0.3-0.2-0.9-0.6-0.5-0.3-0.8-0.4-0.1-0.1-0.3-0.2-0.6-0.4-0.9-0.6-0.4-0.2-1-0.6-0.6-0.5-0.9-0.7-0.3-0.3-0.8-0.8-0.5-0.4-0.8-0.8-0.3-0.3-0.6-0.9-0.4-0.5-0.5-1-0.2-0.5-0.3-1.1-0.1-0.6-0.1-1.2 0-1.5 0.7-2.8 0.6-1.4 1.8-2.3 1.1-0.9 2.5-1.4 1.5-0.5 3-0.5c1.4 0 5.1 0 5.1 0 0.2 0 0.3 0 0.7 0 0.1 0 0.6 0 0.8 0 0 0 0 4.6 0 7.1 0 0.2-0.2 0.3-0.4 0.3q-1.1 0-1.2-0.3 0-0.7-0.3-1.4-0.3-0.7-0.7-1.5-0.5-0.7-1.1-1.3-0.5-0.6-1.3-1-0.8-0.4-1.7-0.3-1.8 0-2.8 1-1 1-1 2.8 0 0.4 0.1 0.8 0.1 0.4 0.2 0.7 0.1 0.4 0.4 0.7 0.3 0.4 0.5 0.7 0.2 0.3 0.7 0.6 0.4 0.4 0.6 0.6 0.3 0.2 0.8 0.6 0.5 0.3 0.7 0.5 0.3 0.1 0.8 0.5 0.6 0.4 0.8 0.5 0.3 0.2 0.8 0.5 0.5 0.3 0.8 0.5 0.2 0.2 0.7 0.5 0.5 0.3 0.8 0.6 0.2 0.2 0.7 0.6 0.4 0.3 0.6 0.6 0.3 0.4 0.6 0.8 0.3 0.4 0.5 0.8 0.2 0.4 0.3 0.9 0.2 0.5 0.3 1 0.1 0.5 0.1 1.1 0 1.6-0.7 2.9-0.7 1.4-1.9 2.4-1.1 0.9-2.6 1.4-1.5 0.6-3.1 0.6c-0.1 0-2.3 0-2.4 0-0.1 0-2.5 0-2.5 0-0.1 0-3.2 0-3.2 0 0-1 0-3.1 0-4.6 0-1.4 0-1.9 0-2.9z"
                  fill="#ffffff"
                />
                <path
                  d="m-0.5 12.2q0-0.3 0-0.4 1.7-0.7 3.8-1.6 2.1-1 3.3-1.5 1.1-0.5 1.2-0.5 0.2 0 0.3 0.2 0.1 0.3 0.2 0.5-0.4 1.3-0.4 3.8v16.3q0 2.5 0.3 3.4 0.1 0.3 1.1 0.5 0.9 0.2 1.5 0.2 0.1 0.2 0.1 0.7 0 0.4-0.1 0.6-3.2-0.2-5-0.2-1.8 0-5 0.2-0.1-0.2-0.1-0.6 0-0.5 0.1-0.7 0.6 0 1.6-0.2 0.9-0.2 1-0.5 0.3-0.9 0.3-3.4v-15.1q0-1-0.2-1.4-0.2-0.4-0.7-0.4-0.3 0-1.3 0.3-1 0.3-1.5 0.5-0.2 0-0.3-0.2-0.1-0.1-0.2-0.2 0-0.2 0-0.3z"
                  fill="#ffffff"
                />
                <path
                  fillRule="evenodd"
                  d="m11.8 21.3q0-2.7 0.7-5.1 0.7-2.4 1.8-4.2 1.2-1.7 2.9-2.8 1.7-1.1 3.7-1.1 2.7 0 4.9 1.7 2.1 1.7 3.3 4.7 1.1 3 1.1 6.8 0 2.6-0.7 5-0.7 2.4-1.9 4.2-1.2 1.8-2.9 2.8-1.8 1.1-3.8 1.1-2.6 0-4.7-1.7-2.1-1.6-3.2-4.6-1.2-3-1.2-6.8zm4.4 0.1q0 3.2 0.6 5.8 0.6 2.6 1.6 4.1 1.1 1.4 2.4 1.4 1.2 0 2.1-0.9 0.9-1 1.4-2.6 0.6-1.7 0.9-3.8 0.2-2.1 0.2-4.6 0-3.2-0.5-5.7-0.5-2.5-1.6-3.9-1-1.4-2.3-1.4-1.5 0-2.6 1.6-1.1 1.5-1.7 4.2-0.5 2.6-0.5 5.8z"
                  fill="#ffffff"
                />
                <path
                  d="m34.6 5.2q1.2-0.6 1.5-0.6 0.5 0 0.5 0.5 0 0.8-1.6 2.4l-0.8 0.9 2 3.2 1.2-0.8 0.3 0.5q-0.3 0.5-0.9 1.1-0.7 0.5-1.4 0.5-0.4 0-0.6-0.4l-2-3-0.3 0.5q-0.9 1.1-0.9 1.8 0 0.3 0.1 0.5l-0.4 0.2q-0.7 0.4-1.1 0.4-0.4 0-0.4-0.5 0-0.8 1.6-2.5l0.9-1-1.8-2.8-1.1 0.7-0.3-0.5q0.1-0.3 0.9-1 0.9-0.7 1.4-0.7 0.3 0 0.4 0.2l1.9 2.9q1.1-1.3 1.1-1.9 0-0.2-0.1-0.4z"
                  fill="#ffffff"
                />
                <path
                  d="m25.2 35c4.2-0.2 10.3-1.1 14.9-3 6.4-2.6 12.2-5.8 17.8-13.3 5-6.7 5.2-17.2 5.2-17.2h2.9c0 0-0.1 6-2.6 11.5-2.5 5.8-7 11.3-13.4 15.4-5.4 3.3-10.7 4.8-12.9 5.4-6 1.4-11.9 1.2-11.9 1.2z"
                  fill="#6e3c95"
                />
                <path
                  d="m54 21.9c-1.3 1.5-3.9 3.6-4.8 4.2-1.2 0.9-2.2 0.6-2.2-0.6 0-1.2 0-15.7 0-15.7l-2.8-0.4v-1.2c0 0 10.3 0 11.3 0 2.1 0 4.4 0.4 5.6 0.9 0.7 0.3 3.4 1.2 5 2.9 1.7 1.7 2.5 2.9 3.2 5.6 0.7 2.7 0.4 5.1 0.2 6.3-0.2 1.2-0.8 3.7-2.5 5.7-1.8 2-3.2 3.1-6.8 4.2-1.8 0.5-3.9 0.6-5.2 0.6-1.3 0-10.9 0-10.9 0v-1.3c0 0 1.7-0.3 1.9-0.3 1.4-0.6 0.7-1.2 1.7-1.9 1.2-0.8 6-3.9 6-3.9 0 0-1.5 1.8-2.1 2.7-0.8 1.3-0.7 2.4-0.1 2.9 0.3 0.3 0.7 0.3 3.4 0.3 1.9 0 4.8-0.5 7-2.8 1.3-1.3 1.9-3.1 2.1-3.8 0.2-0.7 0.7-2.9 0.5-6-0.2-3-0.7-3.8-1-4.7-0.4-1.2-2.1-3.3-3.2-4-1-0.7-2.6-1.8-5.9-1.8-1 0-2.9 0-2.9 0 0 1.9 0 2.1 0 2.6 0 6.7 0 9.4 0 9.8 0 0.4 0.4 0.6 0.8 0.5 0.5-0.2 1.7-0.8 1.7-0.8z"
                  fill="#ffffff"
                />
              </svg>
            </a>

            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Button                
                onClick={handleStartCall}
                disabled={disabled}
                className="xs:px-4 xs:py-2 ml-2 flex-shrink-0 transform rounded-lg border border-purple-400/30 bg-gradient-to-r from-purple-500 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-violet-600 hover:shadow-2xl sm:px-6 sm:py-2.5 sm:text-sm md:px-8"
              >
                {startButtonText}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="xs:pt-[82px] xs:pb-[66px] relative z-10 flex w-full flex-1 items-start pt-[74px] pb-[58px] sm:pt-[90px] sm:pb-[74px] md:pt-[98px] md:pb-[82px]">
            <div className="xs:gap-10 xs:px-8 xs:py-14 grid h-full w-full auto-rows-max grid-cols-1 gap-8 px-6 py-12 sm:gap-12 sm:px-10 sm:py-16 md:gap-14 md:px-12 md:py-18 lg:auto-rows-fr lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20">
              {/* Left Column */}
              <div className="xs:space-y-10 order-1 flex w-full flex-col justify-center space-y-8 sm:space-y-12 md:space-y-14 lg:order-1 lg:space-y-16">
                <div className="xs:space-y-5 animate-in fade-in slide-in-from-bottom-8 space-y-4 duration-1000 sm:space-y-6 md:space-y-8">
                  <div>
                    <span className="xs:px-3 xs:py-1.5 inline-block rounded-full border border-violet-500/30 bg-gradient-to-r from-purple-500/10 to-violet-500/10 px-2.5 py-1 text-xs font-semibold tracking-widest text-violet-600 uppercase sm:px-4 dark:text-violet-300">
                      AI-Powered IT Support
                    </span>
                  </div>
                  <h1 className="xs:text-3xl text-2xl leading-tight font-bold tracking-tight text-slate-700 sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl dark:text-white">
                    IT Helpdesk Support
                    <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                      Available 24/7
                    </span>
                  </h1>
                  <p className="xs:text-base max-w-xl text-sm leading-relaxed font-light text-slate-600 sm:text-lg md:text-lg dark:text-slate-300">
                    Get instant IT support through natural voice conversation. Our AI assistant helps
                    troubleshoot issues, provides step-by-step solutions, and automatically creates
                    helpdesk tickets when needed.
                  </p>
                </div>

                <div className="xs:space-y-4 space-y-3 sm:space-y-5">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`group xs:p-4 transform rounded-xl border border-black/10 bg-black/5 p-3 transition-all duration-500 hover:border-violet-500/30 hover:bg-black/10 sm:p-5 md:p-6 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 ${
                        visibleFeatures.includes(index)
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="xs:gap-4 flex items-start gap-3">
                        <div className="xs:w-10 xs:h-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-violet-500/30 bg-gradient-to-br from-purple-500/10 to-violet-500/10 text-violet-500 transition-colors group-hover:text-violet-400 dark:text-violet-400 dark:group-hover:text-violet-300">
                          {getFeatureIcon(index)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="mb-0.5 text-sm font-semibold text-slate-700 transition-colors group-hover:text-violet-500 sm:mb-1 sm:text-base dark:text-white dark:group-hover:text-violet-300">
                            {feature.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-slate-500 sm:text-sm dark:text-slate-400">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="xs:pt-3 pt-2 sm:pt-4">
                  <Button
                    onClick={handleStartCall}
                    disabled={disabled}
                    className="xs:px-6 xs:py-3 xs:text-base w-full transform rounded-lg border border-violet-400/40 bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:border-violet-300/60 hover:from-purple-700 hover:to-violet-700 hover:shadow-2xl sm:px-8 sm:py-3.5 md:px-10 md:py-4 md:text-lg lg:w-auto"
                  >
                    Get IT Support Now
                  </Button>
                </div>
              </div>

              {/* Right Column */}
              <div className="order-1 flex w-full flex-col items-center justify-start gap-26 lg:order-2">
                {/* Animated Icon Container - Pushes stats to the bottom */}
                <div className="w-full">
                  <div
                    className="group relative flex w-full cursor-pointer items-center justify-center"
                    style={{ minHeight: '280px' }}
                    onMouseEnter={() => setIsHoveringIcon(true)}
                    onMouseLeave={() => setIsHoveringIcon(false)}
                  >
                    {/* Glowing backdrop */}
                    <div className="animate-pulse-ring absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 via-violet-600/20 to-indigo-600/30 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Glowing ring around avatar */}
                    <div className="animate-spin-slow absolute h-72 w-72 rounded-full border-2 border-violet-500/30 blur-lg" />

                    {/* Floating outer rings */}
                    <div className="animate-spin-slow reverse absolute h-64 w-64 rounded-full border border-violet-500/20" />
                    <div className="animate-spin-slow absolute h-48 w-48 rounded-full border border-purple-500/20" />

                    {/* Main Icon */}
                    <div
                      className="xs:w-32 xs:h-32 relative flex h-28 w-28 flex-shrink-0 transform items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-violet-500/50 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56"
                      style={{
                        transform: `rotate(${Math.max(-10, -scrollY / 20)}deg)`,
                        willChange: 'transform',
                      }}
                    >
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="xs:w-12 xs:h-12 h-10 w-10 text-white drop-shadow-lg sm:h-16 sm:w-16 md:h-20 md:w-20"
                      >
                        {/* Computer Monitor with Headset */}
                        <path
                          d="M8 12C8 10.8954 8.89543 10 10 10H54C55.1046 10 56 10.8954 56 12V42C56 43.1046 55.1046 44 54 44H10C8.89543 44 8 43.1046 8 42V12Z"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                        />
                        <path
                          d="M24 44V50H40V44"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 50H46"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        {/* Headset */}
                        <path
                          d="M20 22C20 18 24 15 32 15C40 15 44 18 44 22V28"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <circle cx="20" cy="28" r="3" fill="currentColor" />
                        <circle cx="44" cy="28" r="3" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Stats Carousel */}
                <div className="xs:max-w-sm xs:p-6 w-full max-w-xs rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 to-black/3 p-5 backdrop-blur-xl sm:p-8 md:p-10 dark:border-white/10 dark:from-white/5 dark:to-white/3">
                  <div className="text-center">
                    <div className="xs:h-28 relative h-24 overflow-hidden sm:h-32 md:h-36">
                      {stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                            idx === currentStatSlide
                              ? 'translate-y-0 opacity-100'
                              : idx < currentStatSlide
                                ? '-translate-y-8 opacity-0'
                                : 'translate-y-8 opacity-0'
                          }`}
                        >
                          <p className="xs:text-4xl xs:mb-2 mb-1.5 bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent sm:mb-3 sm:text-5xl md:mb-4 md:text-6xl">
                            {stat.value}
                          </p>
                          <p className="xs:text-sm text-xs font-semibold text-slate-700 md:text-base dark:text-white">
                            {stat.label}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {stat.sublabel}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="xs:gap-2 xs:mt-4 mt-3 flex justify-center gap-1.5 sm:mt-6 md:mt-8 md:gap-3">
                      {stats.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentStatSlide(idx)}
                          className={`rounded-full transition-all duration-500 ${
                            idx === currentStatSlide
                              ? 'xs:h-2.5 h-2 w-8 bg-gradient-to-r from-purple-400 to-violet-400 md:h-3'
                              : 'xs:w-2 xs:h-2 h-1.5 w-1.5 bg-black/30 hover:bg-black/50 md:h-3 md:w-3 dark:bg-white/30 dark:hover:bg-white/50'
                          }`}
                          aria-label={`Go to stat ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="xs:px-4 xs:py-4 relative right-0 bottom-0 left-0 z-20 border-t border-black/10 px-3 py-3 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-16 dark:border-white/10">
            <p className="text-center text-xs font-light text-slate-600 sm:text-sm dark:text-slate-400">
                Need help?{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://10xds.com/contact-us/"
                  className="font-semibold text-violet-500 underline underline-offset-2 transition-colors duration-300 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  Contact IT Support
                </a>{' '}
                · © Exponential Digital Solutions (10xDS) IT Helpdesk
              </p>
          </div>
        </section>

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSuccess={() => {
            localStorage.setItem('loginTimestamp', Date.now().toString());
            onStartCall();
            setIsLoginOpen(false);
          }}
        />
      </>
    );
  }
);
// Set a display name so ESLint's react/display-name rule is satisfied for the forwardRef component
Welcome.displayName = 'Welcome';
