export default function getQueryDateRange(from, to) {
  const startdata = new Date(from);
  const endData = new Date(to);
  endData.setDate(endData.getDate() + 1);

  return { startdata, endData };
}
