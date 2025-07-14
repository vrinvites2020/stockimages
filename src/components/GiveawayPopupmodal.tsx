import { useEffect, useState } from "react";
import GiveawayPopup from "./GiveawayPopup";

/**
 * GiveawayPopupWithCooldown
 *
 * Shows the GiveawayPopup modal only if the user hasn't dismissed it in this browser tab/window session.
 * Uses sessionStorage to track dismissal. Appears on first load of a new tab/window, not on page navigation.
 *
 * Usage:
 *   <GiveawayPopupWithCooldown />
 */
export default function GiveawayPopupWithCooldown() {
  const [show, setShow] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const GIVEAWAY_POPUP_SESSION_KEY = "giveawayPopupDismissedSession";

  useEffect(() => {
    setHasMounted(true);
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(GIVEAWAY_POPUP_SESSION_KEY);
    setShow(!dismissed);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(GIVEAWAY_POPUP_SESSION_KEY, "1");
    setShow(false);
  };

  if (!hasMounted) return null; // SSR safety
  return <GiveawayPopup open={show} onClose={handleClose} />;
} 