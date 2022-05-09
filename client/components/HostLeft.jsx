export default function HostLeft() {
  return (
    <div
      className="
    fixed
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-sky-600
    to-blue-400
    z-[100000]
  "
    >
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Meeting is over
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The host has left, the meeting is over !
          </p>

          <a onClick={() => window.location = window.location.origin + '/live'} className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 hover:cursor-pointer hover:bg-blue-200">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
