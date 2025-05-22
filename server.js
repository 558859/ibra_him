const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public")); // Place tes fichiers HTML/CSS/JS dans un dossier "public"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remplace par tes infos Gmail ou autre SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ton.email@gmail.com", // remplace par ton email
    pass: "mot_de_passe_application" // mot de passe d'application Gmail
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: `"Portfolio" <ton.email@gmail.com>`,
      to: "ton.email@gmail.com", // où tu veux recevoir les messages
      subject: "Nouvelle inscription portfolio",
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><b>Nom:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br>${message}</p>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});