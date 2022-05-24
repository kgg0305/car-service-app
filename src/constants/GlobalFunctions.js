export function GetDateStringFromDate(date) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  const date_text = year + "-" + month + "-" + day;
  return date_text;
}

export function GetDateTimeStringFromDate(date) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  const date_text1 = year + "-" + month + "-" + day;
  const date_text2 = hour + ":" + minute + ":" + seconds;

  return date_text1 + " " + date_text2;
}

export function GetDateFullTimeStringUsingKorFromDate(date) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  const date_text1 = year + "-" + month + "-" + day;
  const date_text2 = hour + "시 " + minute + "분 " + seconds + "초";

  return date_text1 + " " + date_text2;
}

export function GetDateTimeUntilMinuteStringUsingKorFromDate(date) {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  const date_text1 = year + "-" + month + "-" + day;
  const date_text2 = hour + "시 " + minute + "분";

  return date_text1 + " " + date_text2;
}

export function GetTimeStringFromDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  const time_text = hour + ":" + minute + ":" + seconds;

  return time_text;
}

export function GetBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}