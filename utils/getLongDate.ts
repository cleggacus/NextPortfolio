const getMonth = (date: Date) => {
  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

const getHours = (date: Date) => {
  const hours = date.getHours();

  if(hours > 12)
    return hours - 12;

  if(hours == 0)
    return 12;

  return hours;
}

const isAM = (date: Date) => {
  return date.getHours() < 12;
}

const getLongDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getDate()} ${getMonth(date)} ${date.getFullYear()}  ${getHours(date)}:${date.getMinutes()} ${isAM(date) ? "AM" : "PM"}`;
}

export default getLongDate;
