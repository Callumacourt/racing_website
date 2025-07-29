import ContactForm from "./ContactForm"
import styles from './Contact.module.css'

function Contact () {
    return (
        <>
            <main className = {styles.contactWrapper}>
                <h2>Have an enquiry for us?</h2>
                <p>Fill out the form below and we'll get back to you as soon as we can</p>
            <ContactForm/>
            </main>
        </>
    )
}

export default Contact;