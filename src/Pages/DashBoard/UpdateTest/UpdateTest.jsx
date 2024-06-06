import { useLoaderData } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateTest = () => {
  const test = useLoaderData();
  const axiosSecure = UseAxiosSecure();
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.testName.value;
    const image = form.image.value;
    const short_description = form.testDetails.value;
    const price = form.price.value;
    const date = form.testTime.value;
    const slots = form.slots.value;
    const testInfo = { title, image, short_description, price, date, slots };
    axiosSecure
      .patch(`/allTest/${test?._id}`, testInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Test is Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2 className="text-3xl font-bold text-center py-10">Update Test</h2>
      <div>
        <form onSubmit={handleUpdate}>
          {/* test name and image  */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Test Name</span>
              </div>
              <input
                type="text"
                name="testName"
                placeholder="Test Name"
                className="input input-bordered w-full"
                defaultValue={test?.title}
              />
            </label>
            {/* image */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Image Url</span>
              </div>
              <input
                type="text"
                name="image"
                placeholder="Image Url"
                className="input input-bordered w-full"
                defaultValue={test?.image}
              />
            </label>
          </div>
          {/* details and price  */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* details */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Test Details</span>
              </div>
              <input
                type="text"
                name="testDetails"
                placeholder="Test Details"
                className="input input-bordered w-full "
                defaultValue={test?.short_description}
              />
            </label>
            {/* price */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full "
                defaultValue={test?.price}
              />
            </label>
          </div>
          {/* Time and slots  */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* time */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Test Time</span>
              </div>
              <input
                type="date"
                name="testTime"
                placeholder="Test Time"
                className="input input-bordered w-full "
                defaultValue={test?.date}
              />
            </label>
            {/* slots */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Slots</span>
              </div>
              <input
                type="number"
                name="slots"
                placeholder="slots"
                className="input input-bordered w-full "
                defaultValue={test?.slots}
              />
            </label>
          </div>
          <button type="submit" className="project-btn w-full my-5">
            Update Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTest;
