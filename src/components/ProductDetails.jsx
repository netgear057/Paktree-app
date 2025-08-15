import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/apiServices";
import IconWithFallback from "../utils/IconWithFallback";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

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
            <div className="flex flex-wrap justify-center mx-4 gap-8">
              {/* <div className="w-full md:w-1/2 px-4 mb-8">
        <img src={item.image} alt="Image"
                    className="w-[500px] h-[500px] rounded-lg shadow-md mb-4" id="mainImage"/>
        <div className="flex gap-4 py-4 justify-start overflow-x-auto">
          <img src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 1"
                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        onclick="changeImage(this.src)"/>
          <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 2"
                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        onclick="changeImage(this.src)"/>
          <img src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 3"
                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        onclick="changeImage(this.src)"/>
          <img src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 4"
                        className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        onclick="changeImage(this.src)"/>
        </div>
      </div> */}

              <div class="grid max-w-[50%] gap-4">
                <div>
                  <img
                    class="w-[730px] h-[450px] contain-content  rounded-lg"
                    src={item.image || "/paktree.png"}
                    alt=""
                  />
                </div>
                <div class="grid grid-cols-4  gap-4">
                  
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
                </div>
              </div>

              <div className="max-w-[40%] md:w-1/2 px-4">
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
                  {/* <button
                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </button> */}
                  <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
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
