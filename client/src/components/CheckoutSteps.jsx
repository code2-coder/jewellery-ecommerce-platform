import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: "Sign In", active: step1, link: "/login" },
    { name: "Shipping", active: step2, link: "/shipping" },
    { name: "Payment", active: step3, link: "/payment" },
    { name: "Place Order", active: step4, link: "/placeorder" },
  ];

  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-12">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {step.active ? (
            <Link to={step.link} className="flex flex-col items-center group">
              <div className="w-8 h-8 rounded-full bg-aurelia-gold text-white flex items-center justify-center font-medium text-sm mb-2 shadow-sm transition-transform group-hover:scale-110">
                {step.name === "Sign In" && step2 ? <FiCheck /> : index + 1}
              </div>
              <span className="text-xs uppercase tracking-widest text-aurelia-gold font-medium">
                {step.name}
              </span>
            </Link>
          ) : (
            <div className="flex flex-col items-center opacity-40 cursor-not-allowed">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium text-sm mb-2">
                {index + 1}
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-500">
                {step.name}
              </span>
            </div>
          )}
          {index < steps.length - 1 && (
            <div className={`w-8 sm:w-16 h-px ml-4 sm:ml-8 ${step.active && steps[index + 1].active ? "bg-aurelia-gold" : "bg-gray-200"}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
