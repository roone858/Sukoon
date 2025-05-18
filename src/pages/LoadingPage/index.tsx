import logo from "../../assets/logo.png";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 rounded-full opacity-30 animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-50 rounded-full opacity-20 animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative z-10">
        {/* Logo Container with Enhanced Animation */}
        <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center mb-8 animate-pulse">
          <div className={`w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center ${styles.animateSpinSlow}`}>
            <div className="w-20 h-20 rounded-full bg-purple-300 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-400 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-purple-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="text-center items-center justify-center flex flex-col transform transition-all duration-500 hover:scale-105">
          <img 
            src={logo} 
            alt="logo" 
            className={`w-28 h-28  ${styles.animateFloat}`}
          />  
          <p className="text-purple-600 text-lg font-medium">جاري التحميل...</p>
        </div>

        {/* Enhanced Loading Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
