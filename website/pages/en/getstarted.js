/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

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
            <div className="startTitle">
                <Block>
                    {[
                        {
                            content:
                                '<span class="title" id="getStartedTitle">Get Started</span>'
                        }
                    ]
                    }
                </Block>
            </div>
        );


        const GetStarted = () => (
            <div className="start" id="start">
                <div className="subtitle">What would you like to do?</div>

                <div className="startlist">
                    <Block layout="threeColumn">
                        {[
                            {
                                content:
                                    '<img src="img/package.svg" id="packageIcon"/>' +
                                    '<div class="subtitle bold">Install</div>'
                            },
                            {
                                content:
                                    ' <img src="img/tuto.svg" id="tutoIcon"/>' +
                                    '<div class="subtitle bold">Discover</div>'
                            },
                            {
                                content:
                                    ' <img src="img/community.svg" id="questionIcon"/>' +
                                    '<div class="subtitle bold">Get help</div>'
                            },
                        ]}
                    </Block>
                </div>
            </div>
        );

        const GetStartedSubInstall = () => (
            <div className="start" id="getStartedInstall">
                <div className="subtitle">How would you like to run QuestDB?</div>
                <div className="startlist">
                    <Block layout="threeColumn">
                        {[
                            {
                                content:
                                    '<a  href="/docs/docker"><img src="img/docker.svg"/></a>' +
                                    '<div class="subtitle bold" >Docker image</div>',
                            },
                            {
                                content:
                                    '<a  href="/docs/manualinstall"><img src="img/box.svg"/></a>' +
                                    '<div class="subtitle bold">Manually with binaries</div>',
                            },
                            {
                                content:
                                    '<a  href="/docs/dependency"><img src="img/dependency.svg"/></a>' +
                                    '<div class="subtitle bold">Java dependency</div>',
                            },
                        ]}
                    </Block>
                </div>
            </div>
        );

        const GetStartedSubQuestion = () => (
            <div className="start" id="getStartedQuestion">
                <div className="subtitle">How would you like to get help?</div>
                <div className="startlist">
                    <Block layout="threeColumn">
                        {[
                            {
                                content:
                                    '<a  href="https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>"><img src="img/slack.svg"/></a>' +
                                    '<div class="subtitle bold">Ask on Slack</div>',
                            },
                            {
                                content:
                                    '<a  href="https://github.com/questdb/questdb/issues"><img src="img/github.svg"/></a>' +
                                    '<div class="subtitle bold">Raise an issue on Github</div>',
                            },
                            {
                                content:
                                    '<a  href="/docs/interfaces"><img src="img/tuto.svg"/></a>' +
                                    '<div class="subtitle bold">Search the docs</div>',
                            },
                        ]}
                    </Block>
                </div>
            </div>
        );

        const GetStartedSubTuto = () => (
            <div className="start" id="getStartedTuto">
                <div className="subtitle">What would you like to do?</div>
                <div className="startlist">
                    <Block layout="threeColumn">
                        {[
                            {
                                content:
                                    '<a  href="http://try.questdb.io:9000/index.html"><img src="img/tire.svg"/></a>' +
                                    '<div class="subtitle bold">Query NY Taxi data online</div>',
                            },
                            {
                                content:
                                    '<a  href="docs/tutorial/"><img src="img/rocket.svg"/></a>' +
                                    '<div class="subtitle bold">First Database tutorial</div>',
                            },
                            {
                                content:
                                    '<a  href="/docs/crud"><img src="img/crud.svg"/></a>' +
                                    '<div class="subtitle bold">Learn to perform CRUD operations</div>',
                            },

                        ]}
                    </Block>
                </div>
            </div>
        );

        const BackButton = () => (
            <div className="backButton" id="backButton">
                <center>
                    <ul class="buttonsDark">
                        <li class="cta"><a href="/getstarted">Back</a></li>
                    </ul>
                </center>
            </div>
        );


        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <div className="centeredContainer">
                        <Title/>
                        <GetStarted/>
                        <GetStartedSubInstall/>
                        <GetStartedSubQuestion/>
                        <GetStartedSubTuto/>
                        <BackButton/>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Index;
