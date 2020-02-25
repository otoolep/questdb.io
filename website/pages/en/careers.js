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

        const Logo = props => (
            <div className="projectLogo">
                <img src={props.img_src} alt="Project Logo"/>
            </div>
        );

        const ProjectTitle = () => (
            <span/>
        );

        const PromoSection = props => (
            <div className="section promoSection">
                <div className="promoRow">
                    <div className="pluginRowBlock">{props.children}</div>
                </div>
            </div>
        );

        const Button = props => (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={props.href} target={props.target}>
                    {props.children}
                </a>
            </div>
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
        const {baseUrl} = siteConfig;

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
                <span class="title colored bold">Careers</span>
                <div>
                    <p>
                        Want to join an ambitious team set to break all speed records in data processing? Good news...
                        <b>We're hiring!</b>
                        <br/>
                        <img src='/img/team.png'/>
                        <br/><br/>
                        We are based in <b>London</b> and <b>San Francisco</b>, and backed by leading venture capital
                        firms.
                        <br/>
                        We are actively recruiting for the following positions:
                        <ul className="job-list">
                            <li><a href="#dev-rel-job">Head of developer relations (London, San Francisco)</a></li>
                            <li><a href="#dev-backend-job">Back-end engineer (London)</a></li>
                            <li><a href="#dev-frontend-job">Front-end engineer (London)</a></li>
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
                    <a href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>"
                       className="color">
                        <b> Talk to us on Slack!</b>
                    </a>
                    <br/><br/>
                    <span className="jobtitle colored bold">Our interview process</span>
                    <p>
                        The most important thing for us is to have a great team. And the only way to get a great team is
                        to have a great fit. It is often hard for candidates to know what's going on inside a start-up
                        before actually joining it. So we designed our interview process in order to give you maximum
                        transparency into who we are, what we do, and how we work.

                        <ul className="apply-steps">
                            <li>Step 1 - Contact us!</li>
                            Send your CV by email to <b>hr@questdb.io </b> or
                            <a href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>"
                               className="color">
                                <b> chat us on Slack!</b>
                            </a>
                            We will review your application and aim to come back to you within 3 days.
                            <br/><br/>
                            <li>Step 2 - Get ready to show off!</li>
                            We will offer you the opportunity to show off. You can either show us something you did (for
                            engineers, this could be some code you are proud of. For designers, it could be your
                            portfolio). If you prefer, or in some cases, we would send you a challenge to complete
                            before your interview.
                            <br/><br/>
                            <li>Step 3 - Impress us!</li>
                            We will schedule an interview, either in our office or via videochat. The interview will be
                            the occasion for you to walk us through what you did at step 2. We will also take some time
                            at the beginning to introduce ourselves and make sure we dedicate time so you can ask as
                            many questions as you want.
                            <br/><br/>
                            <li>Step 4 - Try us!</li>
                            We are aware that interviews only give you a superficial view of the company. So if you want
                            to, we will welcome you to join us for a day and see how we work. You will be
                            assigned a buddy to guide you, but will be allowed to stay with any employee and shadow them
                            during their day. Think of it like school open days for grown ups!
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
                        <a href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>"
                           className="color">
                            <b>Get in touch on Slack!</b>
                        </a>
                        <br/>We'll figure something out.
                    </p>
                </div>
            </div>
        );

        const DevRel = () => (
            <div className="job" id="dev-rel-job">
                <span className="jobtitle colored bold">Head of developer relations</span>
                <p>
                    Helping developers solve their problems is at the center of what we do. Your role will consist of
                    engaging with the user base and orchestrating the growth of our open source communities.
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
                We see this role as foundational for the long-term success of the company. We do offer a competitive
                salary and very large equity stake to align your remuneration to the long-term success of the firm.

            </div>
        );

        const Dev = () => (
            <div className="job" id="dev-backend-job">
                <span className="jobtitle colored bold">Back-end developer</span>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget posuere nisl, eget posuere
                    ante. Etiam varius ante eget tortor finibus, non egestas turpis sollicitudin. Pellentesque quis
                    ultrices massa. Duis sed viverra velit. Phasellus et porttitor ante. Praesent sed lacinia ex, sit
                    amet interdum est.
                    <br/><br/>
                    Mauris at nibh vel magna condimentum tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Integer sit amet orci justo. Ut nulla tortor, ultrices id sapien sit amet, vestibulum laoreet
                    neque. Phasellus interdum aliquet odio, at laoreet est rhoncus rutrum. Nulla facilisi.
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
                We see this role as foundational for the long-term success of the company. We do offer a competitive
                salary and very large equity stake to align your remuneration to the long-term success of the firm.

            </div>
        );

        const DefFE = () => (
            <div className="job" id="dev-frontend-job">
                <span className="jobtitle colored bold">Front-end developer</span>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget posuere nisl, eget posuere
                    ante. Etiam varius ante eget tortor finibus, non egestas turpis sollicitudin. Pellentesque quis
                    ultrices massa. Duis sed viverra velit. Phasellus et porttitor ante. Praesent sed lacinia ex, sit
                    amet interdum est.
                    <br/><br/>
                    Mauris at nibh vel magna condimentum tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Integer sit amet orci justo. Ut nulla tortor, ultrices id sapien sit amet, vestibulum laoreet
                    neque. Phasellus interdum aliquet odio, at laoreet est rhoncus rutrum. Nulla facilisi.
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
                We see this role as foundational for the long-term success of the company. We do offer a competitive
                salary and very large equity stake to align your remuneration to the long-term success of the firm.

            </div>
        );


        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Intro/>
                    <Apply/>
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
