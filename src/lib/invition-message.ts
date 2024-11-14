export const InviteMessage = (invition_link:string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slackify Workspace Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f7;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4A154B;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 20px 0;
            background-color: #4A154B;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        .footer {
            padding: 20px;
            font-size: 14px;
            color: #888888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Slackify!</h1>
        </div>
        <div class="content">
            <h1>You’re Invited to Join Our Workspace</h1>
            <p>Hello,</p>
            <p>You have been invited to join the <strong>Slackify Workspace</strong>! Collaborate with your team, stay organized, and get things done, all in one place.</p>
            <p>Click the button below to accept your invitation and join the workspace:</p>
            <a href="${invition_link}" class="button">Join Slackify Workspace</a>
            <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
            <p>Best Regards,<br>The Slackify Team</p>
        </div>
        <div class="footer">
            <p>Slackify, Inc. | Bringing teams together</p>
            <p>&copy; 2024 Slackify, Inc. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
