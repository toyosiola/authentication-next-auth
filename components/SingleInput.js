import { useState } from "react";
import { IconEye, IconEyeSlashFill } from "../assets/icons";
import { useGlobalContext } from "../contexts/GlobalContext";

function SingleInput({ type = "text", placeholder, icon, name }) {
  const [showPassword, setShowPassword] = useState(false);
  const { formInputs, updateFormInputs } = useGlobalContext();

  function showPasswordHandler() {
    if (type !== "password") {
      return;
    }
    setShowPassword(!showPassword);
  }

  function formInputHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    updateFormInputs(name, value);
  }

  return (
    <div className="mb-6 flex gap-4 border-b border-gray-200 px-2 py-1 text-gray-500">
      <input
        type={type === "password" ? (showPassword ? "text" : type) : type}
        placeholder={placeholder}
        name={name}
        value={formInputs[name]}
        onChange={formInputHandler}
        className="grow focus:outline-none"
      />
      <div
        className="text-2xl text-gray-400 duration-300 hover:text-primary"
        onClick={showPasswordHandler}
      >
        {type === "password" ? (
          showPassword ? (
            <IconEyeSlashFill />
          ) : (
            <IconEye />
          )
        ) : (
          icon
        )}
      </div>
    </div>
  );
}

export default SingleInput;
