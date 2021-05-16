const emailer = require("./config")

emailer.sendMail({
    from: `"Ukeo" <no-reply@ukeo.link>`,
    to: 'contact.nishchayb@gmail.com',
    subject: 'Thank you registering with Mailkeo',
    html: 'Your account is successfully created. <br><br> You can now configure your STMP settings and get started. <br><br><br><br>Keep Connecting, <br>Ukeo'
}).then(res=>console.log(res))