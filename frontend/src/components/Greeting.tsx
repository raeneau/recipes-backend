/**
 * Greeting Component
 * Displays a welcome message with a title and subtitle
 */
const Greeting = () => {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
      <h1 className="text-4xl font-bold text-center mb-8">
        Hello World!
      </h1>
      <p className="text-center text-xl">
        Welcome to our Next.js Application
      </p>
    </div>
  );
};

export default Greeting; 