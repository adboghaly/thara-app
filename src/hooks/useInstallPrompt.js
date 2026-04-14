import { useState, useEffect } from 'react';

export function useInstallPrompt() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const ready = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', ready);

    return () => {
      window.removeEventListener('beforeinstallprompt', ready);
    };
  }, []);

  const triggerInstall = async () => {
    if (!installPromptEvent) return;
    
    // Show the install prompt
    installPromptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await installPromptEvent.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setInstallPromptEvent(null);
    } else {
      console.log('User dismissed the install prompt');
    }
  };

  return { installPromptEvent, triggerInstall };
}
