import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";

const AddBanner = () => {
  const axiosSecure = UseAxiosSecure();
  const handleAddBanner = (e) => {
    e.preventDefault();
    const form = e.target;
    const bannerName = form.bannerName.value;
    const image = form.image.value;
    const title = form.title.value;
    const description = form.description.value;
    const couponCode = form.couponCode.value;
    const couponRate = form.couponRate.value;
    const isActive = "false";
    const bannerInfo = {
      bannerName,
      image,
      title,
      description,
      couponCode,
      couponRate,
      isActive,
    };
    axiosSecure
      .post("/allBanner", bannerInfo)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Banner is Added SUccessfully",
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
      <h3 className="text-3xl fnt-bold text-center py-5">Add A New Banner</h3>
      <div>
        <form onSubmit={handleAddBanner}>
          {/* Banner name and image  */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Banner Name</span>
              </div>
              <input
                type="text"
                name="bannerName"
                placeholder="Banner Name"
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
          {/* title and description */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* title */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered w-full "
              />
            </label>
            {/* price */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          {/* coupon and rate  */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/*coupon */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Coupon Code</span>
              </div>
              <input
                type="text"
                name="couponCode"
                placeholder="coupon code"
                className="input input-bordered w-full "
              />
            </label>
            {/* rate */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Coupon Rate</span>
              </div>
              <input
                type="number"
                name="couponRate"
                placeholder="rate"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <button type="submit" className="project-btn w-full my-5">
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
