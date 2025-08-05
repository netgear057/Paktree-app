import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/apiServices";
import IconWithFallback from "../utils/IconWithFallback";
import { Link } from "react-router-dom";
import { Select } from "@headlessui/react";
import categoriesData from "../assets/json/categoriesData.json";
import locationData from "../assets/json/locationData.json";

export default function List() {
   
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    category: "",
    province: "",
    district: "",
    tehsil: "",
    page: 1,
    limit: 12,
  });
  // track when search button is clicked
  const [searchTriggered, setSearchTriggered] = useState(false);

// Run on page load
useEffect(() => {
  dispatch(fetchProducts(filters));
}, []);

// Run when search button is clicked
useEffect(() => {
  if (searchTriggered) {
    dispatch(fetchProducts(filters));
    setSearchTriggered(false);
  }
}, [searchTriggered, filters, dispatch]);


  // handle filter changes
 const handleChange = (e) => {
  const { name, value } = e.target;

  setFilters((prev) => {
    const updatedFilters = {
      ...prev,
      [name]: value,
    };

    // Reset child fields if parent changes
    if (name === 'province') {
      updatedFilters.district = '';
      updatedFilters.tehsil = '';
    }

    if (name === 'district') {
      updatedFilters.tehsil = '';
    }

    return updatedFilters;
  });
};


  // handle search click
  const handleSearch = () => {
    console.log('clicked')
    setSearchTriggered(true);
  };

  const provinceList = locationData.map((p) => p.province);

  const getDistricts = (province) =>
    locationData.find((p) => p.province === province)?.districts.map((d) => d.name) || [];

  const getTehsils = () =>
    locationData
      .find((p) => p.province === filters.province)
      ?.districts.find((d) => d.name === filters.district)?.tehsils || [];

  return (
    <>
     
       
        <div className="w-full h-auto flex justify-center mt-6 ">

        <div className=" flex flex-row w-full gap-4 flex-wrap p-6">
          <div className=" flex w-full  sm:flex-1 justify-center items-end">
            <h1>Filter by:</h1>

          </div>
 <div className="w-full  sm:flex-1 ">
          <label>Category</label>
          <Select as="select" name="category" 
        className="input"
        value={filters.category}
        onChange={handleChange}>
            <option value="">Select Category</option>
            {categoriesData.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>
       
        <div className="w-full  sm:flex-1 ">
          <label>Province</label>
          <Select as="select" name="province" className="input" value={filters.province} onChange={handleChange}>
            <option value="">Select Province</option>
            {provinceList.map((prov, idx) => (
              <option key={idx} value={prov}>
                {prov}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full  sm:flex-1 ">
          <label>District</label>
          <Select as="select" name="district" className="input" value={filters.district} onChange={handleChange}>
            <option value="">Select District</option>
            {getDistricts(filters.province).map((dist, idx) => (
              <option key={idx} value={dist}>
                {dist}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full  sm:flex-1 ">
          <label>Tehsil</label>
          <Select as="select" name="tehsil" className="input" value={filters.tehsil} onChange={handleChange}>
            <option value="">Select Tehsil</option>
            {getTehsils( filters.district).map((teh, idx) => (
              <option key={idx} value={teh}>
                {teh}
              </option>
            ))}
          </Select>
        </div>
        <div className=" flex w-full  sm:flex-1 justify-center items-end">
          <button className="bg-green-700 hover:bg-green-900 px-8 py-2 rounded-md text-white font-bold text-base" onClick={handleSearch}>Search</button>
        </div>
        </div>
         </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items?.data?.map((product, i) => (
            <div key={i} className="group relative cursor-pointer shadow-sm">
              <img
                alt= "Product Image"
                src={product.image}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between gap-4 px-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    <Link to={`/product-details/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                </div>
                <p className="text-base font-semibold text-green-700">{product.price}</p>
              </div>
              <div className="flex justify-items-start gap-3 mt-2 px-2">
                <IconWithFallback src="/marker.png" alt="Location" />
                <p className="text-sm font-light text-gray-500">
                  {product.tehsil || ""}, {product.district || ""}, {product.province || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
