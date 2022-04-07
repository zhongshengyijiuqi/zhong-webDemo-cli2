import XLSX from 'xlsx'
//解析excel
function parseExcel(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary", cellDates: true }); //cellDates:true用于转换时间
      let sheetList = [];
      workbook.SheetNames.forEach((sheetName) => {
        let sheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
        let merges = workbook.Sheets[sheetName]["!merges"];
        if (sheetData.length)
          sheetList.push({
            sheetName,
            sheetData,
            merges,
          });
      });
      resolve(sheetList);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsBinaryString(file.raw);
  });
}
//aoa方式导出excel
function exportExcel_aoa(sheetList, excelName = "导出模板表") {
  if (!sheetList.length) {
    this.$message.error("导出数据不能为空");
    return;
  }
  let wb = XLSX.utils.book_new();
  sheetList.forEach((item) => {
    let sheetName = item.sheetName;
    let sheet = XLSX.utils.aoa_to_sheet(item.sheetData);
    if (item.merges) {
      sheet["!merges"] = item.merges;
    }
    XLSX.utils.book_append_sheet(wb, sheet, sheetName);
  });
  XLSX.writeFile(wb, `${excelName}.xlsx`);
}
//json方式导出excel
function exportExcel_json(sheetList, excelName = "导出模板表") {
  if (!sheetList.length) {
    this.$message.error("导出数据不能为空");
    return;
  }
  let wb = XLSX.utils.book_new();
  sheetList.forEach((item) => {
    let sheetName = item.sheetName;
    let sheet = XLSX.utils.json_to_sheet(item.sheetData);
    if (item.merges) {
      sheet["!merges"] = item.merges;
    }
    XLSX.utils.book_append_sheet(wb, sheet, sheetName);
  });
  XLSX.writeFile(wb, `${excelName}.xlsx`);
}

export {
  parseExcel,
  exportExcel_aoa,
  exportExcel_json,
}
