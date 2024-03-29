import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useInitialRender } from "@/utils/useInitialRender";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutCart from "@/components/CheckoutCart";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Checkout() {
  const initialRender = useInitialRender();
  if (!initialRender) return null;

  return (
    <section className="container mx-auto py-24">
      <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
      {/* <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <CheckoutCart />
        </div>
        <div className="col-span-3">
          
        </div>
      </div> */}
    </section>
  );
}