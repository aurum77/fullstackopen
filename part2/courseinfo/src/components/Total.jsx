const Total = ({ course }) => {
  let sum = course.parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0); // <- initial value of accumulator

  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

export default Total;
