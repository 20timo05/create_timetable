// dummy data (from me)
const courses = [
  "IFA",
  "swB",
  "eB",
  "muB",
  "chA",
  "MLK2",
  "spB",
  "dB",
  "PHLK",
  "krE",
];

const zeiten = [
  "07:45-08:30",
  "08:30-09:15",
  "09:35-10:20",
  "10:20-11:05",
  "11:20-12:05",
  "12:10-12:55",
  "12:55-13:40",
  "13:45-14:30",
  "14:30-15:15",
];

const days = ["Mo", "Di", "Mi", "Do", "Fr"];

function Stundenplan(props) {
  const userTimetableArr = [
    "",
    "Zeit",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
  ];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 7; col++) {
      let text = "";

      // Stundennummer
      if (col == 0) text = row + 1;

      // Zeit
      if (col == 1) text = zeiten[row];

      // Tage
      if (col >= 2) {
        let day = days[col - 2];
        let { course, teacher, room, freeHour } = props.timetable[day][row];

        if (freeHour) text = "";
        else {
          let arr = []
            if (props.show.course) arr.push(course)
            if (props.show.room) arr.push(room)
            if (props.show.teacher) arr.push(teacher)

          text = arr.join(" ")
        };
      }

      userTimetableArr.push(text);
    }
  }

  return (
    <section className={props.class}>
      {userTimetableArr.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </section>
  );
}

export default Stundenplan;
