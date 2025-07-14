import { useEffect, useState } from "react";
import GiveawayPopup from "./GiveawayPopup";

/**
 * GiveawayPopupWithCooldown
 *
 * Shows the GiveawayPopup modal only if the user hasn't dismissed it in the last `cooldownHours`.
 * Handles localStorage and SSR safety. Use this component at the root of your page.
 *
 * Props:
 *   - cooldownHours?: number (default: 6)
 *
 * Usage:
 *   <GiveawayPopupWithCooldown cooldownHours={6} />
 */
export default function GiveawayPopupWithCooldown({ cooldownHours = 6 }: { cooldownHours?: number }) {
  const [show, setShow] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const GIVEAWAY_POPUP_KEY = "giveawayPopupDismissedAt";

  useEffect(() => {
    setHasMounted(true);
    if (typeof window === "undefined") return;
    const dismissedAt = localStorage.getItem(GIVEAWAY_POPUP_KEY);
    if (!dismissedAt) {
      setShow(true);
      return;
    }
    const dismissedTime = new Date(parseInt(dismissedAt, 10));
    const now = new Date();
    const hoursSinceDismissed = (now.getTime() - dismissedTime.getTime()) / (1000 * 60 * 60);
    setShow(hoursSinceDismissed >= cooldownHours);
  }, [cooldownHours]);

  const handleClose = () => {
    localStorage.setItem(GIVEAWAY_POPUP_KEY, Date.now().toString());
    setShow(false);
  };

  if (!hasMounted) return null; // SSR safety
  return <GiveawayPopup open={show} onClose={handleClose} />;
} 