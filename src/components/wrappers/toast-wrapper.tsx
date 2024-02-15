// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { ReactNode } from "react";

// export function SonnerDemo({
//   children,
//   description,
//   label,
//   status,
// }: {
//   children: ReactNode;
//   description?: string;
//   label: string;
//   status: "success" | "error";
// }) {
//   const descriptionMeesage =status==='success'?'': "Something's wrong. Try to renew.";
//   // const successDescription = "Something's wrong. Try to renew.";
//   const labelMessage = "Something's wrong. Try to renew.";
//   // const successLabel = "Something's wrong. Try to renew.";

//   return (
//     <Button
//       variant="outline"
//       onClick={() =>
//         toast("Uh oh! Something went wrong.", {
//           description: description || "",
//           duration: 500,
//         })
//       }
//     >
//       {children}
//     </Button>
//   );
// }
