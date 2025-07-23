import { MealItemOnMeal, MealItem } from "@prisma/client";

export type MealItemOnMealType = MealItemOnMeal & {
    item: MealItem;
};
