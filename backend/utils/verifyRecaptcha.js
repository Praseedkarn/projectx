import fetch from "node-fetch";

export const verifyRecaptcha = async (token) => {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success === true;

  } catch (err) {
    console.error("Captcha verify error:", err);
    return false;
  }
};
