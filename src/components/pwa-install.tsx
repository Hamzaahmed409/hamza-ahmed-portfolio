"use client";

import { useEffect, useState } from "react";
import { Download, Share, X, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (PWA active)
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error - iOS specific standalone check
      window.navigator.standalone === true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsStandalone(isStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Register Service Worker
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Check if user previously dismissed prompt in this session
    const isDismissed = sessionStorage.getItem("pwa-prompt-dismissed");
    if (isDismissed) {
      setDismissed(true);
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setTimeout(() => setInstalled(false), 4000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  }

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  }

  // If already running as installed standalone app, don't show prompt
  if (isStandalone) {
    return null;
  }

  // Toast notification on successful installation
  if (installed) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-sea/30 bg-card/95 px-4 py-3 text-sm font-medium text-sea shadow-2xl backdrop-blur-xl">
        <Check className="size-4 shrink-0 text-sea" />
        <span>Portfolio installed successfully!</span>
      </div>
    );
  }

  return (
    <>
      {/* Floating Install Prompt Banner (Android, Chrome, Edge, Desktop & iOS) */}
      {(isInstallable || isIOS) && !dismissed ? (
        <div className="fixed bottom-5 right-5 z-50 flex max-w-[340px] items-center gap-3 rounded-2xl border border-border/80 bg-card/95 p-3.5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 animate-rise sm:bottom-6 sm:right-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sea text-white shadow-md shadow-sea/30">
            <Download className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">Install Portfolio App</p>
            <p className="text-xs text-muted-foreground">
              {isIOS
                ? "Add to your Home Screen"
                : "Instant offline access & fast launch"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleInstallClick}
              className="rounded-full bg-sea px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sea/90 dark:text-[#042f2e]"
            >
              Install
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss install prompt"
              className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      ) : null}

      {/* iOS Instructions Modal */}
      {showIOSModal ? (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-sea/15 text-sea">
                <Share className="size-5" />
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">
              Install on iPhone / iPad
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Follow these simple steps in Safari to add to your Home Screen:
            </p>
            <ol className="mt-4 space-y-3 text-xs text-foreground/90">
              <li className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sea text-white font-mono text-[10px] font-bold">
                  1
                </span>
                <span>
                  Tap the <strong className="text-ink">Share button</strong> (
                  <Share className="inline size-3 text-sea" />) in Safari toolbar.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sea text-white font-mono text-[10px] font-bold">
                  2
                </span>
                <span>
                  Scroll down and tap <strong className="text-ink">Add to Home Screen</strong>.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sea text-white font-mono text-[10px] font-bold">
                  3
                </span>
                <span>
                  Tap <strong className="text-ink">Add</strong> in top right.
                </span>
              </li>
            </ol>
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full rounded-full bg-sea py-2.5 text-xs font-semibold text-white transition hover:bg-sea/90 dark:text-[#042f2e]"
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
