import { useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, MessageSquare } from "lucide-react"; // icons

import axiosInstance from "../Helpers/axiosinstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isEmail(userInput.email)) {
      toast.error("Invalid Email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col gap-6 card-modern w-full max-w-lg"
        >
          <h1 className="text-center text-3xl font-bold" style={{ color: 'var(--color-black)' }}>Contact Us ✉️</h1>
          <p className="text-center text-sm" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
            Have questions or feedback? Send us a message and we’ll get back to
            you soon.
          </p>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-sm text-gray-200">
              Name
            </label>
            <div className="flex items-center gap-2 input-modern">
              <User className="w-5 h-5" style={{ color: 'var(--color-black)', opacity: 0.5 }} />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="w-full bg-transparent outline-none border-none"
                style={{ color: 'var(--color-black)' }}
                onChange={handleInputChange}
                value={userInput.name}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm text-gray-200">
              Email
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg px-3 py-2 focus-within:border-yellow-500">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                onChange={handleInputChange}
                value={userInput.email}
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-medium text-sm"
              style={{ color: 'var(--color-black)' }}
              className="font-medium text-sm"
              style={{ color: 'var(--color-black)' }}
              Message
            </label>
            <div className="flex items-center gap-2 input-modern">
            <div className="flex items-start gap-2 input-modern">
              <MessageSquare className="w-5 h-5 mt-1" style={{ color: 'var(--color-black)', opacity: 0.5 }} />
                name="message"
                id="message"
                placeholder="Enter your message..."
                className="w-full bg-transparent outline-none border-none"
                className="w-full bg-transparent outline-none border-none resize-none h-32"
                style={{ color: 'var(--color-black)' }}
                onChange={handleInputChange}
                value={userInput.message}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-modern btn-primary"
          >
            Send Message
          </button>
        </form>
      </div>
    </HomeLayout>
  )
  );
}

export default Contact;
