import { useState } from "react";

function IconWithFallback({ src, alt }) {
  const [imgError, setImgError] = useState(false);
  return (
    <>
      {!imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-5 h-5 object-contain"
        />
      ) : (
        <span className="text-sm font-sm text-gray-400">{alt}</span>
      )}
    </>
  );
}
export default IconWithFallback