import { useEffect, useState } from "react";
import { getUsers } from "../api/users";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-bg p-6">

    {/* HEADER */}
    <div className="mb-10">

      <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
        Jewelry Admin
      </p>

      <h1
        className="text-4xl text-dark-text"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Users
      </h1>

      <p className="text-sm text-text-light mt-2">
        Manage registered customers & admins
      </p>

    </div>

    {/* LOADING */}
    {loading && (
      <div className="
        bg-card
        border border-border-1
        rounded-3xl
        p-5
        text-text-6
        shadow-sm
      ">
        Loading users...
      </div>
    )}

    {/* USERS GRID */}
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {users?.length > 0 ? (
        users.map((u) => (
          <div
            key={u._id}
            className="
              bg-card
              border border-border-1
              rounded-[30px]
              p-6
              shadow-sm
              hover:shadow-md
              transition-all duration-300
            "
          >

            {/* TOP */}
            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-4">

                {/* AVATAR */}
                <div className="
                  w-14 h-14
                  rounded-full
                  bg-bg-4
                  border border-border-3
                  flex items-center justify-center
                  text-text-3
                  font-semibold
                  text-lg
                  flex-shrink-0
                ">
                  {u.name?.charAt(0)?.toUpperCase()}
                </div>

                {/* USER INFO */}
                <div>

                  <h2
                    className="text-2xl text-dark-text leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {u.name}
                  </h2>

                  <p className="text-sm text-text-light mt-2 break-all">
                    {u.email}
                  </p>

                </div>

              </div>

            </div>

            {/* DETAILS */}
            <div className="space-y-4">

              {/* ROLE */}
              <div className="
                flex items-center justify-between
                bg-bg-1
                border border-border
                rounded-2xl
                px-5 py-4
              ">

                <div>
                  <p className="text-xs uppercase tracking-[3px] text-text-5 mb-1">
                    Role
                  </p>

                  <p className="text-dark-text font-medium capitalize">
                    {u.role}
                  </p>
                </div>

                <div className="
                  px-4 py-1.5
                  rounded-full
                  bg-bg-4
                  text-text-3
                  text-xs
                  border border-border-3
                ">
                  Active
                </div>

              </div>

              {/* JOIN DATE */}
              <div className="
                flex items-center justify-between
                bg-bg-1
                border border-border
                rounded-2xl
                px-5 py-4
              ">

                <div>
                  <p className="text-xs uppercase tracking-[3px] text-text-5 mb-1">
                    Joined
                  </p>

                  <p className="text-dark-text font-medium">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div className="
                  w-10 h-10
                  rounded-full
                  bg-hover-soft
                  flex items-center justify-center
                  text-text-3
                ">
                  ✦
                </div>

              </div>

            </div>

          </div>
        ))
      ) : (
        <div className="col-span-full">

          <div className="
            bg-card
            border border-border-1
            rounded-[30px]
            py-24
            text-center
            shadow-sm
          ">

            <div className="text-6xl mb-5">
              👤
            </div>

            <h3
              className="text-3xl text-dark-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              No Users Found
            </h3>

            <p className="text-text-6 text-sm mt-3">
              Registered users will appear here.
            </p>

          </div>

        </div>
      )}

    </div>
  </div>
);
}