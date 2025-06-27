const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Configure nodemailer (exemple avec Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "TON_EMAIL@gmail.com", // Mets ton email ici
    pass: "TON_MDP_APPLICATION"  // Mets ton mot de passe d'application ici
  }
});

// Route pour le formulaire
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: `"Portfolio" <TON_EMAIL@gmail.com>`,
      to: "TON_EMAIL@gmail.com", // Où tu veux recevoir les messages
      subject: "Nouvelle inscription portfolio",
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><b>Nom:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br>${message}</p>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Lance le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});