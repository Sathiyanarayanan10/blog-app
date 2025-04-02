import{ useState } from "react";

const AddIcon = () => {
  const [hover, setHover] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50"
      height="50"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        // Arrow icon on hover
        <>
          <line x1="6" y1="18" x2="18" y2="6" />
          <polyline points="9 6 18 6 18 15" />
        </>
      ) : (
        // Plus icon by default
        <>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </>
      )}
    </svg>
  );
};

export default AddIcon;
