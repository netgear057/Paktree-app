import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../services/apiServices";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import locationData from '../assets/json/locationData.json';
import categoriesData from '../assets/json/categoriesData.json'
import { useNavigate} from "react-router-dom";
const PostItem = () => {
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  
const navigate = useNavigate()
const fileInputRef = useRef(null);

const {user} = useSelector(state => state.auth)
let userId = user._id
console.log(userId)
  const initialValues = {
    userId:userId,
    title: "",
    category: "",
    price: "",
    details: "",
    province: "",
    district: "",
    tehsil: "",
    area: "",
    phone: "",
    whatsapp: "",
    image: null,
  };

  const validationSchema = Yup.object({
    userId:Yup.string().required(),
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title must be at most 50 characters"),

    category: Yup.string().required("Category is required"),
    price: Yup.string()
      .max(15, "Price must be at most 15 characters"),
    details: Yup.string()
      .max(500, "Details must be at most 500 characters"),
    province: Yup.string().required("Province is required"),
    district: Yup.string().required("District is required"),
    tehsil: Yup.string().required("Tehsil is required"),
    area: Yup.string(),
    phone: Yup.string()
      .required("Phone is required")
      .max(25, "Phone must be at most 25 characters"),
    whatsapp: Yup.string().max(25, "Whatsapp must be at most 25 characters"),
    image: Yup.mixed().nullable(),
  });

  const provinceList = locationData.map((p) => p.province);

  const getDistricts = (province) =>
    locationData
      .find((p) => p.province === province)
      ?.districts.map((d) => d.name) || [];

  const getTehsils = (province, district) =>
    locationData
      .find((p) => p.province === province)
      ?.districts.find((d) => d.name === district)?.tehsils || [];

  // Hand le image input change and preview
  const  handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, PNG, and GIF files are allowed");
        return;
      }
      setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
  try {
    if (!userId) {
        console.log("No userId, aborting submit.");
      toast.error("User not logged in. Cannot post ad.");
      return;
    }
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const result = await dispatch(postProduct(formData));
    if (postProduct.fulfilled.match(result)) {
      toast.success("Ad Posted Successfully!");
      resetForm();
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      navigate('/products')
    } else {
      toast.error("Error in Posting Ad");
    }
  } catch (error) {
    console.error(error);
    toast.error("Unexpected error occurred");
  }
};


  return (
    <div className="bg-white rounded-lg shadow relative sm:m-10 p-4 sm-12">
      <div className="p-6 space-y-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Post Ad</h3>
                <button
                  className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:ring-green-200 rounded-lg text-sm font-extrabold px-7 py-2.5 text-center cursor-pointer"
                  type="submit"
                >
                  Save
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="w-full h-auto flex justify-center items-center">
                  <div className="flex items-center justify-center sm:w-[25%] ">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG, GIF (max 800x400px)
                          </p>
                        </div>
                      )}
                      <input
                        id="dropzone-file"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                          ref={fileInputRef}
                        onChange={(event) =>
                          handleImageChange(event, setFieldValue)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="w-full h-auto flex justify-center items-center">
                  <p className="text-xl font-semibold text-gray-400">
                    Upload Image
                  </p>
                </div>
                <div className="grid grid-cols-9 gap-2">
                  {/* Title */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Title</label>
                    <Field
                      name="title"
                      className="input"
                      placeholder="Apple Imac 27”"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Category</label>
                    <Field as="select" name="category" className="input">
                      <option value="">Select Category</option>
                      {categoriesData.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Price */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Price</label>
                    <Field
                      name="price"
                      type="text"
                      className="input"
                      placeholder="2300"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Province */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Province</label>
                    <Field
                      as="select"
                      name="province"
                      className="input"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("district", "");
                        setFieldValue("tehsil", "");
                      }}
                    >
                      <option value="">Select Province</option>
                      {provinceList.map((prov, idx) => (
                        <option key={idx} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="province"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* District */}
                  <div className="col-span-full sm:col-span-3">
                    <label>District</label>
                    <Field
                      as="select"
                      name="district"
                      className="input"
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("tehsil", "");
                      }}
                    >
                      <option value="">Select District</option>
                      {getDistricts(values.province).map((dist, idx) => (
                        <option key={idx} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="district"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Tehsil */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Tehsil</label>
                    <Field as="select" name="tehsil" className="input">
                      <option value="">Select Tehsil</option>
                      {getTehsils(values.province, values.district).map(
                        (teh, idx) => (
                          <option key={idx} value={teh}>
                            {teh}
                          </option>
                        )
                      )}
                    </Field>
                    <ErrorMessage
                      name="tehsil"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Area */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Area / Town</label>
                    <Field
                      name="area"
                      className="input"
                      placeholder="Enter area"
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Phone</label>
                    <Field
                      name="phone"
                      className="input"
                      placeholder="Enter Phone Number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Whatsapp */}
                  <div className="col-span-full sm:col-span-3">
                    <label>Whatsapp</label>
                    <Field
                      name="whatsapp"
                      className="input"
                      placeholder="Enter Whatsapp"
                    />
                    <ErrorMessage
                      name="whatsapp"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Details */}
                  <div className="col-span-full">
                    <label>Product Details</label>
                    <Field
                      as="textarea"
                      name="details"
                      rows="6"
                      className="input p-4"
                    />
                    <ErrorMessage
                      name="details"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostItem;
