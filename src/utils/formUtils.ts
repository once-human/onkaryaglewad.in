import { FormData } from "@/types/interfaces";
import { toastStatus } from "@/components/toast";
import { toast } from "react-toastify";

export const validateForm = (formData: FormData): Partial<FormData> => {
  const errors: Partial<FormData> = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (
    !formData.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    errors.email = "Valid email is required";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!formData.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
};

export const sendEmail = async (formData: FormData): Promise<void> => {
  const toastId = toast.loading("Sending message...");
  console.log("Sending message:", formData);
  
  // Use Formspree or a similar static form service for GitHub Pages
  const formSubmissionUrl = process.env.NEXT_PUBLIC_FORM_SUBMISSION_URL || 
    "https://formspree.io/f/your_formspree_id"; // Replace with your Formspree ID
  
  try {
    // For static sites like GitHub Pages, we use a form service instead of API routes
    const response = await fetch(formSubmissionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      toastStatus({ success: true, log: "Message sent!", toastId: toastId });
    } else {
      toastStatus({
        success: false,
        log: "Failed to send message!",
        toastId: toastId,
      });
    }
  } catch (err) {
    toastStatus({
      success: false,
      log: "Failed to send message! Reason: " + err,
      toastId: toastId,
    });
  }
};
