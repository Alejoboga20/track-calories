import { Objective } from 'src/user/enums/user.enums';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { Macros } from '../types/macros.interface';

const activityFactors = {
  low: 1.2,
  medium: 1.55,
  high: 1.9,
};

export function calculateMacros({
  age,
  objective,
  physicalActivity,
  weight,
  height,
}: CreateUserDto): Macros {
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const tdee = bmr * activityFactors[physicalActivity];
  let calorieIntake = tdee;

  if (objective === Objective.GAIN) {
    calorieIntake *= 1.1;
  } else if (objective === Objective.LOSE) {
    calorieIntake *= 0.85;
  }

  calorieIntake = Math.round(calorieIntake);

  const proteinCalories = calorieIntake * 0.3;
  const carbsCalories = calorieIntake * 0.4;
  const fatCalories = calorieIntake * 0.3;

  const macros: Macros = {
    calories: calorieIntake,
    protein: Math.round(proteinCalories / 4),
    carbs: Math.round(carbsCalories / 4),
    fat: Math.round(fatCalories / 9),
  };

  return macros;
}
