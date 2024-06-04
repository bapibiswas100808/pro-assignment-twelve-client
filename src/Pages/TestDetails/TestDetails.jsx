import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "../../Components/CheckOut/CheckOutForm";
import { useState } from "react";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);

const TestDetails = () => {
  const testDetails = useLoaderData();
  const [payableAmount, setPayableAmount] = useState(testDetails.price);
  const handleCoupon = (e) => {
    e.preventDefault();
    const form = e.target;
    const couponCode = form.coupon.value;

    if (couponCode === "med") {
      setPayableAmount(testDetails.price - (testDetails?.price * 15) / 100);
    } else if (couponCode === "diamed") {
      setPayableAmount(testDetails.price - (testDetails.price * 30) / 100);
    } else {
      setPayableAmount(testDetails?.price);
      toast.error("coupon do not Match!");
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto">
      <h2 className="text-3xl font-bold text-center py-10">Test Details</h2>
      <div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row gap-10 mb-10">
            <img
              src={testDetails?.image}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div className="">
              <h1 className="text-2xl font-bold mb-8">{testDetails?.title}</h1>
              <div className="flex gap-5">
                <p>
                  <span className="text-lg font-semibold">
                    Available Slots:
                  </span>
                  {testDetails.slots}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> $
                  {testDetails?.price}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>
                  {testDetails?.date}
                </p>
              </div>
              <p className="py-6">{testDetails?.short_description}</p>
              {testDetails.slots > 0 ? (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="project-btn"
                >
                  Book Now
                </button>
              ) : (
                "No slots Available"
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div>
            <p>
              <span className="text-lg font-semibold">
                Price of the product:
              </span>
              $ {testDetails.price}
            </p>
            <p>
              <span className="text-lg font-semibold">
                Price of the product:
              </span>
              $ {payableAmount > 0 ? payableAmount : testDetails?.price}
            </p>
            <p>Apply Coupon:</p>
            <form onSubmit={handleCoupon}>
              <input name="coupon" className="px-3 py-2 border" type="text" />
              {payableAmount >= testDetails.price && (
                <button type="submit" className="project-btn">
                  Apply
                </button>
              )}
            </form>
          </div>
          <h3 className="font-bold text-lg mb-4">
            Give your payment information!
          </h3>
          <Elements stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
          </Elements>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TestDetails;
