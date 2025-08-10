import carImg from '../../assets/images/team/general/carimg.jpg'
import styles from './Hero.module.css'
import perceptionImg from '../../assets/images/diagrams/perceptionImg2.jpg'
import logisticsImg from '../../assets/images/diagrams/logisticsImg.jpg'
import pathImg from '../../assets/images/diagrams/pathPlanning.jpg'
import controlImg from  '../../assets/images/diagrams/controlImg.jpg'
import businessImg from '../../assets/images/diagrams/businessImg2.jpg'
import working from '../../assets/images/team/gallery/working.jpg'

function Hero () {
        return (
        <>
            <main className={styles.imgContainer}>
                <img 
                className={styles.heroImg} 
                src={carImg} 
                alt="An image of an autonomous race car" 
                />
                <section className={styles.titleText}>
                    <p>Cardiff Autonomous Racing</p>
                </section>
            </main>
            <section className={styles.infoSection}>
                <h2>Who are we?</h2>
                <p>Cardiff Autonomous Racing is a self driving racing Team
                    run and operated by Cardiff University Students, previously
                    sponsored by the likes of IBM and Delaware. Our aim
                    is to produce a competitive autonomous racing car system that will
                    compete in Formula Student's AI events with their provided cars and we 
                    are currently looking for enthusiastic team members for the 2026 season.
                </p>
                
                <h2 className = {styles.qAndA}>What roles are available?</h2>
                <h2>Engineering Roles</h2>
                
                <div className={styles.rolesWrapper}>
                <section className={styles.perceptionSection}>
                    <h3>Perception</h3>
                    <div className={styles.roleImgContainer}>
                        <img 
                        src={perceptionImg} 
                        alt="A visualisation of YOLO cone detection for an autonomous race system" />
                    </div>
                    <p>Work on computer vision and object detection systems that allow our car to "see" and understand its environment. This includes cone detection, track boundary recognition, and real-time image processing.</p>
                </section>
                
                <section className={styles.pathSection}>
                    <h3>Path Planning</h3>
                    <div className={styles.roleImgContainer}>
                        <img 
                        src={pathImg} 
                        alt="Path planning visualization" />
                    </div>
                    <p>Develop algorithms that determine the optimal racing line and trajectory for the autonomous vehicle to follow around the track.</p>
                </section>
                
                <section className={styles.controlSection}>
                    <h3>Control Systems</h3>
                    <div className={styles.roleImgContainer}>
                    <img 
                        src={controlImg} 
                        alt="Bicycle model visualisation" />
                    </div>
                    <p>Implement control systems that translate path planning decisions into actual vehicle movements, managing steering, acceleration, and braking.</p>
                </section>
                </div>

                <h2>Non Engineering Roles</h2>
                <div className = {styles.nonEngRolesWrapper}>
                <section className={styles.businessSection}>
                    <h3>Business</h3>
                    <div className={styles.roleImgContainer}>
                        <img 
                            src={businessImg} 
                            alt="Bicycle model visualisation" />
                    </div>
                    <p>Handle sponsorship acquisition, and financial management as well as
                        helping prepare us for our business presentation at Formula Student.</p>
                </section>
                
                <section className={styles.logisticsSection}>
                    <h3>Logistics</h3>
                    <div className={styles.roleImgContainer}>
                        <img 
                            src={logisticsImg} 
                            alt="An image of people planning out tasks in a notepad" />
                    </div>
                    <p>Coordinate team activities, manage equipment, organise travel to competitions, and ensure smooth day to day operations.</p>
                </section>
                </div>
                <div>
                    <section className = {styles.experience}>
                        <h2>What experience do I need?</h2>
                        <p>You don't need any previous experience in order to join the team,
                            we are happy to teach you anything you need to know and application
                            is open to all Cardiff University students. We just ask
                            that you remain engaged in our work and can regularly commit time
                            to the team.
                        </p>
                    </section>
                    <section className = {styles.applySection}>
                        <h2>How do I get involved?</h2>
                        <p>Click the button below to fill out the response and we'll consider
                            your application when our recruitment season opens
                        </p>
                        <button>Apply</button>
                    </section>
                </div>
            </section>
            <section className={styles.newApply}>
                <div className={styles.endImgWrapper}>
                    <img src={working} alt="" />
                    <div>
                        <button>Apply</button>
                        <p>We are currently recruiting for the 25/26 season.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;