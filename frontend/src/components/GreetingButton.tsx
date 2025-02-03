'use client';

/**
 * GreetingButton Component
 * A button that displays an alert with a greeting when clicked
 */
const GreetingButton = () => {
  const handleClick = () => {
    alert('Hi!');
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      Click Me!
    </button>
  );
};

export default GreetingButton; 