import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AddTest = () => {
  const axiosSecure = UseAxiosSecure();
  const handleAddTest = (e) => {
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
      .post("/allTest", testInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Test is Added to the list",
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
      <h2 className="text-3xl font-bold text-center py-10">Add a new test</h2>
      <div>
        <form onSubmit={handleAddTest}>
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
              />
            </label>
          </div>
          <button type="submit" className="project-btn w-full my-5">
            Add Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
