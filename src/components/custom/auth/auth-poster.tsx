import logo from "../../../assets/poster-icon.png";

const AuthPoster = () => {
  return (
    <div className="bg-poster min-h-screen max-h-full w-full object-cover bg-no-repeat bg-center">
      <div className="h-full flex justify-center items-center">
        <div className="sm:w-[70%] sm:p-0 p-4 flex flex-col justify-center items-center gap-2 text-center">
          <img src={logo} alt="icon" className="w-20 h-20" />
          <h1 className="font-bold text-4xl text-white">
            Furni<span className="text-[#1E99F5]">Flex</span>
          </h1>
          <p className="text-white">
            Discover a seamless shopping experience with our curated collection
            of products. From fashion to electronics, we bring quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPoster;
