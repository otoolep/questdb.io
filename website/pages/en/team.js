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
                <img src={props.img_src} alt="Project Logo" />
            </div>
        );

        const ProjectTitle = () => (
            <h2 className="projectTitle">
                Team
            </h2>
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
                <Logo img_src={`${baseUrl}img/team.svg`} />
                <div className="inner">
                    <ProjectTitle siteConfig={siteConfig} />
                    <PromoSection>
                    </PromoSection>
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
                padding={[]}
                id={props.id}
                background={props.background}>
                <GridBlock
                    align="center"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const FeatureCallout = () => (
            <div
                className="productShowcaseSection"
                style={{textAlign: 'center'}}>
                <h2>What is QuestDB?</h2>
                <p>
                    QuestDB is a high-performance low-latency database optimised for time-series.
                    We cut latency from milliseconds to nanoseconds while minimising hardware footprint.
                </p>

                <p>We achieve this with cutting-edge proprietary software that pushes today's to the maximum
                    and defines the performance standard of tomorrow.</p>
            </div>
        );
        const Features = () => (
            <Block layout="threeColumn">
                {[
                    {
                        content: `Has been a **software engineer** for 24 years, and spent the last 12 years developing leading high performance electronic trading systems at leading companies such as BP, UBS, RBC, HSBC. At Blockchain, he built the first ultra low latency exchange in the industry.`,
                        image: `${baseUrl}img/vlad.jpg`,
                        imageAlign: 'top',
                        title: 'Vlad Ilyushchenko',
                    },
                    {
                        content: 'Has been a **trader** since 2011. At Commerzbank, he managed leading desks such as equity structured products, and Fixed-Income ETF Market Making. While at Blockchain, he built a 24/7 retail trading engine and trading algorithms that handle thousands of trades and serve liquidity to millions of users.',
                        image: `${baseUrl}img/tanc.jpg`,
                        imageAlign: 'top',
                        title: 'Tancrede Collard',
                    },
                    {
                        content: 'Has worked in **advisory and tech** since 2013, first at Nasdaq and then in M&A at Rothschild & Co, where he advised on multi $bn tech deals. At Blockchain, he led corporate strategy alongside the CFO. He founded W2 Ventures, a seed stage investment club, and published several opinion pieces on the WSJ and others.\n',
                        image: `${baseUrl}img/nic.jpg`,
                        imageAlign: 'top',
                        title: 'Nicolas Hourcard',
                    },
                ]}
            </Block>
        );

        const Showcase = () => {
            if ((siteConfig.users || []).length === 0) {
                return null;
            }

            const showcase = siteConfig.users
                .filter(user => user.pinned)
                .map(user => (
                    <a href={user.infoLink} key={user.infoLink}>
                        <img src={user.image} alt={user.caption} title={user.caption} />
                    </a>
                ));

            const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;


            return (
                <div className="productShowcaseSection">
                    <h2>Who is Using This?</h2>
                    <p>This project is used by all these people</p>
                    <div className="logos">{showcase}</div>
                    <div className="more-users">
                        <a className="button" href={pageUrl('users.html')}>
                            More {siteConfig.title} Users
                        </a>
                    </div>
                </div>
            );
        };

        /*@Tanc > Structure of page here*/
        /**
         removed <description />
         */

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language} />
                <div className="mainContainer">
                    <Features />
                </div>
            </div>
        );
    }
}

module.exports = Index;
