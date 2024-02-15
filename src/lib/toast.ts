import { Slide, toast } from "react-toastify";
const properties = {
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};
export const toaster = {
  error: (label: string = "") =>
    toast.error(label, {
      position: "top-right",
      ...properties,
    }),
  success: (label: string = "") =>
    toast.success(label, {
      position: "top-right",
      ...properties,
    }),
};
