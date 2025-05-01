"use client";
import { useState } from "react";
import { ToastComponent, toastStatus } from "@/components/toast";
import { toast } from "react-toastify";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const placeHolderTheme =
    "p-2 mt-2 rounded-md text-sm font-normal textSecondaryTheme borderTheme transitionButtonTheme cardDarkerTheme";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const loadingToastId = toast.loading("Submitting your message...");

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
        name: {value: string};
        email: {value: string};
        subjectField: {value: string};
        message: {value: string};
        _subject: {value: string}; // Include hidden fields if needed by logic (or just send all)
    };

    // Gather data into a plain object
    const formDataObject = {
        name: formElements.name.value,
        email: formElements.email.value,
        subjectField: formElements.subjectField.value,
        message: formElements.message.value,
        _subject: formElements._subject.value, // Include hidden subject
        // Add other hidden fields if necessary
    };

    const formAction = form.action; // Use the action directly

    try {
      const response = await fetch(formAction, {
        method: "POST",
        body: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        toastStatus({ success: true, log: "Form submitted successfully.", toastId: loadingToastId });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        let errorMsg = `Form submission failed: ${response.statusText} (${response.status})`;
        try {
          const data = await response.json();
          errorMsg = data.message || data.error || errorMsg;
        } catch (jsonError) {
          console.warn("Could not parse error response as JSON, trying text...");
          try {
            const textData = await response.text();
            if (textData) {
              errorMsg = textData;
            }
          } catch (textError) {
            console.error("Could not read error response text:", textError);
          }
        }
        setStatus("error");
        toastStatus({ success: false, log: errorMsg, toastId: loadingToastId });
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const networkErrorMsg = "A network error occurred. Please check connection.";
      setStatus("error");
      toastStatus({ success: false, log: networkErrorMsg, toastId: loadingToastId });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="w-full relative">
      <ToastComponent />
      <form
        action="https://formsubmit.co/ajax/contact@onkaryaglewad.in"
        onSubmit={handleSubmit}
        className="flex flex-col"
        name="contactForm"
      >
        <input type="hidden" name="_subject" value="New Contact Form Submission!" />
        <div className="flex flex-col">
          <label htmlFor="name" className="text-md font-medium textTheme">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name here (e.g. Onkar Yaglewad)"
            className={placeHolderTheme}
            required
            disabled={status === "submitting"}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="email" className="text-md font-medium textTheme">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email here (e.g. onkaryaglewad@gmail.com)"
            className={placeHolderTheme}
            required
            disabled={status === "submitting"}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="subjectField" className="text-md font-medium textTheme">
            Subject
          </label>
          <input
            type="text"
            name="subjectField"
            id="subjectField"
            placeholder="Enter your subject here (e.g. Just saying Hi!)"
            className={placeHolderTheme}
            required
            disabled={status === "submitting"}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="message" className="text-md font-medium textTheme">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Enter your message here (e.g. Hello Onkar! I'd like to say Hi!)"
            className={placeHolderTheme}
            required
            disabled={status === "submitting"}
          />
        </div>
        <button
          type="submit"
          className="mt-5 p-2 rounded-md buttonTheme transitionButtonTheme disabled:opacity-50"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}; 