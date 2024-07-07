import { useNavigate, useParams } from "react-router-dom";
import FormUSer from "./FormUSer";
import { useForm } from "react-hook-form";

export const SendEmail = () => {
  const navigate = useNavigate();

  const onsubmit = (data) => {
    const { email } = data;
    fetch("http://localhost:3100/reload-password/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al enviar el correo");
        }

        return res.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <FormUSer
        btnSend="Recuperar contraseña"
        title="Recuperar contraseña"
        funcion={onsubmit}
      />
    </>
  );
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const { id, email, names } = useParams();

  const onsubmit = (data) => {
    if (data.password !== data.password_confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    fetch("http://localhost:3100/users/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        email: email,
        names: names,
        password: data.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar el usuario");
        }
        return res.json();
      })
      .then(() => {
        alert("Contraseña actualizada");
        navigate("/");
      });
  };

  return (
    <>
      <section className="flex flex-col items-center justify-start h-screen pt-20">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col items-center gap-4 w-96"
        >
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full py-3 px-2 rounded-md"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full py-3 px-2 rounded-md"
            {...register("password_confirm", { required: true })}
          />
          <button
            type="submit"
            className="w-full py-3 px-2 rounded-md bg-green-600 text-white"
          >
            Confirmar
          </button>
        </form>
      </section>
    </>
  );
};
