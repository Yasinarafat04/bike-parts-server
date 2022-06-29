const nodemailer = require('nodemailer')

const sendEmail = ({paymentInfo, order}) => {

    async function main() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mdtomiz.official@gmail.com',
                pass: process.env.NODEMAILER_PASS,
            },
        });
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'mdtomiz.official@gmail.com',
            to: order.email,
            subject: "Bike Accessories Payment Successful",
            text: "Some text ",
            html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <h4 style="color: rgb(0, 1, 65);">Hello ${order.email}</h4>
                    <p>Thank your Purses Successfully Done</p>
                    <p>TransactionId : <span >${paymentInfo.transactionId}</span></p>
                    <p>Orderd Product Name : <span >${order.name}</span></p>
                    <img src='${order.image}' alt="" />
                </div>
                `
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    
    main().catch(console.error);
}


module.exports = sendEmail 