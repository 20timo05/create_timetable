export function createTimeTable(timetable, schoolLevel, courses) {
  let userTimetable = {};

  if (!timetable || !schoolLevel || !courses) return userTimetable;

  Object.entries(timetable[schoolLevel]?.timetable).forEach(([day, lessons]) => {
    userTimetable[day] = [];
    for (let lesson of lessons) {
      let freeHour = true;
      for (let courseObj of lesson) {
        if (courses.includes(courseObj.course)) {
          userTimetable[day].push(courseObj);
          freeHour = false;
        }
      }
      if (freeHour) userTimetable[day].push({ freeHour });
    }
  });

  return userTimetable;
}

export function getCourses(timetable, schoolLevel) {
  let level = timetable[schoolLevel];
  
  let courses = [];
  Object.entries(level.timetable).forEach(([dayName, schoolDay]) => {
    schoolDay.forEach((lesson) => {
      lesson.forEach(({ course }) => {
        if (!courses.includes(course)) {
          courses.push(course);
        }
      });
    });
  });
  return courses;
}

export const getTimetableObj = () => JSON.stringify(timetable);
