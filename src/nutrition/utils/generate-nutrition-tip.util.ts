// utils/generate-nutrition-tips.ts

import { Objective } from 'src/user/enums/user.enums';
import { DailyMacrosSummary, Macros } from '../types/macros.interface';
import { NutritionTip } from '../types/nutrition-tip.interface';

const CALORIE_UNDER_THRESHOLD = 0.8;
const PROTEIN_UNDER_THRESHOLD = 0.8;
const CARB_OVER_THRESHOLD = 1.2;
const FAT_OVER_THRESHOLD = 1.2;

export const generateNutritionTips = (
  actual: DailyMacrosSummary,
  goal: Macros,
  objective: Objective,
): NutritionTip[] => {
  const tips: NutritionTip[] = [];

  if (actual.totalCalories > goal.calories) {
    tips.push({
      type: 'warning',
      message: `You're exceeding your daily calorie goal by ${actual.totalCalories - goal.calories} kcal.`,
    });
  } else if (actual.totalCalories < goal.calories * CALORIE_UNDER_THRESHOLD) {
    tips.push({
      type: 'info',
      message: `You're significantly under your calorie goal. Consider adding more nutrient-dense foods to your meals.`,
    });
  }

  if (actual.totalProtein < goal.protein * PROTEIN_UNDER_THRESHOLD) {
    tips.push({
      type: 'info',
      message: `Your protein intake is quite low. Consider adding a high-protein snack or meal.`,
    });
  }

  if (actual.totalCarbs > goal.carbs * CARB_OVER_THRESHOLD) {
    tips.push({
      type: 'warning',
      message: `Your carbohydrate intake is higher than usual. Consider balancing with more protein or fat.`,
    });
  }

  if (actual.totalFat > goal.fat * FAT_OVER_THRESHOLD) {
    tips.push({
      type: 'info',
      message: `Your fat intake is a bit high. Try moderating oily or fried foods.`,
    });
  }

  if (objective === Objective.LOSE && actual.totalCalories > goal.calories) {
    tips.push({
      type: 'critical',
      message: `You're above your daily calorie goal and your objective is to lose weight.`,
    });
  }

  if (objective === Objective.GAIN && actual.totalCalories < goal.calories) {
    tips.push({
      type: 'info',
      message: `You're below your calorie target and your goal is to gain weight. Eat more nutrient-dense foods.`,
    });
  }

  return tips;
};
