import { DietPlan, Patient } from "@prisma/client";
import { DietDayType } from "./dietDay";

export type DietPlanType = DietPlan & {
    patient: Patient;
    days: DietDayType[];
};
