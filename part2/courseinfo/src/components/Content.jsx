import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} course={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
