import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ testDetails }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookedItem = {
      email: user.email,
      testId: testDetails._id,
      image: testDetails.image,
      price: testDetails.price,
      slots: testDetails.slots,
      date: testDetails.date,
      short_description: testDetails.short_description,
      report_status: "pending",
    };
    axiosPublic
      .post("/bookedTest", bookedItem)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          navigate("/");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Booking is successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      toast.success("Payment Successful");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="project-btn mt-5" type="submit" disabled={!stripe}>
        Pay Now!
      </button>
    </form>
  );
};

export default CheckOutForm;
CheckOutForm.propTypes = {
  testDetails: PropTypes.object,
};
