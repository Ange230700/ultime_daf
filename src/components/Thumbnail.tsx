// src\components\Thumbnail.tsx

import { useState } from "react";
import type { WantedItem } from "../api/api";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Avatar } from "primereact/avatar";

export default function Thumbnail({ item }: { readonly item: WantedItem }) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rawSrc = item.images[0]?.thumb;
  const hasImage = Boolean(rawSrc) && !imgError;

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setImgError(true);
    setIsLoaded(true);
  };

  const header = (
    <div className="relative w-full h-80 overflow-hidden rounded-t-lg">
      {!isLoaded && (
        <Skeleton width="100%" height="100%" className="h-full w-full" />
      )}
      {hasImage ? (
        <img
          src={rawSrc!}
          alt={item.title}
          className={`w-full h-80 object-cover rounded-t-lg transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <div className="flex h-80 items-center justify-center rounded-t-lg">
          <Avatar icon="pi pi-image" size="xlarge" shape="circle" />
        </div>
      )}
    </div>
  );

  return (
    <Link
      to={`/details/${item.uid}`}
      className="block rounded shadow hover:shadow-lg transition overflow-hidden"
    >
      <Card
        header={header}
        title={item.title}
        className="shadow hover:shadow-lg transition-shadow rounded overflow-hidden"
        style={{ width: "100%", height: "100%" }}
      />
    </Link>
  );
}
