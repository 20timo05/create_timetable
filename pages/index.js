import { useRouter } from "next/router"
import { useContext } from "react";
import Context from "../store/context"

import Section from "../components/Section";
import Button from "../components/Form/Button";
import Input from "../components/Form/Input";

import convert from "../data/converter";

export default function uploadNewCSV() {
  const router = useRouter()

  const { setTimetable } = useContext(Context)

  const submitHandler = (evt) => {
    evt.preventDefault();
    const [pageSplitInput, fileUpload] = evt.target?.childNodes
    const pageSplit = pageSplitInput.childNodes[0]?.value
    const file = fileUpload?.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const fileData = event.target.result;
      if (!fileData) return console.log("An error occured while")
      const parsedData = convert(fileData, pageSplit);
      if (!parsedData) return console.log("Something went wrong")
      setTimetable(parsedData)
      console.log(parsedData)
      
      router.push("/Eingabe")
    };
  };

  return (
    <Section>
      <h1>Upload Timetable as CSV</h1>
      <p style={{ fontSize: "1rem", marginTop: "-30px", marginBottom: "40px" }}>
        Convert with:{" "}
        <a
          href="https://www.zamzar.com/de/convert/pdf-to-csv/"
          target="_blank"
          style={{ color: "var(--focusColorDark", cursor: "pointer" }}
        >
          <b>https://www.zamzar.com/de/convert/pdf-to-csv/</b>
        </a>
      </p>
      <form onSubmit={submitHandler}>
        <Input type="text" placeholder="Page split" defaultValue="Stundenplan21"/>
        <input type="file" accept=".csv" />
        <Button type="submit" text="Abschicken" />
      </form>
    </Section>
  );
}
