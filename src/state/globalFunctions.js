export const DDMMYYYY = (YYYYMMDD) => {
  const a = YYYYMMDD.split("-");
  return a[2] + "/" + a[1] + "/" + a[0];
};

export const MXMNDate = (x, date) => {
  const dt = date ? new Date(date) : new Date();
  dt.setDate(dt.getDate() + x);
  return dt;
};

export const formatTimestamp = (timeStamp) => {
  // Create a Date object from the timestamp
  const dateObj = new Date(timeStamp);

  // Format the date as dd-mm-yyyy
  const date = `${(dateObj.getDate() < 10 ? "0" : "") + dateObj.getDate()}-${(dateObj.getMonth() < 9 ? "0" : "") + (dateObj.getMonth() + 1)
    }-${dateObj.getFullYear()}`;

  // Format the time with leading zeros as HH:MM
  const time = `${(dateObj.getHours() < 10 ? "0" : "") + dateObj.getHours()}:${(dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes()
    }`;

  // Return an object containing formatted date and time
  return {
    date,
    time,
  };
};


export const getDataFromResponse = async (response) => {
  const data = await response.json();

  if (data.success && data?.data)
    return data.data;
  else
    alert(data.message)

  return null;
}