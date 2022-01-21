//CHANGE STATUS BUTTON COLOR BASED ON ORDER STATUS

export const statusColor = (orderStatus) => {
  let style;
  if (orderStatus === "Processing") {
    style = { backgroundColor: "var(--processing)" };
  } else if (orderStatus === "Processed") {
    style = { backgroundColor: "var(--processed)", color: "white" };
  } else if (orderStatus === "Shipped") {
    style = { backgroundColor: "var(--shipped)", color: "white" };
  } else if (orderStatus === "Received") {
    style = { backgroundColor: "var(--received)", color: "white" };
  }
  return style;
};
