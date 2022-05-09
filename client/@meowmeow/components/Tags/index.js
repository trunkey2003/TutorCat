import { useEffect } from "react";

const Tags = (props) => {
        const Tags = props.tags;
        return (
            <div className="flex flex-nowrap mt-2">
                        {Tags.map((row, index) => (
            <span key={index} className="text-sm mr-2 p-1 h-7 rounded bg-blue-100 text-gray-500">{row}</span>
          ))}
            </div>
        );
}

export default Tags;

