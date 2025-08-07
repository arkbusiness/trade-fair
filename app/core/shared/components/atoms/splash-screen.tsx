import Image from 'next/image';

export const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background z-[51]">
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo-sm.svg"
          alt="ARK Logo"
          width={50}
          height={31}
          style={{
            objectFit: 'contain'
          }}
        />
        <p className="text-burnt-orange">Please wait...</p>
      </div>
    </div>
  );
};
