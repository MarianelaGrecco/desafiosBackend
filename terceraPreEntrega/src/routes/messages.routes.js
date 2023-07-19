import { Router } from "express";
import { transporter } from "../utils/nodemailer.js";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
  try {
    await transporter.sendMail({
      to: [""],
      subject: "Bienvenido",
      html: "<h1>Visitá nuestra tienda</h1>",
    });
    res.status(200).send("Mail send");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

messagesRouter.post('/',async(req,res)=>{
    const {email,name,quote} = req.body
    try {
        await transporter.sendMail({
            to: email,
            subject: `Welcome ${name}`,
            text: quote
        })
        res.status(200).send('Mail sent')
    } catch (error) {
        res.status(500).json({ message: error })
    }
})
export default messagesRouter;
