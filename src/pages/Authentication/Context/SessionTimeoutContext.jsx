import React, { createContext, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

// Create the context
export const SessionTimeoutContext = createContext();

export const SessionTimeoutProvider = ({ children }) => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  let inactivityTimeout;

  // Function to handle session expiration
  const handleSessionExpiration = () => {
    setIsSessionExpired(true);
    setModal(true); // Show the modal
  };

  // Start the inactivity timer (2 minutes)
  const startInactivityTimer = () => {
    inactivityTimeout = setTimeout(handleSessionExpiration, 120000); // 2 minutes
  };

  // Reset timer on user activity
  const resetTimer = () => {
    if (isSessionExpired) return; // Do nothing if the session is already expired
    clearTimeout(inactivityTimeout); // Clear existing timeout
    startInactivityTimer(); // Restart the timer
  };

  // Function to reset everything when user logs in
  const resetSession = () => {
    setIsSessionExpired(false); // Reset the expiration state
    setModal(false); // Hide modal if it's open
    resetTimer(); // Restart inactivity timer
  };

  // Event listeners for user activity
  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer); // Detect touch events

    // Start the timer when the app loads
    startInactivityTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      clearTimeout(inactivityTimeout); // Clear timeout on unmount
    };
  }, [isSessionExpired]);

  // Redirect to login page when session expires
  const redirectToLogin = () => {
    setModal(false);
    navigate("/login");
  };

  return (
    <SessionTimeoutContext.Provider value={{ isSessionExpired, resetSession }}>
      {children}

      {/* Modal to alert session expiration */}
      <Modal isOpen={modal}>
        <ModalHeader>Session Expired</ModalHeader>
        <ModalBody>
          Your session has expired due to inactivity. Please log in again.
          <div className="mt-3">
            <Button color="danger" onClick={redirectToLogin}>
              Login Again
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </SessionTimeoutContext.Provider>
  );
};
