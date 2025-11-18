

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-150 bg-[#0D1117] min-h-[40vh]">
    <div className="relative">
        <div className="absolute inset-0 h-26 w-26 rounded-full bg-blue-600 blur-lg opacity-40 animate-ping"></div>
        <div className="animate-spin h-26 w-26 rounded-full border-[6px] border-gray-700 border-t-blue-500 shadow-xl shadow-blue-500/50"></div>
    </div>
</div>
  );
}

export default Loading