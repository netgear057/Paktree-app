import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/apiServices";
import IconWithFallback from "../utils/IconWithFallback";
import { useLocalFavourites } from "../utils/useFavourites";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const { favourites, toggleFavourite, isFavourite } = useLocalFavourites();
  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const product = items.data?.filter((item) => item._id == id) || [];
  return (
    <>
      <div className="">
        <div className="container mx-auto px-4 py-8">
          {product?.map((item) => (
            <div className="flex sm:flex-row flex-col justify-center mx-4 gap-8">
              

              <div class="grid sm:max-w-[50%] gap-4">
                <div>
                  <img
                    class="w-[730px] h-[450px] contain-content  rounded-lg"
                    src={item.image || "/paktree.png"}
                    alt=""
                  />
                </div>
                {/* <div class="grid grid-cols-4  gap-4">
                  <div>
                    <img
                      class="h-auto max-w-full rounded-lg"
                      src={item.image || "/paktree.png"}
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      class="h-auto max-w-full rounded-lg"
                      src={item.image || "/paktree.png"}
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      class="h-auto max-w-full rounded-lg"
                      src={item.image || "/paktree.png"}
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      class="h-auto max-w-full rounded-lg"
                      src={item.image || "/paktree.png"}
                      alt=""
                    />
                  </div>
                </div> */}
              </div>

              <div className="sm:max-w-[40%] md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                {/* <p className="text-gray-600 mb-4">SKU: WH1000XM4</p> */}
                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">{item.price}</span>
                  {item.price ? <span className="text-gray-500 ">Rs</span> : ""}
                </div>

                <p className="text-gray-700 mb-6">{item.details}.</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Contact info:</h3>
                  <div className="flex flex-col">
                    <div classNameName="flex flex-row gap-4">
                      <h3 className="text-lg font-base mb-2">Mobile:</h3>
                      <h3 className="text-lg font-base mb-2">{item.phone}</h3>
                    </div>
                    <div classNameName="flex flex-row gap-4">
                      <h3 className="text-lg font-base mb-2">Whatsapp:</h3>
                      <h3 className="text-lg font-base mb-2">
                        {item.whatsapp}
                      </h3>
                    </div>
                    <div classNameName="flex justify-items-start gap-3 mt-2 px2">
                      <IconWithFallback src="/marker.png" alt="Location" />

                      <p classNameName="text-base font-medium text-gray-700">
                        {item.area}, {item.tehsil}, {item.district},{" "}
                        {item.province}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mb-6">
               
                  <button
                    className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => toggleFavourite(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isFavourite(item._id) ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke={isFavourite(item._id) ? "red" : "currentColor"}
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
