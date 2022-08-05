// convert school pdf to csv with this converter: "https://www.zamzar.com/de/convert/pdf-to-csv/"

/* const fs = require("fs");

// filenames
const name = "2-halbjahr-2021-22";

// read the file
const rawContent = fs.readFileSync(
  `../public/resources/stundenplan-${name}.csv`
);

const content = rawContent.toString();

// create file with timetable Object
fs.writeFile(`Timetable_${name}.json`, JSON.stringify(parsedClasses), (err) => {
  if (err) return console.log(err);

  console.log("Timetable saved successfully!");
}); */

const days = ["Mo", "Di", "Mi", "Do", "Fr"];

export default function convert(content, pageSplit) {
  // each school class has its own a4 page
  // in the raw content form divided by: "Stundenplan21"
  const classes = content.split(pageSplit);

  let parsedClasses = {};
  // label each school class
  for (let i = 0; i < classes.length - 1; i++) {
    // split into heading and all different days
    let schoolClass = classes[i];
    days.forEach((keyword) => {
      let idx = schoolClass.indexOf(`${keyword}-1`);
      schoolClass = [
        schoolClass.slice(0, idx),
        "split_",
        schoolClass.slice(idx),
      ].join("");
    });
    let parts = schoolClass.split("split_");

    let { className, classTeachers } = parseHeading(parts[0]);
    let timetable = parseTimetable(parts.slice(1));

    let classObj = { classTeachers, timetable };
    parsedClasses[className] = classObj;
  }

  return parsedClasses;
}

function parseHeading(header) {
  // only get the last line (first two don't matter)
  let headerlines = header.split("\n");
  let line = headerlines[headerlines.length - 2];

  // trim of commas from beginning and end
  let parsedHeading = line.replace(/(^[,\s]+)|([,\s]+$)/g, "");

  let className = parsedHeading.slice(0, 2);
  let rawClassTeachersString = parsedHeading.slice(2);
  let classTeachers = rawClassTeachersString.split("/");

  // remove spaces from the strings
  classTeachers = classTeachers.map((teacher) => teacher.replace(" ", ""));

  // remove empty Strings
  classTeachers = classTeachers.filter((teacher) => !!teacher.length);

  return { className, classTeachers };
}

function parseTimetable(timetableArr) {
  // create timetable object from days array ({mo: [], di: [], ...})
  let timetable = days.reduce((acc, curr) => ((acc[curr] = []), acc), {});

  // loop over all days
  for (let i = 0; i < timetableArr.length; i++) {
    // devide days into each school hour
    let lessons = timetableArr[i].split(`${days[i]}-`);

    outer: for (let k = 1; k < lessons.length; k++) {
      // single lesson
      timetable[days[i]].push([]);

      // trim of day (e.x.: Mo-1)
      let trimmedLesson = lessons[k].slice(1);

      // trim of commas
      trimmedLesson = trimmedLesson.replace(/(^[,\s]+)|([,\s]+$)/g, "");
      trimmedLesson = trimmedLesson.replace("\r\n", "");

      // course format: "name,teacher,room" (split at comma or space)
      let seperated = trimmedLesson.split(/,| /);

      // group every 3 together
      inner: for (let j = 0; j < seperated.length; j += 3) {
        // correct for errors
        // check if room is actually a room
        if (!seperated[j + 2]?.includes(".") && !seperated[j + 2] == "KaRa") {
          continue outer
        }
        let courseObj = {
          course: seperated[j],
          teacher: seperated[j + 1],
          room: seperated[j + 2],
        };
        timetable[days[i]][k - 1].push(courseObj);
      }
    }
  }

  return timetable;
}
