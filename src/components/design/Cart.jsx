import { useEffect, useState } from "react";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import { useCart } from "../../context/CartContext";

import Section from "../Section";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Cart = () => {
  const { items, total, removeFromCart } = useCart();
  const { token } = useUser();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      if (!token) {
        sessionStorage.setItem("redirectAfterLogin", "/cart");
        navigate("/login");
        return;
      }
      navigate("/checkout");
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  console.log(items);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <div className="pt-[12rem] -mt-[5.25rem]" id="hero">
          <div className="container min-h-screen px-4 mx-auto">
            <div className="max-w-xl mx-auto mt-12 mb-2">
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-100  rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-black">
                  Your Cart
                </h2>

                {items.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Your cart is empty
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-[#1E1E1E] border border-[#3A3A3A]"
                        >
                          <div className="flex-1">
                            <div className="text-white mb-1">Line Numbers:</div>
                            <div className="text-[#54A9FF] font-medium">
                              {item.numbers.numbers?.join(", ")}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-white font-bold">
                              {item.price} EUR
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 rounded-lg hover:bg-[#3A3A3A] transition-colors text-gray-400 hover:text-red-400"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#3A3A3A] pt-4 mb-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-lg font-semibold text-gray-800">
                          Total Amount
                        </div>
                        <div className="text-2xl font-bold text-gray-800">
                          {total} EUR
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={items.length === 0}
                      className="w-full py-4 rounded-xl text-lg font-bold transition-all duration-200
                        bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-200
                        text-gray-800 hover:opacity-90 disabled:opacity-50 
                        disabled:cursor-not-allowed"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ButtonGradient />
    </>
  );
};

export default Cart;
