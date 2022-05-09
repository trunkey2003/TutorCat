
const Badge = ({ text }) => {
  return (
    <span key={text} className="text-sm mr-2 px-2.5 py-1 rounded bg-blue-100 text-gray-500">{text}</span>
  );
}

export default Badge;

