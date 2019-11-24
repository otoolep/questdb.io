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

        const About = () => (
            <div className="about">
            <Block padding='bottom'>
                {[
                    {
                        image: `${baseUrl}img/speed.svg`,
                        imageAlign: 'left',
                    },
                    {
                        content:
                            '<img class="logo" src="https://raw.githubusercontent.com/questdb/questdb/master/core/src/main/resources/site/public/images/logo-readme.jpg"/>'+
                            '<span class="title">Fast relational time-series</span>'+
                            '<p>QuestDB is a fast NewSQL database for Hybrid Transactional, Analytical and Time Series processing workloads.</p>' +
                            '<p>' +
                            '<p>QuestDB ingests data via HTTP, PostgresSQL wire protocol, Influx line protocol or directly from Java. Reading data is done using SQL via HTTP, PostgreSQL wire protocol or via Java API. The whole database and console fits in a 3.5Mb package.</p> ' +
                            '<p>' +
                            '<p>The code is Open Source under <b>Apache 2.0</b> and we welcome contributions.</p>' +
                            '<p>' +
                            '<ul class="features">' +
                            '<li>Relational</li>' +
                            '<li>Time series</li>' +
                            '<li>SQL</li>' +
                            '<li>PostgresSQL wire</li>' +
                            '<li>Open Source</li>' +
                            '</ul>' +
                            '<ul class="buttons">' +
                            '<li class="cta"><a href="/docs/install" target="_blank">Get started</a></li>' +
                            '<li><a href="https://github.com/questdb/questdb" target="_blank">View on GitHub</a></li>' +
                            '</ul>'
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
                            content:
                                '<span class="title">Expressive SQL</span>'+
                                'With build-in time series support QuestDB SQL Optimiser assembles a sequence of monads for best-effort-zero-copy query execution.' +
                                'User function allowing data set manipulatoin aimed at provide ultimate SQL customisation'
                        },
                        {
                            image: `${baseUrl}img/sql.gif`,
                            imageAlign: 'right',
                            textAlign: 'left',
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
                            image: `${baseUrl}img/community.svg`,
                            imageAlign: 'right',
                            textAlign: 'right',
                        },
                        {
                            content:
                                '<span class="title">Welcome to our community</span>' +
                                'Get up to speed with our documentation and guides. If you already know SQL you are good to go. If you have issues, you can rais on Github or ohave a chat on Slack.'+
                                '<ul class="buttons">' +
                                '<li><a href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY" target="_blank">Join Slack</a></li>' +
                                '<li><a href="/docs/documentation" target="_blank">Documentation </a></li>' +
                                '</ul>'
                        }
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
                    <About/>
                    <SQL/>
                    <Community/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
