export default function Excercise(
    {problem}
) {
  return (
    <div className="max-w-3xl mx-auto p-4">
        <h1>{problem.title}</h1>
        <p>{problem.description}</p>
        <div className="mt-4">
            <ul>
                {problem.steps.map((item, index) => (
                    <li key={index} className="mb-2">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}