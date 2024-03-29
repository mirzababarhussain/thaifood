/**
 * The CheckoutCart component renders a list of items in a cart with options to remove or add items,
 * displaying the total order amount.
 * @returns The CheckoutCart component is being returned. It displays the user's cart items with
 * options to remove or add items, along with the total order amount.
 */
import { useAppContext } from "@/context/AppContext";
import { centsToDollars } from "@/utils/centsToDollars";

function CartItem({ data }) {
  const { addItem, removeItem } = useAppContext();
  const { quantity, attributes } = data;
  return (
    <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-bold text-slate-700 mb-1">{attributes.name}</h6>
          <span className="block pb-4 mb-auto font-medium text-slate-400">
            {quantity} x ${centsToDollars(attributes.price)}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button
              className="mr-2 inline-block mb-auto font-medium text-sm text-gray-400 hover:text-red-200"
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className="inline-block mb-auto font-medium text-sm text-gray-400 hover:text-red-200"
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className="block mt-2 text-sm font-bold text-slate-700">
            ${centsToDollars(attributes.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCart() {
  const { cart } = useAppContext();
  const total = cart.total;
  const displayTotal = Math.abs(total);

  return (
    <div className="rounded-2xl co bg-white glass border-2 border-sky-500">
      <div className="max-w-lg pt-6 pb-8 px-8 mx-auto bg-blueGray-900">
        <div className="flex mb-10 items-center justify-between">
          <h6 className="font-bold text-2xl text-sky-600 mb-0">Your Cart</h6>
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
            <span className="font-bold text-sky-600">Order total</span>
            <span className="text-sm font-bold text-slate-600">
              ${centsToDollars(displayTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}