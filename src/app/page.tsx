export default function Home() {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-85"
          src="https://cmsassets.rgpub.io/sanity/files/dsfx7636/news/8ab3e227121c53aacab0c9b9f7a48adbc65db520.webm"
          loop
          // 동영상재생 시 오토플레이 및 머시드? 넣어줘야
          autoPlay
          muted
          playsInline
        />

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold">
            Welcome to League of Legends Info App😎
          </h1>
          <p className="mt-4 text-lg">
            챔피언 로테이션과 아이템 등 살펴볼 수 있습니다.
          </p>
        </div>

        {/* Dark overlay to improve text visibility */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      </div>
    </>
  );
}
