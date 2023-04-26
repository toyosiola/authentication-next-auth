import { toast } from "react-toastify";

const { createContext, useState, useContext } = require("react");

const GlobalContext = createContext();

const initialState = {
  signUp: false,
  error_msg: "",
  isLoading: false,
  formInputs: {
    username: "",
    email: "",
    email_username: "",
    password: "",
    matching_password: "",
  },
};

function GlobalProvider({ children }) {
  const [state, setState] = useState(initialState);
  let toastId;

  function toggleSignUp() {
    setState({ ...state, signUp: !state.signUp });
  }

  function errorMsgHandler(msg) {
    setState({ ...state, error_msg: msg });
  }

  function startLoading() {
    setState({ ...state, isLoading: true });
  }
  function stopLoading() {
    setState({ ...state, isLoading: false });
  }

  function updateFormInputs(name, value) {
    setState({
      ...state,
      formInputs: {
        ...state.formInputs,
        [name]: value,
      },
    });
  }

  function signUpProcessing() {
    setState({ ...state, error_msg: "", isLoading: true });
    toastId = toast.loading("Creating account, Please wait...");
  }

  function signUpSuccessHandler(data) {
    // clear inputs
    setState({
      ...state,
      error_msg: "",
      formInputs: {
        username: "",
        email: "",
        email_username: "",
        password: "",
        matching_password: "",
      },
      signUp: false,
    });
    // notify of success!!!
    toast.update(toastId, {
      render: data.msg,
      type: toast.TYPE.SUCCESS,
      isLoading: false,
    });
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 3000);
  }

  function signUpFailHandler(errorContent) {
    setState({
      ...state,
      error_msg: "",
      isLoading: false,
    });
    // notify of failure!!!
    toast.update(toastId, {
      render: errorContent,
      type: toast.TYPE.ERROR,
      isLoading: false,
    });
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 4000);
  }

  function signInProcessing() {
    setState({ ...state, error_msg: "", isLoading: true });
    toastId = toast.loading("Signing in, Please wait...");
  }

  function signInSuccessHandler() {
    // clear inputs
    setState({
      ...state,
      error_msg: "",
      formInputs: {
        username: "",
        email: "",
        email_username: "",
        password: "",
        matching_password: "",
      },
    });
    toast.update(toastId, {
      render: "Welcome...",
      type: toast.TYPE.SUCCESS,
      isLoading: false,
    });
    // dismiss toastify
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 1000);
  }

  function signInFailHandler(errorContent) {
    setState({
      ...state,
      error_msg: "",
      isLoading: false,
    });
    // notify of failure!!!
    toast.update(toastId, {
      render: errorContent,
      type: toast.TYPE.ERROR,
      isLoading: false,
    });
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 4000);
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        errorMsgHandler,
        toggleSignUp,
        updateFormInputs,
        startLoading,
        stopLoading,
        signUpProcessing,
        signUpSuccessHandler,
        signUpFailHandler,
        signInProcessing,
        signInSuccessHandler,
        signInFailHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export default GlobalProvider;
