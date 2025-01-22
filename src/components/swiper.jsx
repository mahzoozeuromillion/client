import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const staticBannerData = [
  {
    id: 3,
    ImageOrVideo: {
      mime: "image/jpeg",
      url: "/public/bro.jpg",
      alternativeText: "Banner 3",
    },
    title: "Welcome to Our Store",
    heading: "Shop the Best Products Here",
    desc: "Find the latest deals and offers on our wide range of products.",
    bannerText: "€10 MILLION UP FOR GRABS! YOUR WINNING TICKET AWAITS!",
  },
];

export default function MySwiper() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const parallaxRef = useRef(null);

  const renderMedia = (media) => {
    if (!media) return null;

    const isImage = media.mime?.startsWith("image/");
    const isVideo = media.mime?.startsWith("video/");

    if (isImage) {
      return (
        <div className="banner_image h-full w-full relative">
          <img
            className="w-full h-full object-cover"
            src={media.url}
            width={1280}
            height={556}
            alt={media.alternativeText || "banner image"}
          />
        </div>
      );
    }

    if (isVideo) {
      return (
        <div className="banner_video h-full w-full relative">
          <video
            className="w-full h-full object-cover"
            src={media.url}
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    return null;
  };

  const renderSlideContent = (item) => {
    if (!item?.title && !item?.heading && !item?.desc && !item?.bannerText)
      return null;

    return (
      <div
        className="absolute top-1/2 left-1/2 -mt-10 xl:w-[68.875rem] md:w-[35.875rem] w-[20.875rem] -translate-x-1/2 -translate-y-1/2 z-10 text-center"
        style={{
          fontFamily: "footerFont, sans-serif", // Apply the custom font here
        }}
      >
        {/* Banner text with responsive font sizes */}
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-bold xl:mr-[500px] lg:mr-[400px] xl:ml-[100px]">
          {item.bannerText}
        </h2>
      </div>
    );
  };

  const renderBannerContent = (item) => {
    const content = (
      <div className="banner_wrapper relative h-[550px] w-full">
        {renderMedia(item?.ImageOrVideo)}
        {renderSlideContent(item)}
      </div>
    );
    return item?.RedirectLink ? (
      <a href={item.RedirectLink} className="block h-full cursor-pointer">
        {content}
      </a>
    ) : (
      content
    );
  };

  return (
    <div className="" id="hero">
      <Swiper
        className="HomeSwiper"
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        grabCursor={true}
        freeMode={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
        navigation={{
          prevEl: ".custom-swiper-button-prev",
          nextEl: ".custom-swiper-button-next",
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {staticBannerData?.map((item) => (
          <SwiperSlide key={item.id}>{renderBannerContent(item)}</SwiperSlide>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-white to-transparent z-10" />
      </Swiper>
    </div>
  );
}
