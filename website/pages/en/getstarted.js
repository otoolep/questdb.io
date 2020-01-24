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
            <div className="startTitle">
                <Block>
                    {[
                        /*                    {
                                                image: `${baseUrl}img/speed.svg`,
                                                imageAlign: 'left',
                                            },*/
                        {
                            content:
                                '<span class="title">Get Started</span>'
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
                                    ' <img src="img/package.svg" id="packageIcon"/>' +
                                    '<div class="subtitle">Install QuestDB</div>'
                            },
                            {
                                content:
                                    ' <img src="img/tuto.svg" id="tutoIcon"/>' +
                                    '<div class="subtitle">Run Tutorials</div>'
                            },
                            {
                                content:
                                    ' <img src="img/community.svg" id="questionIcon"/>' +
                                    '<div class="subtitle">Ask a question</div>'
                            },
                        ]}
                    </Block>
                </div>
            </div>
        );

        const GetStartedSubInstall = () => (
            <div className="sublist" id="getStartedInstall">
                <Block layout="threeColumn">
                    {[
                        {
                            image: `${baseUrl}img/docker.svg`,
                            content:
                                '<div class="subtitle">As a Docker image</div>'
                        },
                        {
                            image: `${baseUrl}img/box.svg`,
                            content:
                                '<div class="subtitle">Manually with binaries</div>'
                        },
                        {
                            image: `${baseUrl}img/dependency.svg`,
                            content:
                                '<div class="subtitle">As a Java dependency</div>'
                        },
                    ]}
                </Block>
            </div>
        );

        const GetStartedSubQuestion = () => (
            <div className="sublist" id="getStartedQuestion">
                <Block layout="threeColumn">
                    {[
                        {
                            image: `${baseUrl}img/slack.svg`,
                            content:
                                '<div class="subtitle">Join Slack</div>'
                        },
                        {
                            image: `${baseUrl}img/github.svg`,
                            content:
                                '<div class="subtitle">Raise an issue</div>'
                        },
                    ]}
                </Block>
            </div>
        );

        const GetStartedSubTuto = () => (
            <div className="sublist" id="getStartedTuto">
                <Block layout="threeColumn">
                    {[
                        {
                            image: `${baseUrl}img/slack.svg`,
                            content:
                                '<div class="subtitle">Join Slack</div>'
                        },
                        {
                            image: `${baseUrl}img/github.svg`,
                            content:
                                '<div class="subtitle">Raise an issue</div>'
                        },
                    ]}
                </Block>
            </div>
        );


        /*
                const GetStartedSubTutorial = () => (
                    <div></div>
                );

                const GetStartedSubInstall = () => (
                    <div></div>
                );
        */


        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Title/>
                    <GetStarted/>
                    <GetStartedSubInstall/>
                    <GetStartedSubQuestion/>
                    <GetStartedSubTuto/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
