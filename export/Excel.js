import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function DownloadAsExcel(props) {
  console.log(props.data)
  const { children } = props

  return <>{children}</>;
}

export default DownloadAsExcel;
