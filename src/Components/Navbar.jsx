function Navbar() {

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (

    <div className="h-24 px-10 flex items-center justify-between bg-white">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Welcome back, {username}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search campaigns..."
          className="bg-slate-100 px-5 py-3 rounded-2xl outline-none w-72"
        />

        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">

          {username?.charAt(0).toUpperCase()}

        </div>

        <div>

          <h3 className="font-semibold text-slate-800">
            {username}
          </h3>

          <p className="text-sm text-slate-500 capitalize">
            {role}
          </p>

        </div>

      </div>

    </div>

  );
}

export default Navbar;