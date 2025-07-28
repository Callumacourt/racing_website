import styles from './TeamHistory.module.css'
import collapseIcn from '../../assets/images/icons/chevron-down.svg'
import sprout from '../../assets/images/icons/sprout.svg'
import users from '../../assets/images/icons/users.svg'
import code from '../../assets/images/icons/code.svg'
import flag from '../../assets/images/icons/flag.svg'


function TeamHistory () {
    return (
        <>
            <main className = {styles.teamHistoryWrapper}>
                <h1>Our Story</h1>
                <section className = {styles.year}>
                <span className = {styles.yearHeader}>
                    2024-2025
                    <img src={collapseIcn} alt="Collapse Icon" />
                </span>
                <section className={styles.timeline}>
                
                <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                        <span>
                            <h3>Founding</h3>
                            <img src={sprout} alt="An icon of a sprouting plant" />
                        </span>
                        <p>
                        Cardiff Autonomous Racing was founded in October 2024 by Morgan Buke. 
                        There had been a previous iteration of an autonomous racing team at 
                        Cardiff in 2017 that disbanded, so we were determined to revive the team 
                        with the view to providing a structure that allows it to last even as 
                        team members graduate.

                        <br /> <br />

                        We want to emulate the success of the Cardiff Formula Racing team also based at
                        the university and believe that this team represents a significant oppurtunity 
                        for students to develop technical skills and drive innovation.  
                        </p>

                        <img src="" alt="" />
                    </div>
                </div>

                <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                        <span>
                        <h3>Recruitment</h3>
                        <img src={users} alt="An icon of two people" />
                        </span>
                        <p>
                            We underwent a recruitment drive in November 2024 that saw 50+ applicants apply to join
                            the team which was then whittled down to 20 successful applicants bringing our team size
                            to around 30. Selection was based purely on inferred enthusiasm.
                        </p>
                    </div>
                </div>

                <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                        <span>
                        <h3>Development</h3>
                        <img src={code} alt="An icon representing coding"/>
                        </span>
                        <p>
                            We then underwent the development process, which had many ups and downs. We would meet biweekly
                            in the ABACWS building initially to research the requirements of building an autonomous system
                            together. These meetings later became for progress reports from subteams and simulatenous 
                            development as we began to understand what we were doing.
                        </p>
                    </div>
                </div>

                <div className={styles.timelineItem}>
                    <div className={styles.timelineMarker}></div>
                    <div className={styles.timelineContent}>
                        <span>
                        <h3>Competition</h3>
                        <img src={flag} alt="An icon of a flag" />
                        </span>
                        <p>
                            In July of 2025 we finally found ourselves at Silverstone, competing in our first competition
                            as a team, and among some great universities. We worked tirelessly at competition trying to get
                            our system functional on the car. Though we came extremely close we ultimately ran out of time.
                            
                            <br /><br />

                            Despite this, we left Silverstone having learned much more than we could ever have expected, and
                            determined to return next year in a strong posiiton to compete now with a more experienced and 
                            knowledgeable team.
                        </p>
                    </div>
                </div>
                </section>
                </section>
            </main>
        </>
    )
}

export default TeamHistory