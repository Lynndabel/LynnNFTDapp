import { toast } from 'react-toastify';

// Custom toast styles for each type
export const showToast = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: "linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(219, 39, 119, 0.2))",
        borderLeft: "4px solid #8B5CF6",
        color: "white",
      },
    });
  },
  
  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: "rgba(220, 38, 38, 0.2)",
        borderLeft: "4px solid #EF4444",
        color: "white",
      },
    });
  },
  
  warning: (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: "rgba(245, 158, 11, 0.2)",
        borderLeft: "4px solid #F59E0B",
        color: "white",
      },
    });
  },
  
  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: "rgba(59, 130, 246, 0.2)",
        borderLeft: "4px solid #3B82F6",
        color: "white",
      },
    });
  },
  
  // For transactions that are pending
  pending: (message) => {
    return toast.loading(message, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      style: {
        background: "rgba(55, 65, 81, 0.8)",
        borderLeft: "4px solid #9333EA",
        color: "white",
      },
    });
  },
  
  // Update a pending toast
  update: (toastId, message, type) => {
    const options = {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 5000,
    };
    
    toast.update(toastId, options);
  }
};

export default showToast;