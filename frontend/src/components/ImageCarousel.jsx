import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function ImageCarousel({ images }) {

    if (!images?.length) return null;

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={images.length > 1}
        pagination={
          images.length > 1
            ? { clickable: true }
            : false
        }
        className="post-swiper w-full rounded-lg overflow-hidden"
      >
        {images.map((image) => (
          <SwiperSlide key={image.fileId}>
            <img
              src={image.url}
              alt="post"
              className="
                w-full
                h-[350px]
                sm:h-[400px]
                md:h-[500px]
                object-contain
                bg-black
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ImageCarousel;