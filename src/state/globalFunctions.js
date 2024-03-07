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



/**
 * Recursively appends data to a FormData object.
 * @param {FormData} formData - The FormData object to append data to.
 * @param {object} object - The data object to append.
 * @param {string} parentKey - The parent key (used for nested objects).
 */
export const appendData = (formData, object, parentKey) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the value is an object and not an instance of File.
      if (typeof object[key] === "object" && !(object[key] instanceof File)) {
        // Recursively append nested object data.
        appendData(formData, object[key], currentKey);
      } else {
        formData.append(currentKey, object[key]);
      }
    }
  }
}