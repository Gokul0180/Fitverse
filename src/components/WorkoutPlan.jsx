import React from "react";

export default function WorkoutPlan({ goal, type, day, dietType = "veg", render }) {
  if (!goal)
    return (
      <div className="text-center text-gray-300 italic mt-6">
        No workout plan available. Set up your profile to see your plan.
      </div>
    );

  const plans = { weightloss: {
    withweight: {
      Monday: ["Squats – 3×15", "Lunges – 3×12", "Bench Press – 3×12", "Deadlifts – 3×10", "HIIT Circuit – 20 min"],
      Tuesday: ["Treadmill Run – 30 min", "Push-ups – 3×20", "Pull-ups – 3×10", "Burpees – 3×15", "Plank – 3×1 min"],
      Wednesday: ["Leg Press – 3×12", "Shoulder Press – 3×12", "Kettlebell Swings – 3×15", "Rowing – 15 min", "Crunches – 3×20"],
      Thursday: ["Incline Dumbbell Press – 3×12", "Squats – 3×15", "Lunges – 3×12", "Jump Rope – 10 min", "HIIT Circuit – 15 min"],
      Friday: ["Deadlifts – 3×8", "Push-ups – 3×20", "Pull-ups – 3×12", "Plank – 3×1 min", "Cardio Bike – 20 min"],
      Saturday: ["Treadmill – 30 min", "Bodyweight Circuit – 20 min", "Burpees – 3×15", "Jumping Jacks – 3×50", "Stretching – 10 min"],
      Sunday: ["Active Recovery: Yoga / Stretching / Rest"],
    },
    withoutweight: {
      Monday: ["Jumping Jacks – 3×50", "Burpees – 3×15", "Mountain Climbers – 3×20", "Push-ups – 3×20", "Yoga Flow – 20 min"],
      Tuesday: ["Running – 30 min", "Bodyweight Squats – 3×20", "Lunges – 3×15", "Plank – 3×1 min", "Crunches – 3×20"],
      Wednesday: ["Skipping – 10 min", "Burpees – 3×20", "Push-ups – 3×20", "Plank – 3×1 min", "Mountain Climbers – 3×25"],
      Thursday: ["Running – 20 min", "Jump Squats – 3×15", "Lunges – 3×15", "Push-ups – 3×20", "Yoga – 20 min"],
      Friday: ["HIIT Circuit – 20 min", "Burpees – 3×15", "Crunches – 3×25", "Mountain Climbers – 3×20", "Plank – 3×2 min"],
      Saturday: ["Bodyweight AMRAP – 20 min", "Jump Rope – 10 min", "Push-ups – 3×20", "Burpees – 3×15", "Sit-ups – 3×25"],
      Sunday: ["Active Recovery: Walking / Yoga / Rest"],
    },
  },
  weightgain: {
    withweight: {
      Monday: ["Bench Press – 4×8", "Incline Dumbbell Press – 3×10", "Tricep Dips – 3×12", "Weighted Push-ups – 3×15", "Chest Fly – 3×12"],
      Tuesday: ["Deadlifts – 4×6", "Barbell Rows – 3×10", "Lat Pulldown – 3×12", "Bicep Curls – 3×12", "Hammer Curls – 3×12"],
      Wednesday: ["Leg Press – 4×10", "Squats – 4×12", "Lunges – 3×12", "Calf Raises – 3×20", "Romanian Deadlift – 3×10"],
      Thursday: ["Overhead Press – 4×8", "Arnold Press – 3×12", "Lateral Raises – 3×15", "Push-ups – 3×20", "Face Pulls – 3×12"],
      Friday: ["Bench Press – 4×8", "Dumbbell Rows – 3×12", "Bicep Curls – 3×12", "Chin-ups – 3×10", "Farmer Carry – 3×40m"],
      Saturday: ["Squats – 4×10", "Deadlifts – 4×6", "Lunges – 3×12", "Leg Extensions – 3×15", "Hamstring Curls – 3×15"],
      Sunday: ["Active Recovery: Light Walk / Stretch"],
    },
    withoutweight: {
      Monday: ["Push-ups – 4×20", "Diamond Push-ups – 3×15", "Squats – 4×20", "Pull-ups – 3×10", "Plank – 3×2 min"],
      Tuesday: ["Handstand Push-ups – 3×8", "Lunges – 4×15", "Push-ups – 4×20", "Squats – 4×20", "Burpees – 3×15"],
      Wednesday: ["Pull-ups – 4×10", "Push-ups – 4×20", "Lunges – 4×15", "Plank – 3×2 min", "Pistol Squats – 3×8"],
      Thursday: ["Wide Push-ups – 4×20", "Chin-ups – 4×10", "Squats – 4×25", "Burpees – 4×15", "Mountain Climbers – 3×20"],
      Friday: ["Push-ups – 5×20", "Pull-ups – 5×10", "Squats – 4×20", "Plank – 3×2 min", "Sit-ups – 3×25"],
      Saturday: ["Push-ups – 4×25", "Lunges – 4×20", "Pull-ups – 4×12", "Burpees – 3×15", "Plank – 3×2 min"],
      Sunday: ["Active Recovery: Yoga / Rest"],
    },
  },
  muscle: {
    withweight: {
      Monday: ["Bench Press – 4×8", "Incline Press – 3×10", "Shoulder Press – 3×12", "Deadlift – 4×6", "Squats – 4×10"],
      Tuesday: ["Dumbbell Rows – 4×10", "Lat Pulldown – 3×12", "Barbell Curls – 3×12", "Tricep Extensions – 3×12", "Face Pulls – 3×12"],
      Wednesday: ["Squats – 4×10", "Leg Press – 4×12", "Lunges – 3×12", "Calf Raises – 3×20", "Romanian Deadlifts – 3×10"],
      Thursday: ["Overhead Press – 4×8", "Arnold Press – 3×10", "Push-ups – 4×20", "Lateral Raises – 3×15", "Front Raises – 3×12"],
      Friday: ["Bench Press – 4×8", "Pull-ups – 3×12", "Rows – 3×12", "Deadlifts – 3×6", "Bicep Curls – 3×12"],
      Saturday: ["Squats – 4×10", "Lunges – 3×12", "Hamstring Curls – 3×12", "Leg Extensions – 3×12", "Romanian Deadlifts – 3×8"],
      Sunday: ["Active Recovery: Yoga / Rest"],
    },
    withoutweight: {
      Monday: ["Pull-ups – 5×10", "Push-ups – 5×20", "Pistol Squats – 3×8 each", "Plank – 3×2 min", "Burpees – 3×15"],
      Tuesday: ["Diamond Push-ups – 4×15", "Pull-ups – 4×10", "Lunges – 4×15", "Crunches – 3×20", "Plank – 3×2 min"],
      Wednesday: ["Push-ups – 5×20", "Squats – 5×20", "Burpees – 4×15", "Mountain Climbers – 4×20", "Plank – 3×2 min"],
      Thursday: ["Pull-ups – 4×10", "Push-ups – 4×20", "Lunges – 4×15", "Burpees – 4×15", "Sit-ups – 3×20"],
      Friday: ["Handstand Push-ups – 4×6", "Pull-ups – 4×12", "Push-ups – 5×20", "Plank – 3×2 min", "Crunches – 3×25"],
      Saturday: ["Push-ups – 5×20", "Pistol Squats – 3×8", "Lunges – 4×15", "Pull-ups – 4×10", "Burpees – 4×15"],
      Sunday: ["Active Recovery: Walking / Yoga / Rest"],
    },
  },
  crossfit: {
    withweight: {
      Monday: ["Clean & Jerk – 4×6", "Snatch – 4×6", "Deadlift – 3×8", "Push Press – 3×12", "CrossFit WOD AMRAP – 20 min"],
      Tuesday: ["Front Squats – 4×10", "Pull-ups – 4×12", "Kettlebell Swings – 3×15", "Bench Press – 4×8", "Rowing – 15 min"],
      Wednesday: ["Deadlifts – 4×6", "Overhead Press – 4×8", "Box Jumps – 3×15", "Farmer Carry – 3×40m", "Burpee Pull-ups – 3×10"],
      Thursday: ["Back Squats – 4×10", "Clean Pulls – 3×8", "Push-ups – 3×20", "Wall Balls – 3×15", "Jump Rope – 10 min"],
      Friday: ["Snatch Balance – 4×6", "Handstand Push-ups – 4×8", "Chest-to-bar Pull-ups – 3×12", "Deadlifts – 4×6", "CrossFit MetCon – 20 min"],
      Saturday: ["Thrusters – 4×8", "Power Cleans – 4×6", "Kettlebell Deadlifts – 3×12", "Box Jumps – 3×15", "Sled Push – 3 rounds"],
      Sunday: ["Active Recovery: Yoga / Stretching / Rest"],
    },
    withoutweight: {
      Monday: ["Burpees – 5×15", "Push-ups – 5×20", "Sprints – 10×100m", "Mountain Climbers – 4×20", "Bodyweight WOD – 20 min"],
      Tuesday: ["Jump Squats – 4×15", "Pull-ups – 4×10", "Push-ups – 4×20", "Burpees – 4×15", "Plank Hold – 3×1 min"],
      Wednesday: ["Running – 30 min", "Jumping Jacks – 3×50", "Lunges – 3×15 each leg", "Sit-ups – 3×20", "Mountain Climbers – 3×25"],
      Thursday: ["Push-ups – 4×20", "Burpees – 4×15", "Jump Squats – 4×15", "Pull-ups – 4×10", "HIIT Circuit – 15 min"],
      Friday: ["Sprint Intervals – 10×100m", "Push-ups – 4×25", "Lunges – 3×20", "Burpees – 4×15", "Plank Walk – 3×1 min"],
      Saturday: ["Bodyweight AMRAP – 20 min", "Pull-ups – 4×12", "Push-ups – 4×25", "Jump Rope – 10 min", "Burpees – 5×12"],
      Sunday: ["Active Recovery: Walking / Yoga / Rest"],
    },
  },};
  const diets = {weightloss: {
    veg: [
      "Breakfast: Oats with almond milk & fruits",
      "Lunch: Brown rice + dal + sautéed vegetables",
      "Snack: Nuts + green tea",
      "Dinner: Quinoa salad + soup",
    ],
    nonveg: [
      "Breakfast: Oats + boiled eggs",
      "Lunch: Grilled chicken + veggies",
      "Snack: Greek yogurt + nuts",
      "Dinner: Fish + salad",
    ],
  },
  weightgain: {
    veg: [
      "Breakfast: Paneer paratha + milk",
      "Lunch: Rice + rajma + potato curry",
      "Snack: Peanut butter sandwich",
      "Dinner: Paneer curry + roti + ghee",
    ],
    nonveg: [
      "Breakfast: Eggs + whole milk",
      "Lunch: Rice + chicken curry + veggies",
      "Snack: Tuna sandwich",
      "Dinner: Salmon + sweet potato",
    ],
  },
  muscle: {
    veg: [
      "Breakfast: Protein shake + oats + nuts",
      "Lunch: Brown rice + paneer curry + spinach",
      "Snack: Sprouts salad + soy chunks",
      "Dinner: Tofu + quinoa + salad",
    ],
    nonveg: [
      "Breakfast: Eggs + chicken sausage + oats",
      "Lunch: Rice + beef + broccoli",
      "Snack: Whey shake + almonds",
      "Dinner: Chicken breast + quinoa + veggies",
    ],
  },
  crossfit: {
    veg: [
      "Breakfast: Peanut butter oats + banana",
      "Lunch: Rice + dal + mixed veggies",
      "Snack: Protein bar + nuts",
      "Dinner: Paneer tikka + roti",
    ],
    nonveg: [
      "Breakfast: Banana + eggs + whey",
      "Lunch: Rice + grilled chicken + avocado",
      "Snack: Tuna salad + nuts",
      "Dinner: Fish + sweet potato + veggies",
    ],
  },};

  const weeklyPlan = plans[goal?.toLowerCase()]?.[type?.toLowerCase()] || {};
  const todayPlan = weeklyPlan[day] || ["Rest Day"];
  const todayDiet = diets[goal?.toLowerCase()]?.[dietType?.toLowerCase()] || ["Balanced meals"];

  if (render) return render(todayPlan, todayDiet);

  return (
    <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition-all">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4 text-center">
        {day} Workout Plan
      </h3>
      <ul className="list-disc ml-6 space-y-2 text-gray-100">
        {todayPlan.map((ex, i) => (
          <li key={i} className="hover:text-blue-400 transition">{ex}</li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold text-purple-300 mt-6 mb-4 text-center">
        Diet Plan ({dietType})
      </h3>
      <ul className="list-disc ml-6 space-y-2 text-gray-100">
        {todayDiet.map((meal, i) => (
          <li key={i} className="hover:text-purple-400 transition">{meal}</li>
        ))}
      </ul>
    </div>
  );
}
