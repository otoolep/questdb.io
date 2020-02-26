/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

// const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {

    render() {
        const {siteConfig} = this.props;

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
        const {baseUrl} = siteConfig;

        const Block = props => (
            <Container
                id={props.id}
                background={props.background}>
                <GridBlock
                    padding={['top', 'bottom']}
                    align="left"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const CenterBlock = props => (
            <Container id={props.id} background={props.background}>
                <GridBlock
                    align="center"
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
                        },
                        {
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
                            content: '<span class="title">Features</span>'
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
                                    '<div class="subtitle">SIMD accelerated</div>'
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
                                    '<div class="subtitle">Query Optimiser</div>'
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
                <CenterBlock class="titlecenter">
                    {[
                        {
                            content: '<span class="title">Live demo is coming right up!</span>',
                        },
                    ]}
                </CenterBlock>
                <Block layout="twoColumn">
                    {[
                        {
                            content: '<ul class="announcement">' +
                                '<li>' +
                                '<span class="headline">Large dataset - 1.6 billion rows NY Taxi data set</span>' +
                                '<span class="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod elit in arcu malesuada laoreet. Quisque sagittis tincidunt laoreet. Pellentesque auctor quam non quam venenatis imperdiet. Aliquam erat volutpat. Nulla.</span>' +
                                '</li>' +
                                '<li>' +
                                '<span class="headline">Attainable hardware</span>' +
                                '<span class="summary">AWS bare metal. Pellentesque euismod elit in arcu malesuada laoreet.</span>' +
                                '</li>' +
                                '<li>' +
                                '<span class="headline">Arbitrary SQL queries against real data set</span>' +
                                '<span class="summary">Quisque sagittis tincidunt laoreet. Pellentesque auctor quam non quam venenatis imperdiet.</span>' +
                                '</li>' +
                                '</ul>'
                        },
                        {
                            content: '<ul class="announcement">' +
                                '<li>' +
                                '<span class="headline">Parallel SQL execution</span>' +
                                '<span class="summary">Low overhead work split and work stealing</span>' +
                                '</li>' +
                                '<li>' +
                                '<span class="headline">Sub-second query execution</span>' +
                                '<span class="summary">We aim to execute all queries under a second</span>' +
                                '</li>' +
                                '<li>' +
                                '<span class="headline">Time series joins</span>' +
                                '<span class="summary">Time-series sampling, and joining on arbitrary timestamps</span>' +
                                '</li>' +
                                '<li>' +
                                '<span class="headline">Vectorized aggregation</span>' +
                                '<span class="summary">SIMD based SQL intrinsics</span>' +
                                '</li>' +
                                '</ul>'
                        },
                    ]}
                </Block>

                {/*<block class="consolecontainer" id="consolecontainer">*/}
                {/*    <iframe className="console"*/}
                {/*            src="http://localhost:9000/demo.html"></iframe>*/}
                {/*  /!*  <iframe className="console"*/}
                {/*            src="http://ec2-3-9-184-96.eu-west-2.compute.amazonaws.com:9000/index.html"></iframe>*!/*/}
                {/*    <center>*/}
                {/*        <ul className="gh-buttons">*/}
                {/*            <a className="github-button" href="https://github.com/questdb/questdb"*/}
                {/*               data-color-scheme="no-preference: light; light: light; dark: dark;"*/}
                {/*               data-icon="octicon-star" data-size="large"*/}
                {/*               aria-label="Star questdb/questdb on GitHub">Star</a>*/}
                {/*            <a className="github-button" href="https://github.com/questdb/questdb/releases/download/4.0.4/questdb-4.0.4-bin.tar.gz"*/}
                {/*               data-color-scheme="no-preference: light; light: light; dark: dark;"*/}
                {/*               data-icon="octicon-cloud-download" data-size="large"*/}
                {/*               aria-label="Download questdb/questdb on GitHub">Download</a>*/}
                {/*            <a className="github-button" href="https://github.com/questdb/questdb/issues/new/choose"*/}
                {/*               data-color-scheme="no-preference: light; light: light; dark: dark;"*/}
                {/*               data-icon="octicon-issue-opened" data-size="large"*/}
                {/*               aria-label="Issue questdb/questdb on GitHub">Issue</a>*/}
                {/*        </ul>*/}
                {/*    </center>*/}
                {/*</block>*/}
            </div>
        );

        const SignUpForm = () => (
            <div className="signup">
                <div className="signup-inner">
                    <span className="why">Be the first to experience our demo</span>
                    <form action="">
                        <ul>
                            <li><label>First name</label></li>
                            <li><input id="mce-FNAME" type="text" placeholder="John"/></li>
                            <li><label>Last name</label></li>
                            <li><input id="mce-LNAME" type="text" placeholder="Doe"/></li>
                            <li><label>Email</label></li>
                            <li><input id="mce-EMAIL" type="text" placeholder="john@acme.com"/></li>
                            <li className="send"><a href="">Sign up!</a></li>
                        </ul>
                    </form>
                </div>
            </div>
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
                <p>Any tool and language via Postgres wire protocol. High-performance HTTP API, Influx line protocol and
                    Telegraf.</p>
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
                                    '<div class="subtitle">No dependency</div>'
                            },
                            {
                                image: `${baseUrl}img/garbageicon.svg`,
                                content:
                                    '<div class="subtitle">No garbage generation</div>'
                            },
                            {
                                image: `${baseUrl}img/algoicon.svg`,
                                content:
                                    '<div class="subtitle">Efficiency in every algorithm</div>'
                            },
                        ]}
                    </Block>
                </div>
                <div className="subtitle perfbottom">Software can only be as fast as its slowest component. Complete
                    control enables to remove any blocker.
                </div>
            </div>
        );


        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Title/>
                    <Demo/>
                    <SignUpForm/>
                    <SQL/>
                    <ConsoleGIF/>
                    <WhatWeDo/>
                    {/*<Perf/>*/}
                    <Integrations/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
