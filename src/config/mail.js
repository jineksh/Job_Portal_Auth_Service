import dotenv from 'dotenv';
import nodemailer from  'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from './server.js';
dotenv.config();



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,        
    pass: GMAIL_PASS, 
  },
});

export default transporter;