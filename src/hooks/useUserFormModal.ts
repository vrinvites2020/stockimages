import { useState, useEffect } from 'react';

export const useUserFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user has already submitted the form
    const hasSubmitted = localStorage.getItem('userFormSubmitted');
    
    if (!hasSubmitted) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal
  };
}; 