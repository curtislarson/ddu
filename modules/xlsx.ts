import Excel from "https://esm.sh/exceljs";

export async function* rowGenerator(path: string) {
  const workbookReader = new Excel.stream.xlsx.WorkbookReader(path, {
    worksheets: "emit",
    sharedStrings: "cache",
    hyperlinks: "cache",
    styles: "cache",
    entries: "emit",
  });

  for await (const worksheetReader of workbookReader) {
    for await (const row of worksheetReader) {
      yield row;
    }
  }
}
