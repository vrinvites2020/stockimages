import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';

/**
 * FixedContact component
 * Displays a fixed contact card with social media links
 * Positioned at bottom-right corner with hover animations
 */
const FixedContact = () => {
  return (<>
         {/* Fixed Contact Card with Icons */}
         <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center p-4 rounded-lg shadow-lg bg-gray-800 bg-opacity-75 md:bottom-8 md:right-8">
         <p className="text-white text-sm font-medium drop-shadow mb-2">For more details contact</p>
         <div className="flex space-x-4">
           <a href="https://whatsapp.com/channel/0029Vb5pUGIEwEjtvpcKZD0U" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
             {/* Font Awesome WhatsApp icon */}
             <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-4xl md:text-5xl" />
           </a>
           <a href="https://t.me/+vh3UIWbhB09kYjU1" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
             {/* Font Awesome Telegram icon */}
             <FontAwesomeIcon icon={faTelegram} className="text-blue-500 text-4xl md:text-5xl" />
           </a>
           <a href="https://www.youtube.com/@vrvisualmagics93/videos" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
             {/* Font Awesome Youtube icon */}
             <FontAwesomeIcon icon={faYoutube} className="text-red-500 text-4xl md:text-5xl" />
           </a>
         </div>
       </div>
       </>
  );
};

export default FixedContact; 