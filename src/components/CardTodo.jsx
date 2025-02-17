const CardTodo = ({
  title,
  estado,
  descripcion,
  prioridad,
  fecha,
  openModal,
  EliminarTarea,
}) => {
  return (
    <>
      <article className="bg-gray-700 p-5 rounded-md max-w-80  min-w-80 flex flex-col justify-between">
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="font-semibold text-gray-300 line-clamp-2">
            {descripcion}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-300">prioridad</p>
            <p className="flex items-center justify-center gap-1">
              <div className="bg-yellow-500 w-2 h-2 rounded-full drop-shadow-2xl"></div>{" "}
              {prioridad}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-300">Estado</p>
            <p className="flex items-center justify-center gap-1">
              <div className="bg-red-500 w-2 h-2 rounded-full drop-shadow-2xl"></div>{" "}
              {estado}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 mt-2">
            <button
              onClick={openModal}
              className="  py-1 rounded-xl font-bold text-blue-500 "
            >
              Ver
            </button>
            <button
              onClick={EliminarTarea}
              className=" px-2  rounded-xl font-bold text-red-500"
            >
              Eliminar
            </button>
          </div>
          <p className="font-semibold text-amber-500"> {fecha}</p>
        </div>
      </article>
    </>
  );
};

export default CardTodo;
