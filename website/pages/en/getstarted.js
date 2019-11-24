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

        const Step1 = () => (
            <div className="step1">
                <Block padding='bottom'>
                    {[{
                        content:
                            '<span class="titlecenter">Get started in 3 steps</span>' +
                            '<center><H2>Step 1 : Get QuestDB</H2></center>'
                    }]}
                </Block>
            </div>
        );

        const Step2 = () => (
            <div className="step2">
                <Block padding='bottom'>
                    {[{
                        content:
                            '<center><H2>Step 2 : Get familiar</H2></center>'
                    }]}
                </Block>
            </div>
        );

        const Step3 = () => (
            <div className="step3">
                <Block padding='bottom'>
                    {[{
                        content:
                            '<center><H2>Step 3 : Get creative</H2></center>'
                    }]}
                </Block>
            </div>
        );

        const StartOptions = () => (
            <div className="startOptions">
                <Block layout='threeColumn'>
                    {[
                        {
                            content: '<center>' +
                                '<H2> Tutorial </H2>' +
                                'Jump right in' +
                                '<p>' +
                                '<ul class="buttons">' +
                                '<li><a href="/docs/tut_first_db" target="_blank">Tutorial - your first DB </a></li>' +
                                '</ul></center>'
                        },
                        {
                            content: '<center>' +
                                '<H2> Storage Model </H2>' +
                                'Novel model for storing data and ensuring consistency.' +
                                '<p>' +
                                '<ul class="buttons">' +
                                '<li><a href="/docs/documentation" target="_blank">Check our our model </a></li>' +
                                '</ul></center>'
                        },
                        {
                            content: '<center>' +
                                '<H2> NewSQL </H2>' +
                                'QuestDB uses the SQL you know, enhanced.' +
                                '<p>' +
                                '<ul class="buttons">' +
                                '<li><a href="/docs/documentation" target="_blank">SQL Guide </a></li>' +
                                '</ul></center>'
                        },
                    ]
                    }
                </Block>
            </div>
        );



        const Run = () => (
            <div className="run">
                <Block layout="fourColumn">
                    {[
                        {
                            content:
                                '<center>' +
                                '<H2>Run from Docker</H2>' +
                                '<ul class="buttons">' +
                                '<li><a href="https://hub.docker.com/r/questdb/questdb" target="_blank">Docker Hub</a></li>' +
                                '</ul>' +
                                '</center>' +
                                '<div class="blockjustified">'+
                                '<p>' +
                                '1- Pull our image from DockerHub. We recommend to pull the `latest` image as follows: <p>' +
                                '`docker pull questdb/questdb`' +
                                '<p>' +
                                '2- Create a sandbox container:' +
                                '<p>' +
                                '`$ docker run --rm -it -p 9000:9000 -p 8892:8892 questdb/questdb`' +
                                '</div>'
                        },
                        {
                            content:
                                '<center>' +
                                '<H2>Run from Binaries</H2>' +
                                '<ul class="buttons">' +
                                '<li><a href="/docs/documentation" target="_blank">Download Binaries </a></li>' +
                                '</ul></center>' +
                                '<div class="blockjustified">1 - Make sure you have java installed. You can download the JRE [here]("xxx")' +
                                'Remember to set `JAVA_HOME` environment variable.' +
                                '<p>' +
                                '2- Launch Questdb from the binary :' +
                                '<p>' +
                                '`questdb start`' +
                                '</div>'
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
                    <Step1/>
                    <Run/>
                    <Step2/>
                    <StartOptions/>
                    <Step3/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
