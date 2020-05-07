/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react")
const CompLibrary = require("../../core/CompLibrary.js")

// const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const ProjectTitle = () => <span />

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props
    const { baseUrl } = siteConfig

    const Block = (props) => (
      <Container id={props.id} background={props.background}>
        <GridBlock
          padding={["top", "bottom"]}
          align="left"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const CenterBlock = (props) => (
      <Container id={props.id} background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const Title = () => (
      <div className="toptitle">
        <Block>
          {[
            {
              image: `${baseUrl}img/test.svg`,
            },
            {
              content:
                '<span class="title">The fastest time-series database</span>' +
                '<p class="left subTopTitle">QuestDB is an open source database designed to process time-series data, faster.</p>' +
                "<br>" +
                '<ul class="buttons">' +
                '<li class="margin-button"><a href="/getstarted">Get QuestDB</a></li>' +
                '<li class="github-main"><a class="cta" target="_blank" href="https://github.com/questdb/questdb/"><img src="/img/GitHub-Mark-32px.png">github</a></li>' +
                "</ul>",
            },
          ]}
        </Block>
      </div>
    )

    const WhatWeDo = () => (
      <div className="whatwedo">
        <div className="title">Features</div>

        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/ossicon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Apache 2.0</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/speedicon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">SIMD accelerated</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/table.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Relational Model</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/packageicon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Cross-platform package</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/sqlicon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Query Optimiser</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/usersicon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Fast for concurrent users</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/joinsicon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Relational joins</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            src={`${baseUrl}img/charticon.svg`}
            height="50px"
          />
          <div class="whatwedo__subtitle">Time-series joins</div>
        </div>
        <div class="whatwedo__card">
          <img
            class="whatwedo__image"
            height="50px"
            src={`${baseUrl}img/unlimtransacticon.svg`}
          />
          <div class="whatwedo__subtitle">Unlimited transaction size</div>
        </div>
      </div>
    )

    const Demo = () => (
      <div className="demo">
        <span className="demo__title">
          <span className="emoji">📢</span> Demo with 2bn rows dataset coming
          soon...
        </span>
        <span className="demo__subtitle">
          In the meantime, get started with QuestDB from your laptop and
          experience what ultimate performance feels like
        </span>
      </div>
    )

    const Bench = () => (
      <div className="bench">
        <span className="title">Lightning fast</span>

        <div className="bench__inner">
          <div className="benchmark">
            <span>Sum 1 billion doubles with nulls:</span>
            <div className="questdb-in bar">
              <span className="benchmark__name">QuestDB</span>
              <span className="benchmark__timing">66ms</span>
            </div>
            <div className="clickhouse-in bar">
              <span className="benchmark__name">Clickhouse</span>
              <span className="benchmark__timing">116ms</span>
            </div>
            <div className="postgresql-in bar">
              <span className="benchmark__name">PostgreSQL</span>
              <span className="benchmark__separator" />
              <span className="benchmark__separator" />
              <span className="benchmark__timing">>1min</span>
            </div>
            <span className="benchmark__machine">
              We ran the query on a AWS c5.metal instance using only 16 threads out of 48(96) CPU cores available
            </span>
          </div>
        </div>
      </div>
    )

    const SQL = () => (
      <div className="sql">
        <Block layout="twoColumn">
          {[
            {
              content:
                "" +
                '<span class="title">Ease of SQL</span>' +
                "Just write SQL. Let QuestDB look after the performance while you focus on the data." +
                "<br><br>" +
                "<b>Less indexing and profiling. More ingesting and querying!</b>",
            },
          ]}
        </Block>
      </div>
    )

    const Integrations = () => (
      <div className="interfaces">
        <span className="title">Integrations</span>
        <p>
          Any tool and language via Postgres wire protocol. High-performance
          HTTP API, Influx line protocol and Telegraf.
        </p>
        <Block layout="threeColumn">
          {[
            {
              image: `${baseUrl}img/interfaces.jpg`,
            },
          ]}
        </Block>
      </div>
    )

    const ConsoleGIF = () => (
      <div className="consoleGIF">
        <img src={"/img/sql.gif"} alt="sql example" className={"shadow"} />
      </div>
    )

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer index">
          <Title />
          <Demo />
          <Bench />
          <SQL />
          <ConsoleGIF />
          <WhatWeDo />
          <Integrations />
        </div>
      </div>
    )
  }
}

module.exports = Index
