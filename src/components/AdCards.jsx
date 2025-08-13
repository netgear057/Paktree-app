import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFeature, userAds } from "../services/apiServices";
import { Link } from "react-router-dom";

const AdCards = () => {
  const { allAds, user } = useSelector((state) => state.auth);
  const userId = user._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAds(userId));
  }, [dispatch, userId]);
  console.log(allAds);
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="w-full h-auto flex justifiy-start mb-8">
        <h3 className="text-2xl font-semibold text-slate-700">
          My ads ({allAds.total})
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
  {allAds?.data?.map((ad) => (
    <div
      key={ad._id}
      className="h-full flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      {/* Image */}
      <img
        className="rounded-t-lg"
        src={ad.image || "/paktree.png"}
        alt=""
      />

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {ad.title}
          </h5>
          {/* <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
            {ad.details}
          </p> */}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          {ad.featured ? (

            <button className="w-full py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600  " disabled >
             Featured
          </button>
          ):(
             
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer" onClick={() => handleFeature({ postId: ad._id, userId })}>
            Make Ad Feature
          </button>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default AdCards;
