import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/apiServices";
import IconWithFallback from "../utils/IconWithFallback";
import { Link } from "react-router-dom";
import { Select } from "@headlessui/react";
import categoriesData from "../assets/json/categoriesData.json";
import locationData from "../assets/json/locationData.json";
import Carousel from "../utils/Coursol";
import SearchSuggestion from "./SearchSujggestion";
import RelatedProducts from "./RelatedProducts.jSX";

export default function SearchProcut() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const provinceList = locationData.map((p) => p.province);

  const getDistricts = (province) =>
    locationData
      .find((p) => p.province === province)
      ?.districts.map((d) => d.name) || [];

  const getTehsils = (province, district) =>
    locationData
      .find((p) => p.province === province)
      ?.districts.find((d) => d.name === district)?.tehsils || [];

  return (
    <>
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1684487747385-442d674962f2")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="py-16 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
      >
        <h1 className="pb-4">Search for Product</h1>

        <div className="w-full h-auto flex justify-center mt-6 ">
          <div className=" flex flex-row w-full gap-4 flex-wrap px-8 ">
            <div className=" w-full  sm:flex-1 flex-col">
              <label className="sm:text-2xl text-base font-bold text-start sm:justify-center flex">Product</label>
              <input
                type="text"
                value=""
                placeholder="Keyword"
                className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"
              />
            </div>
            <div className="w-full  sm:flex-1 ">
              <label className="sm:text-2xl text-base font-bold text-start sm:justify-center flex">Category</label>
              <Select as="select" name="category" className="input mt-2">
                <option value="">Select Category</option>
                {categoriesData.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full  sm:flex-1 ">
              <label className="sm:text-2xl text-base font-bold text-start sm:justify-center flex">Province</label>
              <Select as="select" name="province" className="input mt-2">
                <option value="">Select Province</option>
                {provinceList.map((prov, idx) => (
                  <option key={idx} value={prov}>
                    {prov}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full  sm:flex-1 ">
              <label className="sm:text-2xl text-base font-bold text-start sm:justify-center flex">District</label>
              <Select as="select" name="district" className="input mt-2">
                <option value="">Select District</option>
                {getDistricts().map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full  sm:flex-1  ">
              <label className="sm:text-2xl text-base font-bold text-start sm:justify-center flex">Tehsil</label>
              <Select as="select" name="tehsil" className="input mt-2">
                <option value="">Select Tehsil</option>
                {getTehsils().map((teh, idx) => (
                  <option key={idx} value={teh}>
                    {teh}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className=" flex w-full h-auto justify-center items-center mt-10">
         <button type="button" class="focus:outline-none text-white font-bold bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg text-sm px-9 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Search</button>
        </div>
      </div>
      {items.result?(
<div className="w-full h-auto flex justify-center p-4">
          <p className="text-3xl font-semibold text-slate-700">{`"0" Items found for your search`}</p>
        </div>
      ):(
        ''
      )}
      
      {items.length > 0 ? (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items?.map((product, i) => (
            <div key={i} className="group relative cursor-pointer">
              <img
                alt={product.title || "Product Image"}
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
                <p className="text-base font-semibold text-green-700">
                  {product.price}
                </p>
              </div>
              <div className="flex justify-items-start gap-3 mt-2 px-2">
                <IconWithFallback src="/marker.png" alt="Location" />
                <p className="text-sm font-light text-gray-500">
                  {product.tehsil || ""}, {product.district || ""},{" "}
                  {product.province || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ):(
        ''
      )}
      {!items.length > 0 ? (

        <SearchSuggestion />
      ):(
        <RelatedProducts />
      )}
      
    </>
  );
}
