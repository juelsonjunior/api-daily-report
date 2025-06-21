export default function getCurrentWeek() {
  const monday = new Date();
  const daysWeek = monday.getDay();
  const differenceForMonday = daysWeek == 0 ? 6 : daysWeek - 1;
  monday.setDate(monday.getDate() - differenceForMonday);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return { monday, sunday };
}
