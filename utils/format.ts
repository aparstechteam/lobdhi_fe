const formatDate = (d: string): string => {
  const date = new Date(d);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getMonthDate = (d: string): string => {
  const date = new Date(d);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const formatInputDate = (d: any): string => {
  const date = new Date(d).toISOString().split("T")[0];
  return date;
};

const getMonth = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const formatNumber = (n: number): string => {
  return Intl.NumberFormat("bn-BD").format(n);
};

const getDayTime = (d: string): string => {
  const date = new Date(d);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  });
};

const formatDateTime = (d: string): string => {
  const date = new Date(d);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const calculateDuration = (s: string, e: string): string => {
  const start = new Date(s);
  const end = new Date(e);

  const diff = end.getTime() - start.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
};

const selectOptions = (
  data: any[],
  labelKey: string,
  valueKey: string,
  extra: string = ""
) => {
  return data.map((item) => {
    return {
      label: item[labelKey] + (extra ? " - " + item[extra] : ""),
      value: item[valueKey],
    };
  });
};
const openLink = (link: string) => {
  window.open(link, "_blank");
};
export {
  formatDate,
  formatInputDate,
  formatNumber,
  formatDateTime,
  calculateDuration,
  selectOptions,
  openLink,
  getMonth,
  getMonthDate,
  getDayTime,
};
