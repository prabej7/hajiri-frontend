const Loading: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex gap-1 items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <p className="font-bold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
