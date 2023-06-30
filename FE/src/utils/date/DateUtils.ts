export class DateUtils {
  public static dateToEpoch(date: Date): Date {
    const dateStringFormat: string =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    return new Date(dateStringFormat);
  }

  public static compareDates(date1: Date, date2: Date): number {
    const dateTime1 = date1.getTime();
    const dateTime2 = date2.getTime();

    if (dateTime1 > dateTime2) {
      return 1;
    }

    if (dateTime1 < dateTime2) {
      return -1;
    }

    return 0;
  }

  public static parseDateToString(
    date: Date,
    format: string = "yyyy-mm-dd"
  ): string {
    const formatter = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    });

    const parts = formatter.formatToParts(date);

    const formattedDate = format
      .replace("dd", parts.find((part) => part.type === "day")?.value!)
      .replace("mm", parts.find((part) => part.type === "month")?.value!)
      .replace("yyyy", parts.find((part) => part.type === "year")?.value!);

    return formattedDate;
  }
}
