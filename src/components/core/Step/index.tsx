import { Steps } from "antd";

const description = "This is a description.";
const Step = ({ status }: any) => {
  console.log(status);

  let currentStep = 0;

  switch (status) {
    case "Pending":
      currentStep = 1;
      break;
    case "Decline":
      currentStep = 2;
      break;
    case "approved":
      currentStep = 2;
      break;
    default:
      currentStep = 0;
  }

  return (
    <Steps
      direction="vertical"
      current={2}
      status={
        status === "Declined"
          ? "error"
          : status === "Approved"
          ? "finish"
          : "process"
      }
      items={[
        {
          title: "Create",
          description:
            "Your application has been created, please wait for admin to approve!",
        },
        {
          title: "Pending...",
          description,
        },
        {
          title: status === "Declined" ? "Declined" : "Approved",
          description:
            status === "Declined"
              ? "Sorry ! Your application has been rejected by the Admin! :("
              : "Great ! Your application has been approved!",
        },
      ]}
    />
  );
};

export default Step;
