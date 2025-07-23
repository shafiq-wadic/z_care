import { DietDay } from "@prisma/client";
import { MealTypeExtended } from "./meal";

export type DietDayType = DietDay & {
    meals: MealTypeExtended[];
};
