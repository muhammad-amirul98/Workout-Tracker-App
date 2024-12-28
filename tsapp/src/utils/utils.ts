export const getWorkoutIdFromHref = (href: string): string => {
  const match = href.match(/\/api\/workouts\/(\d+)/);
  return match ? match[1] : ""; // Return the ID or an empty string if not found
};

const testHrefs = [
  "http://localhost:8080/api/workouts/1",
  "http://localhost:8080/api/workouts/42",
  "http://localhost:8080/api/workouts/123/exercise",
  "http://localhost:8080/api/exercises/1",
  "/api/workouts/5",
];

testHrefs.forEach((href) => {
  console.log(`Workout ID for '${href}':`, getWorkoutIdFromHref(href));
});
