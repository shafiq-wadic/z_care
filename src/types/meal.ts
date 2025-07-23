import { Meal, MealType } from "@prisma/client";
import { MealItemOnMealType } from "./mealItemOnMeal";

export type MealTypeExtended = Meal & {
    mealType: MealType;
    items: MealItemOnMealType[];
};
