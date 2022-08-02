import { useState } from "react";

const Statistics = ({ stats }) => {
  let sum = 0
  stats.forEach((stat) => { sum += stat })

  let average = (stats[0] - stats[2]) / sum
  let positive = stats[0] / sum * 100

  if (sum === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <tbody>
        <StatisticLine text="good" value={stats[0]} />
        <StatisticLine text="neutral" value={stats[1]} />
        <StatisticLine text="bad" value={stats[2]} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics stats={[good, neutral, bad]} />
    </div>
  );
}

export default App;
