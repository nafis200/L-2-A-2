
import { z } from 'zod';

export const CarModelValidationSchema = z.object({
    brand: z
        .string({ required_error: "Brand is required" })
        .trim()
        .nonempty("Brand is required"),
    model: z
        .string({ required_error: "Model is required" })
        .trim()
        .nonempty("Model is required"),
    year: z
        .number({ required_error: "Year is required" })
        .min(0, "Year must be zero or greater"),
    price: z
        .number({ required_error: "Price is required" })
        .min(0, "Price must be zero or greater"),
    category: z
        .enum(['Sedan', 'SUV','Truck', 'Coupe','Convertible'], {
            errorMap: () => ({ message: "Category must be one of 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'" }),
        }),
    description: z
        .string()
        .trim()
        .default("No description provide"),
    quantity: z
        .number({ required_error: "Quantity is required" })
        .min(0, "Quantity must be zero or greater"),
    inStock: z.boolean({ required_error: "InStock is required" }).default(true),
    isDeleted: z.boolean().default(false),
});

export const CarModelUpdateValidationSchema = z.object(
    {
        price: z
        .number({ required_error: "Price is required" })
        .min(0, "Price must be zero or greater"),
        quantity: z
        .number({ required_error: "Quantity is required" })
        .min(0, "Quantity must be zero or greater"),
    }
)


