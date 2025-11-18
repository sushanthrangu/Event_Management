// services/supportBot.js

// Simple rule-based bot for your event management site.
// No external APIs, no AI providers.

function getSupportReply(messageRaw) {
    if (!messageRaw) {
      return "Hi! I can help with event registration, event info, and login issues. Try asking a question 🙂";
    }
  
    const msg = messageRaw.toLowerCase().trim();
  
    // 1) Register / create new event
    if (
      (msg.includes("create") || msg.includes("register") || msg.includes("add")) &&
      msg.includes("event")
    ) {
      return (
        "To register/create a new event:\n" +
        "1. Log in to your account.\n" +
        "2. Go to the 'Create Event' or 'New Connection' page (usually under the Events/Connections menu).\n" +
        "3. Fill in the event title, date, time, location, and description.\n" +
        "4. Click 'Save' or 'Create'.\n" +
        "If you see any error while creating the event, please check that all required fields are filled."
      );
    }
  
    // 2) List / what are the events
    if (
      msg.includes("what events") ||
      msg.includes("events available") ||
      msg.includes("show events") ||
      (msg.includes("events") && msg.includes("list"))
    ) {
      return (
        "You can see the list of events by going to the 'Events' or 'Connections' page in the top navigation.\n" +
        "There you will see all upcoming events with their date, time, and details.\n" +
        "Click on any event to view more information or to RSVP."
      );
    }
  
    // 3) Login issues
    if (
      msg.includes("login") ||
      msg.includes("log in") ||
      msg.includes("sign in") ||
      msg.includes("password")
    ) {
      return (
        "If you have issues with login:\n" +
        "1. Make sure your email/username and password are correct.\n" +
        "2. Try using the 'Forgot Password' option if available.\n" +
        "3. Clear your browser cache or try a different browser.\n" +
        "4. If the problem continues, contact support or the admin with a screenshot of the error."
      );
    }
  
    // 4) Registration / account issues
    if (msg.includes("register") && (msg.includes("account") || msg.includes("sign up"))) {
      return (
        "To register a new account:\n" +
        "1. Click on the 'Register' or 'Sign Up' link in the navigation.\n" +
        "2. Fill in your name, email, and password.\n" +
        "3. Submit the form.\n" +
        "4. If email verification is required, check your inbox and follow the link."
      );
    }
  
    // 5) Generic help
    if (msg.includes("help") || msg.includes("how to")) {
      return (
        "I can help with:\n" +
        "- How to create/register a new event\n" +
        "- Where to see the list of events\n" +
        "- Problems with login or registration\n" +
        "Try asking me one of these topics 🙂"
      );
    }
  
    // Fallback
    return (
      "I'm a simple assistant for this event site. I mostly understand questions about:\n" +
      "- Creating/registering events\n" +
      "- Viewing events\n" +
      "- Login/registration issues\n" +
      "Please ask about one of these, or contact the admin for other questions."
    );
  }
  
  module.exports = { getSupportReply };
  