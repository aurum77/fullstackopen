const Header = ({ course }) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {
        course.parts.map((part) => (
          <Part course={part.name} exercise={part.exercises} />
        ))
      }
    </div>
  )
}

const Part = ({ course, exercise }) => {
  return (
    <p>
      {course} {exercise}
    </p>
  )
}

const Total = ({ course }) => {
  let sum = 0
  course.parts.forEach((part) => {
    sum += part.exercises
  })
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

export default App;
