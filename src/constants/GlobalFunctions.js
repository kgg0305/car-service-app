export function GetDateStringFromDate(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    const reg_date_text = year + '-' + month + '-' + day;
    return reg_date_text;
}

export function GetDateTimeStringFromDate(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();

    const reg_date_text1 = year + '-' + month + '-' + day;
    const reg_date_text2 = hour + ':' + minute + ':' + seconds;

    return reg_date_text1 + ' ' + reg_date_text2
}