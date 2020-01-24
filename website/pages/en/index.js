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
                <Block>
                    {[
                        {
                            image: `${baseUrl}img/datavis.svg`,
                        },{
                            content:
                               '<span class="title">Take on time-series in an instant</span>' +
                                '<p class="left subTopTitle">QuestDB is an open-source time-series database to store, stream, query data and analytics at the speed of light, with the the convenience of SQL.</p>' +
                                '<br>' +
                                '<ul class="buttons">' +
                                '<li class="cta"><a href="/getstarted">Get started</a></li>' +
                                '</ul>'
                        }
                    ]
                    }
                </Block>
            </div>
        );

        const WhatWeDo = () => (
            <div className="whatwedo">

                <Block layout="twoColumn">
                    {[
                        {
                            content:
                                '<div align="center">' +
                                '<span class="title"><center>Features</center></span>' +
                                '</div>'
                        },
                    ]}
                </Block>

<div className="featuresList">
                <Block layout="threeColumn">
                    {[
                        {
                            image: `${baseUrl}img/ossicon.svg`,
                            content:
                                '<div class="subtitle">Open Source</div>'
                        },
                        {
                            image: `${baseUrl}img/speedicon.svg`,
                            content:
                                '<div class="subtitle">Unrivaled Speed</div>'
                        },
                        {
                            image: `${baseUrl}img/table.svg`,
                            content:
                                '<div class="subtitle">Relational Model</div>'
                        },
                        {
                            image: `${baseUrl}img/packageicon.svg`,
                            content:
                                '<div class="subtitle">Cross-platform package</div>'
                        },
                        {
                            image: `${baseUrl}img/sqlicon.svg`,
                            content:
                                '<div class="subtitle">Query Language</div>'
                        },
                        {
                            image: `${baseUrl}img/usersicon.svg`,
                            content:
                                '<div class="subtitle">Fast for concurrent users</div>'
                        },
                        {
                            image: `${baseUrl}img/joinsicon.svg`,
                            content:
                                '<div class="subtitle">Relational joins</div>'
                        },
                        {
                            image: `${baseUrl}img/charticon.svg`,
                            content:
                                '<div class="subtitle">Time-series joins</div>'
                        },
                        {
                            image: `${baseUrl}img/unlimtransacticon.svg`,
                            content:
                                '<div class="subtitle">Unlimited transaction size</div>'
                        },

                    ]}
                </Block>
            </div>
            </div>
        );


        const Demo = () => (
            <div className="demo">
                <span className="title"><center>Try QuestDB, right here, right now!</center></span>
                <center>Ever wanted to play with the billion taxi rides? Here is your chance!</center>
                <center>
                <ul className="buttons">
                    <li><a id="consolebutton"> Show Console </a></li>
                </ul>
            </center>
                <block class="consolecontainer" id="consolecontainer">
                    <iframe className="console"
                            src="http://ec2-3-9-184-96.eu-west-2.compute.amazonaws.com:9000/index.html"></iframe>
                    <center>
                        <ul className="gh-buttons">
                            <a className="github-button" href="https://github.com/questdb/questdb"
                               data-color-scheme="no-preference: light; light: light; dark: dark;"
                               data-icon="octicon-star" data-size="large"
                               aria-label="Star questdb/questdb on GitHub">Star</a>
                            <a className="github-button" href="https://github.com/questdb/questdb/releases/download/4.0.4/questdb-4.0.4-bin.tar.gz"
                               data-color-scheme="no-preference: light; light: light; dark: dark;"
                               data-icon="octicon-cloud-download" data-size="large"
                               aria-label="Download questdb/questdb on GitHub">Download</a>
                            <a className="github-button" href="https://github.com/questdb/questdb/issues/new/choose"
                               data-color-scheme="no-preference: light; light: light; dark: dark;"
                               data-icon="octicon-issue-opened" data-size="large"
                               aria-label="Issue questdb/questdb on GitHub">Issue</a>
                        </ul>
                    </center>
                </block>
            </div>
        );

            const Script = () => (
                <script>
                    function myFirst() {
                    alert("My First JavaScript")
                }
                </script>
            );


        const SQL = () => (
            <div className="sql">
                <Block layout="twoColumn">
                    {[
                        {
                            content:
                                '' +
                                '<span class="title">Express yourself</span>' +
                                'Just write SQL. Let QuestDB focus on the performance while you focus on the data.' +
                                '<br><br>' +
                                '<b>Less indexing and profiling. More ingesting and querying!</b>'
                        },
                    ]}
                </Block>
            </div>
        );

        const Integrations = () => (
            <div className='interfaces'>
                <span className="title">Integrations</span>
                <p>Any tool and language via Postgres wire protocol. High-performance HTTP API, Influx line protocol and Telegraf.</p>
                <Block layout="threeColumn">
                    {[
                        {
                            image: `${baseUrl}img/interfaces.jpg`,
                        }]}
                        </Block>

            </div>
        );

        const ConsoleGIF = () => (
            <div className='consoleGIF'>
            <img src='/img/sql.gif'/>
            </div>
        );

        const Perf = () => (
            <div className="perf">
                <span className="title">Built for performance</span>
                <div className="subtitle">Fast and reliable by design</div>

                <div className="perflist">
                    <Block layout="threeColumn">
                        {[
                            {
                                image: `${baseUrl}img/stackicon.svg`,
                                content:
                                    '<div class="subtitle">No software dependency</div>'
                            },
                            {
                                image: `${baseUrl}img/filter.svg`,
                                content:
                                    '<div class="subtitle">No GC performance bottleneck</div>'
                            },
                            {
                                image: `${baseUrl}img/algoicon.svg`,
                                content:
                                    '<div class="subtitle">Efficiency in every algorithm</div>'
                            },
                        ]}
                    </Block>
                </div>
                <div className="subtitle perfbottom">Software can only be as fast as its slowest component. Complete control enables to remove any blocker.</div>
            </div>
        );


        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Title/>
                    <SQL/>
                    <ConsoleGIF/>
                    <WhatWeDo/>
                    <Perf/>
                    <Demo/>
                    <Integrations/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
