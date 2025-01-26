
import { z } from "zod";
export const OrderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  car: z.string().min(1, { message: "Car field must not be empty" }),
  quantity: z.number().int().positive({ message: "Quantity must be a positive integer grater than zero" }),
  totalPrice: z.number().nonnegative({ message: "Total price must be a non-negative number" }),
});