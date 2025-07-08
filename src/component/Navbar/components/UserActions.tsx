import { Link } from "react-router-dom";
import { IoHeartOutline, IoCartOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from "../../../context/hooks/useAuthContext";
import { useCartContext } from "../../../context/hooks/useCartContext";
import AvatarWithDropdown from "../../AvatarWithDropdown/Index";

interface UserActionsProps {
  onCartClick: () => void;
  wishlistCount?: number;
}

const UserActions = ({ onCartClick, wishlistCount = 0 }: UserActionsProps) => {
  const { isAuthenticated } = useAuthContext();
  const { cart } = useCartContext();

  return (
    <div className="flex items-center gap-3">
      <Link to="/wishlist" className="nav-icon-link">
        <div className="relative">
          <IoHeartOutline className="w-6 h-6" aria-label="Wishlist" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
      </Link>
      <Link to="/cart" className="nav-icon-link block md:hidden">
        <div className="relative">
          <IoCartOutline className="w-6 h-6" aria-label="Cart" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </Link>
      <div className="relative cursor-pointer hidden md:block" onClick={onCartClick}>
        <IoCartOutline className="w-6 h-6" aria-label="Cart" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>
      {isAuthenticated ? (
        <AvatarWithDropdown />
      ) : (
        <Link to="/login" className="nav-icon-link">
          <FaUserCircle className="w-6 h-6" aria-label="Login" />
        </Link>
      )}
    </div>
  );
};

export default UserActions; 