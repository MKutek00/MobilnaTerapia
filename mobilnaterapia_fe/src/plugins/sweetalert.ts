import Swal from "sweetalert2";

export function alertError(message: string): void {
  Swal.fire({
    text: message,
    icon: "error",
  });
}
export function alertSuccess(message: string): void {
  Swal.fire({
    icon: "success",
    title: message,
    timer: 1500,
    showConfirmButton: false,
  });
}
