// config/email.js - Email configuration
const nodemailer = require('nodemailer');

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rizonrahat199@gmail.com",
    pass: "yufj bcis enjn camg",
  },
});

// Email template for task notifications
const createTaskEmailTemplate = (project, task) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            background: linear-gradient(135deg, #29c4a9, #006bce);
            color: #fff;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #ff5f6d, #ffc371);
            padding: 20px;
            text-align: center;
          }
          h1 {
            margin: 0;
            color: #fff;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          }
          .info {
            background-color: #f1f1f1;
            padding: 20px;
          }
          .info p {
            margin: 5px 0;
            color: #333;
          }
          .task-details {
            padding: 20px;
          }
          .task-details h2 {
            color: #e67e22;
            margin-top: 0;
          }
          .task-details p {
            margin: 5px 0;
            color: #333;
            font-weight: bold;
          }
          .task-details p span {
            font-weight: bold;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Task Added</h1>
          </div>
          <div class="info">
            <p><strong>Teacher:</strong> ${project.teacher}</p>
            <p><strong>Designation:</strong> ${project.designation}</p>
            <p><strong>Project Name:</strong> ${project.name}</p>
            <p><strong>Group No:</strong> ${project.team}</p>
          </div>
          <div class="task-details">
            <h2>Task Details</h2>
            <p><strong>Title:</strong> <span>${task.title}</span></p>
            <p><strong>Description:</strong> <span>${task.description}</span></p>
            <p><strong>Start Date:</strong> <span>${task.start_date}</span></p>
            <p><strong>Deadline:</strong> <span>${new Date(task.deadline).toLocaleString()}</span></p>
            <p><strong>Status:</strong> <span>${task.status}</span></p>
            <p>This task is assigned by <span> ${project.teacher}.</span>  Please complete it before the deadline.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send email notification for new task
const sendTaskNotification = async (project, task) => {
  try {
    const emailBody = createTaskEmailTemplate(project, task);
    
    const mailOptions = {
      from: "rizonrahat199@gmail.com",
      to: "it19031@mbstu.ac.bd", // In production, use: project.members.map(member => member.mail).join(',')
      subject: `New Task Added: ${task.title}`,
      html: emailBody,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = { transporter, sendTaskNotification };