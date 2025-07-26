import styles from './Sponsorship.module.css'
import codingPhoto from '../../assets/codingPhotoR.jpg'
import teamPhoto from '../../assets/teamPhoto.jpg'
import truck from '../../assets/truck.svg'
import cpu from '../../assets/cpu.svg'
import hardDrive from '../../assets/hard-drive.svg'
import SponsorForm from './SponsorForm'

function Sponsorship () {
    return (
    <main className = {styles.sponsorWrapper}>
        <section className={styles.hero}>
        <h2 className >Partner With Us</h2>
            <div className={styles.imgContainer}>
                <img src={codingPhoto} alt="A photo of a man at a computer" />
            </div>
        </section>
    <section className = {styles.pitchSection}>
        <h3>Why sponsor us?</h3>
            <p>
                We are a highly ambitious team that is determined to succeed
                and innovate at Formula Students AI competition as well as 
                create the next generation of excellent engineers and businesspeople. 
            </p>
            <div className={styles.teamPhotoContainer}>
                <img src={teamPhoto} alt="" />
            </div>
        <h4>Where your support goes</h4>
        <p>
            Your support directly enables us to design, test, and deploy our autonomous system.
            Every contribution brings us closer to success at Silverstone by providing us
            with the tools we need to compete.
        </p>
        <ul className = {styles.sponsorList}>
            <li>
                <img src={hardDrive} alt='An icon of a hard drive'/>
                <h5>Hardware</h5>
                <p>
                    Currently we have no hardware which makes it very difficult to test and develop 
                    our system outside of simulation. With your help we could obtain things like a LIDAR
                    or camera which would allow us to physically test our perception system. 
                </p>
            </li>
            <li>
                <img src={truck} alt='An icon of a truck'/>
                <h5>Competition Travel</h5>
                <p>
                    Transport, campsite and logistical costs that help get the team to Silverstone.
                </p>
            </li>
            <li>
                <img src={cpu} alt="An icon of a CPU" />
                <h5>Compute</h5>
                <p>Developing safe and reliable autonomous systems requires significant computational power. 
                    Your support helps us access the hardware and cloud resources needed to train 
                    perception models, run real-time simulations, and test control algorithms under
                    complex conditions.</p>
            </li>
        </ul>
    </section>
    <section className={styles.tierSection}>
    <h4>Sponsorship Tiers</h4>
    <p className={styles.tierSubtext}><em>Each subsequent tier contains the previous tier(s) material</em></p>
    
    <hr  class = {styles.bronzeHr}/>
    <section className={styles.tierOne}>
        <h5>Tier One</h5>
        <p className={styles.tierPrice}>This package is for sponsorship worth up to £250</p>
        <ul>
            <li>Your company's logo on this year's team kit</li>
            <li>Dedicated posts on our social media platforms</li>
        </ul>
    </section>
    
    <hr  className = {styles.silverHr}/> 
    <section className={styles.tierTwo}>
        <h5>Tier Two</h5>
        <p className={styles.tierPrice}>Package for sponsorship worth up to £1000</p>
        <ul>
            <li>Promotion of your company to Cardiff Autonomous Racing members 
                and the Cardiff School of Computer Science and Informatics' as 
                opportunities for a year in industry placement, summer internships
                 or graduate roles. 
            </li>
            <li>
                An article written for your company at the end of the summer on the 
                successes of the team and how your sponsorship benefitted the team. 
            </li>
            <li>
                Include information about your company on our website, along with a link to your own web page. 
            </li>
        </ul>
    </section>
    <hr  className = {styles.goldHr}/>
    <section className={styles.tierThree}>
        <h5>Tier Three</h5>
        <p className={styles.tierPrice}>Package for sponsorship worth over £1000</p>
        <ul>
            <li>
                An opportunity for members of the team to visit your company for a tour, 
                photos, and other PR, or conversely your company can visit Cardiff University 
                for a tour of our facilities. 
            </li>
            <li>
                Participation in events and promotions your company holds throughout the year. 
            </li>
        </ul>
    </section>
</section>
<section className = {styles.formSection}>
<h3>Interested in sponsoring us?</h3>
<small>
    Thank you for your interest, please enter your details below and we'll 
    get back to you as soon as we can
</small>
<SponsorForm/>
</section>
    </main>
    ) 
}

export default Sponsorship;