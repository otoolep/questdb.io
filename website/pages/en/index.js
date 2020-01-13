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
            <div className="toptitle">
                <Block padding='bottom'>
                    {[
                        /*                    {
                                                image: `${baseUrl}img/speed.svg`,
                                                imageAlign: 'left',
                                            },*/
                        {
                            content:
                                '<div align="center">' +
                                '<img class="logo" src="https://raw.githubusercontent.com/questdb/questdb/master/core/src/main/resources/site/public/images/logo-readme.jpg"/>' +
                                '<span class="title headTitle"><center>Fast relational time-series</center></span>' +
                                '</div>'
                        }
                    ]
                    }
                </Block>
            </div>
        );

        const Interfaces = () => (
            <div className="interfacesBlock">
                <Block padding='bottom' layout='threeColumn'>
                    {[
                        {
                            content:
                                '<p></p>' +
                                '<span class="title"> Work your way</span>' +
                                '<br>' +
                                'Use QuestDB with any language using the Postgres wire protocol or via HTTP REST.' +
                                ' QuestDB is available on Maven Central to run embedded in a Java program. We even support ' +
                                'Influx line protocol over telegraf (and made it faster).'
                        },
                        {
                            image: `${baseUrl}img/integrations.jpg`,
                        },
                    ]
                    }
                </Block>
            </div>
        );


        const Prob = () => (
            <div className="news">
                <Block layout="twoColumn">
                    {[
                        {
                            image: ``,
                            imageAlign: 'left',
                            content:
                                '<br>' +
                                'Over the last two years alone 90 percent of the data in the world was generated.' +
                                '<br><b><p align="right">It\'s time for databases to catch up!</b></p>',
                        },
                    ]}
                </Block>
            </div>
        );

        const Moore = () => (
            <div className="moore">
                <Block layout="twoColumn">
                    {[
                        {
                            content:
                                '<div align="center">' +
                                '<span class="title"><center>When less is \'Moore\'</center></span>' +
                                '<b>More performance, Less hardware. Not the other way around!</b>' +
                                '<br><br>' +
                                'Lean and efficient code got your back when Moore\'s law is letting you down.' +
                                '</div>'
                        },
                    ]}
                </Block>
            </div>
        );

        const Moore2 = () => (
            <div className="moore2">
                <Block layout="twoColumn">
                    {[
                        {
                            content:
                                '<div align="center">' +
                                '<b>Efficiency first!</b>' +
                                '<br><br>' +
                                'QuestDB does not rely on hardware to solve performance problems. ' +
                                '</div>'
                        },
                        {
                            content:
                                '<div align="center">' +
                                '<b>Starting from scratch</b>' +
                                '<br><br>' +
                                'QuestDB does not rely on hardware to solve performance problems. ' +
                                'We write lean, efficient, dependency-free code that allows you to get more with less. ' +
                                'We\'ve got your back, even when Moore\'s law is letting you down.' +
                                '</div>'
                        },
                    ]}
                </Block>
            </div>
        );


        const About = () => (
            <div className="about">
                <Block padding='bottom'>
                    {[
                        {
                            content:
                                '<span class="title">What is QuestDB?</span>' +
                                '<p><b>QuestDB is a fast NewSQL database for Hybrid Transactional, Analytical and Time Series processing workloads.</b> The database fits in a dependency-free 3.5mb package ' +
                                'and is Open Source under Apache 2.0.'
                        },
                        {
                            content:
                                '<div>' +
                                '<br>' +
                                '<center>' +
                                '<ul class="features">' +
                                '<li>Relational</li>' +
                                '<li>Time series</li>' +
                                '<li>SQL</li>' +
                                '<li>Open Source</li>' +
                                '</ul>' +
                                '<ul class="buttons">' +
                                '<li class="cta"><a href="/docs/getstarted">Get started</a></li>' +
                                '<li><a href="https://github.com/questdb/questdb" target="_blank">View on GitHub</a></li>' +
                                '</ul></center>' +
                                '</div>'
                        }
                    ]
                    }
                </Block>
            </div>
        );

        const SQL = () => (
            <div className="sql">
                <Block layout="twoColumn">
                    {[
                        {
                            image: `${baseUrl}img/sql.gif`,
                            imageAlign: 'bottom',
                            textAlign: 'left',
                            content: '',
                        },
                        {
                            content:
                                '' +
                                '<span class="title">Express yourself</span>' +
                                'Spend more time analysing data and less time adding indexes, ' +
                                'profiling queries, or looking for the bottleneck. QuestDB\'s query optimiser ensures fast query execution by accessing ' +
                                'as little data as necessary, as fast as possible. SQL is your means of expression and all its power in your hands.' +
                                '<br><br>' +
                                '<b>QuestDB takes care of the performance so you can focus on the data.</b>'
                        },
                    ]}
                </Block>
            </div>
        );

        const Community = () => (
            <div className="community">
                <Block layout="twoColumn">
                    {[
                        {
                            content:
                                '<span class="title">Welcome to the community</span>' +
                                'Get up to speed with our documentation and guides. If you already know SQL, it will be pretty easy!  find help and raise issues on Github or on Slack.' +
                                '<ul class="buttons">' +
                                '<li><a href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY" target="_blank">Join Slack</a></li>' +
                                '<li><a href="/docs/docstructure">Documentation </a></li>' +
                                '</ul>'
                        },
                        {
                            image: `${baseUrl}img/community.svg`,
                            imageAlign: 'right',
                            textAlign: 'right',
                        },
                    ]}
                </Block>
            </div>
        );

        const Showcase = () => {
            if ((siteConfig.users || []).length === 0) {
                return null;
            }

            const showcase = siteConfig.users
                .filter(user => user.pinned)
                .map(user => (
                    <a href={user.infoLink} key={user.infoLink}>
                        <img src={user.image} alt={user.caption} title={user.caption}/>
                    </a>
                ));

            const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;


            return (
                <div className="productShowcaseSection paddingBottom">
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


        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Title/>
                    <Prob/>
                    <About/>
                    <Moore/>
                    <Moore2/>
                    <SQL/>
                    <Interfaces/>
                    <Community/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
