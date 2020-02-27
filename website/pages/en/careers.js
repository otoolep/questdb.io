/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {

    render() {
        const {siteConfig, language = ''} = this.props;
        const {baseUrl, docsUrl} = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = props => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const ProjectTitle = () => (
            <span/>
        );

        return (
            <SplashContainer>
                <div className="inner">
                    <ProjectTitle siteConfig={siteConfig}/>
                </div>
            </SplashContainer>
        );
    }
}


class Index extends React.Component {

    render() {
        const {config: siteConfig, language = ''} = this.props;

        const Block = props => (
            <Container
                id={props.id}
                background={props.background}>
                <GridBlock
                    padding={['top', 'bottom']}
                    align="justified"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const Title = () => (
            <div className="toptitle center">
                <Block>
                    {[
                        {
                            content:
                                '<span class="title">Careers</span>'
                        }
                    ]
                    }
                </Block>
            </div>
        );

        const Intro = () => (
            <div className="careers">
                <span className="title colored bold">Careers</span>
                <div>
                    <img src='/img/team.svg'/>
                    <br/><br/>
                    <p>
                        Want to join an ambitious team set to break all speed records in data processing? Good news...
                        <b> We're hiring!</b> QuestDB is based in <b>London</b> and <b>San Francisco</b>, and backed by
                        leading venture
                        capital firms.

                        <ul className="buttons center">
                            <li><a
                                href="#job-list">
                                <b>View Openings</b>
                            </a></li>
                        </ul>

                    </p>
                </div>
            </div>
        );

        const Apply = () => (
            <div className="apply">
                <div className="apply-text">
                    <span className="jobtitle colored bold">How to apply</span>
                    Simply send your CV and job reference to <b>hr@questdb.io</b> or
                    <a target="_blank" href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>"
                       className="color">
                        <b> chat us on Slack! </b>
                    </a>
                    <br/><br/>
                    <span className="jobtitle colored bold">Our interview process</span>
                    <p>
                        The only way to get a great team is to make sure every member is a great fit. We designed our
                        interview process in order to give you maximum
                        transparency into who we are, what we do, and how we work, so you can know for certain whether
                        you want to join us in the adventure.

                        <ul className="apply-steps">
                            <li>Step 1 - Contact us!</li>
                            Send your CV by email to <b>hr@questdb.io </b> or
                            <a target="_blank" href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>"
                               className="color">
                                <b> chat us on Slack! </b>
                            </a>
                            We will review your application and aim to come back to you within 3 days.
                            <br/><br/>
                            <li>Step 2 - Get ready to show off!</li>
                            We will offer you the opportunity to show off. You can either show us something you did (for
                            engineers, this could be some code you are proud of. For designers, it could be your
                            portfolio). Alternatively, we would send you a challenge to complete
                            before your interview.
                            <br/><br/>
                            <li>Step 3 - Impress us!</li>
                            We will schedule an interview, either in our office or via video conference. The interview will be
                            the occasion for you to walk us through what you did at step 2. We will also take some time
                            at the beginning to introduce ourselves and make sure we dedicate time so you can ask as
                            many questions as you want.
                            <br/><br/>
                            <li>Step 4 - Try us!</li>
                            We are aware that interviews only give you a superficial view of the company. So if you want
                            to, we will welcome you to join us for a day and see how we work. You will be
                            assigned a buddy to guide you, but will be allowed to follow any employee
                            during their day. Think of it like school open days for grown ups! If you have a partner and
                            would like to get their opinion, you are free to bring them along and they can also
                            interview us!
                            <br/><br/>
                            <li>Step 5 - Join us!</li>
                            We will work out your job description and specifics. We will also conduct some mandatory
                            background checks. As soon as these are out of the way, all you need to do is choose your
                            new computer and screens!
                        </ul>
                    </p>
                </div>
            </div>
        );

        const JobFooter = () => (
            <div className="careers-footer">
                <div>
                    <p>
                        Want to work with us but can't find a job description that matches your profile? <br/>
                        <ul class="buttons">
                            <li><a
                                target="_blank"
                                href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>">
                                <b>Get in touch on Slack!</b>
                            </a></li>
                        </ul>
                        We'll figure something out.
                    </p>
                </div>
            </div>
        );

        const DevRel = () => (
            <div className="job" id="dev-rel-job">
                <span className="jobtitle colored bold">Head of developer relations</span>
                <p>
                    Helping developers achieve their goals is at the center of what we do. Your role will consist of
                    engaging with the user base and orchestrating the growth of our open source communities by reaching
                    out to developers and help them solve their problems.
                    <br/><br/>
                    This is an open-ended role with a substantial degree of autonomy. You will have full liberty to
                    develop outreach channels such as promoting content to spur adoption, planning events, marketing, PR
                    and social media initiatives, as well as any additional direction you will deem relevant.
                </p>

                <span className="jobsubtitle colored bold">Responsibilities</span>
                <ul>
                    <li>Understand and track developers needs: Create feedback loops with the developer community to
                        inform
                        product roadmap. Be the first point of contact for developers requests and questions.
                    </li>
                    <li>Manage and engage the community: Build engagement developers' social channels and grow our
                        Slack
                        community. Manage outreach to developers both online (Moderate day-to-day community activity in
                        the
                        discussion forums) and offline via conferences, events, workshops, etc.
                    </li>
                    <li>Create content: Work with the CTO and CPO to create technical articles and blog posts that bring
                        value to developers.
                    </li>
                    <li>Identify strategic partnership opportunities to grow our developer community.</li>
                </ul>

                <span className="jobsubtitle colored bold">Requirements</span>
                <ul>
                    <li>3+ years of experience in community development</li>
                    <li>Passionate about open source and the developer community</li>
                    <li>Database or Java knowledge preferred</li>
                    <li>Strong writing and communication skills</li>
                    <li>Marketing experience is a plus</li>
                    <li>Relationships in prominent Open Source communities is a plus</li>
                    <li>Familiarity with developer tools</li>
                    <li>Excellent spoken and written English</li>
                </ul>

                <span className="jobsubtitle colored bold">Remuneration</span>
                We see this role as foundational for the long-term success of the company. We offer a competitive
                salary and large equity stake to align your remuneration to the long-term success of the firm.

            </div>
        );

        const Dev = () => (
            <div className="job" id="dev-backend-job">
                <span className="jobtitle colored bold">Back-end engineer</span>
                <p>
                    QuestDB stands for speed and efficiency. As a key member of the dev team, you will put these
                    principles
                    in motion and contribute to the fastest database engine in the world.
                    <br/><br/>
                    This is not your standard dev job. QuestDB uses innovative coding techniques and strives for
                    performance. It will take some time to get up to speed (and we will help you along the way), but the
                    skills you will gain will be extremely rewarding.
                    <br/><br/>
                    Feel free to skim through our
                    <a className="bold color" target="_blank" href="https://github.com/questdb/questdb"> Github repo </a>
                    to get an idea of what is expected. If you're up to the challenge, get in touch!
                </p>

                <span className="jobsubtitle colored bold">Responsibilities</span>
                <ul>
                    <li>Participate and take the lead of development efforts across the whole technology stack (storage
                        engine, SQL engine, interfaces).
                    </li>
                    <li>Propose, design and implement new functions and features. Propose ways to improve performance on
                        existing
                        modules.
                    </li>
                    <li>Ensure new features meet the standards of code quality, performance, and reliability.
                    </li>
                    <li>Actively engage with and assist customers to boost experience and adoption.</li>
                </ul>

                <span className="jobsubtitle colored bold">Requirements</span>
                <ul>
                    <li>3+ years of software engineering experience</li>
                    <li>Passionate about performance and code efficiency</li>
                    <li>Experience with databases and the JVM</li>
                    <li>Innovative and inquisitive spirit</li>
                    <li>Low-latency expertise is a plus</li>
                    <li>Strong affection for thoroughly tested code</li>
                </ul>

                <span className="jobsubtitle colored bold">Remuneration</span>
                Our tech and our development team are at the center of what we do.
                salary and large equity stake to align your remuneration to the long-term success of the firm.

            </div>
        );

        const DefFE = () => (
            <div className="job" id="dev-frontend-job">
                <span className="jobtitle colored bold">Front-end engineer</span>
                <p>
                    QuestDB is not only fast. It feels good and,
                    allows users to achieve what they want with ease.
                    <br/><br/>
                    Most companies separate front-end and back-end developers through invisible and unnecessary
                    knowledge and information silos. We do the opposite.
                    <br/><br/>
                    While front-end focused, the role will he actively involved in every step of the design and
                    development of the database engine. By having decision power in the back-end development, you will
                    be instrumental in creating product that not only looks and feels great because it is a whole
                    integrated entity.
                </p>

                <span className="jobsubtitle colored bold">Responsibilities</span>
                <ul>
                    <li>Development: Design and implementation of all internal and user-facing UI. This includes tools
                        for database setup, querying and visualisation, realtime monitoring,
                        and cluster management via integrations with various cloud providers along with occasional
                        website work.
                    </li>
                    <li>UX: Full flexibility to imagine, design, and implement smooth and powerful user experience
                        through all tools and website. You will be fully responsible and independent to create the
                        best user experience out there.
                    </li>
                    <li>
                        Features design: advise on new and existing features so their development is consistent with the
                        user experience you design.
                    </li>
                    <li>Community development: engage with the community to both promote new features, absorb and
                        integrate feedback, and help users achieve their goals. Occasionally host live demos or web conferencing
                        to show your work.
                    </li>
                </ul>

                <span className="jobsubtitle colored bold">Requirements</span>
                <ul>
                    <li>3+ years of experience in front-end development</li>
                    <li>Innovative spirit with both the ability to generate ideas and to implement them</li>
                    <li>Passionate about open source and the developer community</li>
                    <li>Desire to get to know the back-end</li>
                    <li>Database knowledge preferred</li>
                    <li>Familiarity with developer tools</li>
                    <li>Excellent spoken and written English</li>
                </ul>

                <span className="jobsubtitle colored bold">Remuneration</span>
                Users will see and interact with QuestDB through your work, and the quality of it will forge their
                opinion.
                This high responsibility job comes with a competitive salary and large equity stake.

            </div>
        );

        const Openings = () => (
            <div className="job" id="job-list">
                <span className="jobtitle colored bold">Current openings</span>
                We are actively recruiting for the following positions:
                <br/><br/>
                <ul>
                    <li><a href="#dev-rel-job">Head of developer relations (London, San Francisco)</a></li>
                    <li><a href="#dev-backend-job">Back-end engineer (London)</a></li>
                    <li><a href="#dev-frontend-job">Front-end engineer (London)</a></li>
                </ul>
            </div>
        );

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Intro/>
                    <Apply/>
                    <Openings/>
                    <DevRel/>
                    <Dev/>
                    <DefFE/>
                    <JobFooter/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
