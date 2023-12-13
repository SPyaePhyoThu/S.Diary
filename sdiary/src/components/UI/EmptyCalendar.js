const EmptyCalendar = (props) => {
  return (
    <svg
      width="80px"
      height="80px"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M3.5 0V5M11.5 0V5M1.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5Z"
        stroke="#313638"
      />
    </svg>
  );
};
export default EmptyCalendar;
