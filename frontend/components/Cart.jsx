import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { centsToDollars } from "@/utils/centsToDollars";

function CartItem({ data }) {
  const { addItem, removeItem } = useAppContext();
  const { quantity, attributes } = data;

  return (
    <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-bold text-slate-800 mb-1">{attributes.name}</h6>
          <span className="block pb-4 mb-auto font-medium text-gray-400">
            {quantity} x ${centsToDollars(attributes.price)}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button
              className="mr-2 inline-block mb-auto font-medium text-sm text-slate-400 hover:text-sky-700"
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className="inline-block mb-auto font-medium text-sm text-slate-400 hover:text-sky-700"
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className="block mt-2 text-sm font-bold text-sky-700">
            ${centsToDollars(attributes.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const router = useRouter();
  const { user, cart, showCart, setShowCart } = useAppContext();
  const total = cart.total;
  const displayTotal = Math.abs(total);

  function loginRedirect() {
    router.push("/login");
  }

  function cartRedirect() {
    setShowCart(false);
    router.push("/checkout");
  }

  return (
    <section className="fixed top-3 w-full flex justify-center z-50">
      <div className="relative">
        <button
          onClick={() => setShowCart((prevState) => !prevState)}
          className="absolute right-0 z-10  bg-white border-2 border-sky-500 text-sky-800 p-3 rounded-full hover:text-sky-800 hover:border-sky-600 items-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3334 8.16667V4.83333C11.3334 2.99238 9.84099 1.5 8.00004 1.5C6.15909 1.5 4.66671 2.99238 4.66671 4.83333V8.16667M2.16671 6.5H13.8334L14.6667 16.5H1.33337L2.16671 6.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        {showCart && (
          <div className="rounded-3xl co bg-white glass border-2 border-sky-500">
            <div className="max-w-lg pt-6 pb-8 px-8 mx-auto">
              <div className="flex mb-10 items-center justify-between">
                <h6 className="font-bold text-2xl text-sky-700 mb-0">
                  Your Cart
                </h6>
              </div>

              <div>
                {cart.items
                  ? cart.items.map((item, index) => {
                      if (item.quantity > 0) {
                        return <CartItem key={index} data={item} />;
                      }
                    })
                  : null}
              </div>
              <div className="p-6">
                <div className="flex mb-6 content-center justify-between">
                  <span className="font-bold text-slate-700">Order total</span>
                  <span className="text-sm font-bold text-slate-700">
                    ${centsToDollars(displayTotal)}
                  </span>
                </div>
                
                <button
                  onClick={() => cartRedirect()}
                  // onClick={() => (user ? cartRedirect() : loginRedirect())}
                  className="inline-block w-full px-6 py-3 text-center font-bold border-2 border-sky-500 bg-white text-sky-500 hover:bg-sky-600 hover:border-sky-600 hover:text-white transition duration-200 rounded-full"
                >
                  {user ? "Pay Now" : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
