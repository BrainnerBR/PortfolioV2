(function() {
    emailjs.init("BKxQJ1pyOTxQcx3Um");
})();

function sendMail() {
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var subject = document.querySelector('#subject').value;
    var message = document.querySelector('#message').value;

    // Validación de los campos del formulario
    if (!name || !email || !subject) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all required fields (Name, Email, Subject).',
        });
        return;
    }

    var params = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };
    var serviceID = "service_dvezuxb";
    var templateID = "template_f6o95jo";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            Swal.fire(
                'Email sent successfully!',
                'Your email has been sent.',
                'success'
            );
            // Limpiar los campos después de enviar el correo electrónico
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#subject').value = '';
            document.querySelector('#message').value = '';
        })
        .catch(error => {
            console.error('Error sending email:', error);
            Swal.fire(
                'Oops...',
                'Something went wrong! Please try again later.',
                'error'
            );
        });
}