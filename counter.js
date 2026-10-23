export function stepsRemaining(count, goal) {
  if (goal === null || goal === undefined || goal === "") {
    return null;
  }
  const target = Number(goal);
  if (!Number.isFinite(target)) {
    return null;
  }
  return target - Number(count);
}

export function goalMessage(count, goal) {
  const remaining = stepsRemaining(count, goal);
  if (remaining === null) {
    return "No goal set.";
  }
  if (remaining === 0) {
    return "Goal reached.";
  }
  if (remaining > 0) {
    return `${remaining} to go.`;
  }
  return `Past the goal by ${Math.abs(remaining)}.`;
}
