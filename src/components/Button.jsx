import { Loader } from 'lucide-react';

const variants = {
  primary: 'bg-[#57288F] text-white hover:bg-[#452073] focus:ring-[#57288F]',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200',
  success: 'bg-[#4CA37D] text-white hover:bg-[#3d8566] focus:ring-[#4CA37D]',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
};

export default function Button({ children, variant = 'primary', loading = false, disabled = false, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm ${variants[variant]} ${className}`}
    >
      {loading && <Loader className="animate-spin w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}
