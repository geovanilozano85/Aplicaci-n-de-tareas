import { useContext, useState } from "react";
import Contexto from "../context/Context";
import ModalViewTask from "./ModalViewTask";

const Header = () => {
  const { Usuario, setFilter, Tareas, setUsuario } = useContext(Contexto);
  const [OpenModal, setOpenModal] = useState(false);
  const usuario =
    Usuario.user && Usuario.user.names && Usuario.user.email
      ? Usuario.user.email
      : "Cargando...";

  const filterHeader = (prioridad) => {
    const filtro = Tareas.filter((tarea) => tarea.priority === prioridad);
    setFilter(filtro);
  };

  const handleSubmitData = (data) => {
    const user = {
      id: Usuario.user.id,
      names: data.title,
      email: data.email,
      password: data.password,
    };
    console.log(user);
    fetch("http://localhost:3100/users/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuario({
          token: Usuario.token,
          user: data.user,
        });
        const userData = JSON.parse(localStorage.getItem("usuario"));
        userData.user = data.user;
        localStorage.setItem("usuario", JSON.stringify(userData));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpenModal(false);
      });
  };

  const CerrarSesion = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <header className=" ">
        <div className="mx-auto max-w-screen-xl  pl-1 ">
          <div className="flex h-16 items-center justify-between">
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li className="text-blue-500 font-bold">
                    <p>Prioridad: </p>
                  </li>
                  <li>
                    <p
                      onClick={() => filterHeader("medio")}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold cursor-pointer"
                    >
                      {" "}
                      Medio{" "}
                    </p>
                  </li>

                  <li>
                    <p
                      onClick={() => filterHeader("alto")}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold cursor-pointer"
                    >
                      {" "}
                      Alto{" "}
                    </p>
                  </li>

                  <li>
                    <p
                      onClick={() => filterHeader("urgente")}
                      className="text-gray-500 transition hover:text-gray-500/75 font-bold cursor-pointer"
                    >
                      {" "}
                      Urgente{" "}
                    </p>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div
                onClick={() => setOpenModal(true)}
                className="sm:flex sm:gap-4"
              >
                <p className="rounded-md  px-5 py-2.5 text-sm font-medium text-teal-600 cursor-pointer flex gap-2">
                  {usuario}
                </p>
              </div>
              <p
                className="font-bold text-red-500 cursor-pointer"
                onClick={CerrarSesion}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </header>
      {OpenModal && (
        <ModalViewTask
          closeModal={setOpenModal}
          textBtn="Actualizar Usuario"
          funcion={handleSubmitData}
          usuario={true}
          tarea={{
            title: Usuario.user.names,
            email: Usuario.user.email,
          }}
        />
      )}
    </>
  );
};

export default Header;
