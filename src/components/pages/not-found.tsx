import { Player as Lottie } from "@lottiefiles/react-lottie-player";
import notFoundAnimation from "../../assets/404-not-found.json";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex items-center md:mb-5 mb-0">
        <p className="border-r-2 pr-5 mr-5 text-3xl">404</p>
        <p>This page could not be found</p>
      </div>
      <Lottie
        autoplay={true}
        loop={true}
        src={notFoundAnimation}
        className="w-72 h-72 md:w-[500px] md:h-[286px]"
      />
    </div>
  );
}
