/* eslint-disable no-unused-vars */
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ModernArrow = ({ className, onClick, icon: Icon, style }) => (
  <button
    onClick={onClick}
    className={`
            ${className}
            bg-white/10 text-white
            hover:bg-red-500/20 hover:text-red-400
            transition-colors duration-300
            rounded-full p-2
            shadow-lg
            border border-white/10
            z-20 // Increased z-index
        `}
    style={style}
  >
    <Icon className="h-6 w-6" />
  </button>
);

export default ModernArrow;
