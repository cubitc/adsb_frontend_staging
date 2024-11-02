import { Toaster } from "react-hot-toast";

const ReactToast = () => {
  return (
    <Toaster
      containerStyle={{
        top: 90,
      }}
      position={"bottom-center"}
      toastOptions={{
        duration: 10000,
        success: {
          style: {
            color: "white",
            background: "green",
          },
        },
        error: {
          style: {
            color: "white",
            background: "red",
          },
        },
      }}
    />
  );
};

export default ReactToast;
