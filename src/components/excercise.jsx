export default function Excercise(
    {problem, children}
) {
  return (
    <div className="space-y-4 h-dvh">
        <p className="font-primary text-lg">{problem.description}</p>
        <ul className="list-disc pl-5">
            {problem.steps.map((item, index) => (
                <li key={index} className="mb-2 font-primary text-lg">
                    {item}
                </li>
            ))}
        </ul>
        {children}
    </div>
  );
}