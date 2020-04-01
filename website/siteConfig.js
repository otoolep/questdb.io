/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [];

function sql_qdb(hljs) {
    var COMMENT_MODE = hljs.COMMENT('--', '\n');
    return {
        case_insensitive: true,
        illegal: /[<>{}*]/,
        contains: [
            {
                beginKeywords:
                    'begin end start commit rollback savepoint lock alter create drop rename call ' +
                    'delete do handler insert load replace select truncate update set show pragma grant ' +
                    'merge describe use explain help declare prepare execute deallocate release ' +
                    'unlock purge reset change stop analyze cache flush optimize repair kill ' +
                    'install uninstall checksum restore check backup revoke comment values with copy ',
                end: /;/, endsWithParent: true,
                lexemes: /[\w\.]+/,
                keywords: {
                    keyword:
                        'as abort acc acce accep accept access accessed accessible account acos action activate add ' +
                        'addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias ' +
                        'all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply ' +
                        'archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan ' +
                        'atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid ' +
                        'authors auto autoallocate autodblink autoextend automatic availability backup badfile basicfile ' +
                        'before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float ' +
                        'binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound ' +
                        'bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel ' +
                        'capacity cascade cascaded case catalog category ceil ceiling chain change changed char_base ' +
                        'char_length character_length characters characterset charindex charset charsetform charsetid check ' +
                        'checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close ' +
                        'cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation ' +
                        'collect colu colum column column_value columns columns_updated comment commit compact compatibility ' +
                        'compiled complete composite_limit compound compress compute concat_ws concurrent confirm conn ' +
                        'connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection ' +
                        'consider consistent constant constraint constraints constructor container content contents context ' +
                        'contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost ' +
                        'count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation ' +
                        'critical cross cube cume_dist curdate current ' +
                        'cursor curtime customdatum cycle data database databases datafile datafiles datalength ' +
                        'date_cache date_format date_sub datefromparts datename datepart datetime2fromparts ' +
                        'db_role_change dbtimezone ddl deallocate ' +
                        'declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults ' +
                        'deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank ' +
                        'depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor ' +
                        'deterministic diagnostics difference dimension direct_load directory disable disable_all ' +
                        'disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div ' +
                        'do document domain dotnet downgrade drop dumpfile duplicate duration each edition editionable ' +
                        'editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt ' +
                        'end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors ' +
                        'escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding ' +
                        'execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external ' +
                        'external_1 external_2 externally extract failed failed_login_attempts failover failure far fast ' +
                        'feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final ' +
                        'finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign ' +
                        'form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ' +
                        'ftp full function general generated get get_format get_lock getdate getutcdate global global_name ' +
                        'globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups ' +
                        'gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex ' +
                        'hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified ' +
                        'identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment ' +
                        'index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile ' +
                        'initial initialized initially initrans inmemory inner innodb input insert install instance instantiable ' +
                        'instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat ' +
                        'is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists ' +
                        'keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase ' +
                        'lead leading least leaves left len less level levels library like like2 like4 likec limit ' +
                        'lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate ' +
                        'locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call ' +
                        'logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime ' +
                        'managed management manual map mapping mask master master_pos_wait match matched materialized ' +
                        'maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans ' +
                        'md5 measures median medium member memcompress memory merge microsecond mid migration minextents ' +
                        'minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month ' +
                        'months mount move movement multiset mutex name name_const names nan national native natural nav nchar ' +
                        'nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile ' +
                        'nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile ' +
                        'nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder ' +
                        'nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck ' +
                        'noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe ' +
                        'nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ' +
                        'ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old ' +
                        'on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date ' +
                        'oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary ' +
                        'out outer outfile outline output over overflow overriding package pad parallel parallel_enable ' +
                        'parameters parent parse partial partition partitions pascal passing password password_grace_time ' +
                        'password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex ' +
                        'pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc ' +
                        'performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin ' +
                        'policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction ' +
                        'prediction_cost prediction_details prediction_probability prediction_set prepare present preserve ' +
                        'prior priority private private_sga privileges procedural procedure procedure_analyze processlist ' +
                        'profiles project prompt protection public publishingservername purge quarter query quick quiesce quota ' +
                        'quotename radians raise rand range rank raw read reads readsize rebuild record records ' +
                        'recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh ' +
                        'regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy ' +
                        'reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename ' +
                        'repair repeat replace replicate replication required reset resetlogs resize resource respect restore ' +
                        'restricted result result_cache resumable resume retention return returning returns reuse reverse revoke ' +
                        'right rlike role roles rollback rolling rollup row row_count rowdependencies rowid rownum rows ' +
                        'rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll ' +
                        'sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select ' +
                        'self semi sequence sequential serializable server servererror session session_user sessions_per_user set ' +
                        'sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor ' +
                        'si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin ' +
                        'size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex ' +
                        'source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows ' +
                        'sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone ' +
                        'standby start starting startup statement static statistics stats_binomial_test stats_crosstab ' +
                        'stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep ' +
                        'stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp ' +
                        'stop storage store stored str straight_join strcmp strict string struct stuff style subdate ' +
                        'subpartition subpartitions substitutable substr substring subtime subtring_index subtype success ' +
                        'suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux ' +
                        'sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo ' +
                        'template temporary terminated tertiary_weights test than then thread through tier ties time time_format ' +
                        'time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr ' +
                        'timezone_minute timezone_region to  todatetimeoffset trace tracking ' +
                        'transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate ' +
                        'try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress ' +
                        'under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot ' +
                        'unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert ' +
                        'url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date ' +
                        'utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var ' +
                        'var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray ' +
                        'verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear ' +
                        'wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped ' +
                        'xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces ' +
                        'xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year_to_month years yearweek cache copy ' +
                        '',
                    literal:
                        'true false null unknown',
                    type_name:
                        'array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number ' +
                        'numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void' +
                        /*QUESTDB TYPE DEFINITION*/
                        'boolean byte short char int float symbol string long date timestamp double binary long256',
                    sql_function:
                        'abs avg cast concat count current_date current_time current_timestamp current_user date_add ' +
                        'dateadd datediff day day day_to_second dayname dayofmonth dayofweek dayofyear days hour in ' +
                        'isOrdered length long_sequence max min minute month pg_catalog pg_get_userbyid pg_namespace ' +
                        'pg_table_is_visible pg_type rnd_bin rnd_boolean rnd_byte rnd_date rnd_double rnd_float rnd_int ' +
                        'rnd_long rnd_long256 rnd_short rnd_str rnd_symbol rnd_symbol rnd_timestamp round round_down ' +
                        'round_half_even round_up second stdev str_to_date sum sysdate systimestamp timestamp_sequence ' +
                        'to_base64 to_char to_date to_date to_days to_seconds to_str to_timestamp year'
                },
                contains: [
                    {
                        className: 'string',
                        begin: '\'', end: '\'',
                        contains: [{begin: '\'\''}]
                    },
                    {
                        className: 'string',
                        begin: '"', end: '"',
                        contains: [{begin: '""'}]
                    },
                    {
                        className: 'string',
                        begin: '`', end: '`'
                    },
                    hljs.C_NUMBER_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    COMMENT_MODE,
                    hljs.HASH_COMMENT_MODE
                ]
            },
            hljs.C_BLOCK_COMMENT_MODE,
            COMMENT_MODE,
            hljs.HASH_COMMENT_MODE
        ]
    };
}

const siteConfig = {

    title: 'QuestDB', // Title for your website.
    tagline: 'Always on time',
    url: 'https://questdb.io', // Your website URL
    baseUrl: '/', // Base URL for your project */
    projectName: 'website',
    organizationName: 'questdb',
    // serach bar settings
    algolia: {
        apiKey: 'b2a69b4869a2a85284a82fb57519dcda',
        indexName: 'questdb',
        placeholder: 'Search...',
        algoliaOptions: {} // Optional, if provided by Algolia
    },

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks:
        [
            {href: "/", label: 'Home'},
            {page: 'getstarted', label: 'Get QuestDB'},
            {doc: 'documentationOverview', label: 'Documentation'},
            {blog: true, label: 'Blog'},
            {page: "careers", label: 'Careers'},
            {page: 'about', label: 'About'},
            {search: true}
            // {href: "https://github.com/questdb/questdb", label: 'GitHub'},
        ],
    // If you have users set above, you add it here:

    users,

    /* path to images for header/footer */
    headerIcon: 'img/QuestDB_Logo.png',
    footerIcon: 'img/QuestDB_Logo.png',
    favicon: 'img/favicon.png',

    /* Colors for website */
    /*    Both set to transparent to customise manually*/
    colors: {
        // primaryColor: '#2371b5',
        // secondaryColor: '#2371b5',
    },

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © ${new Date().getFullYear()} QuestDB`,

    //Tracking ID for Google analytics
    gaTrackingId: 'UA-145747842-1',

    //Pixel ID for facebook analytics
    facebookPixelId: '1724909280980398',

    highlight: {
        // themeUrl: '/css/code-highlight.css',
        hljs: function (hljs) {
            hljs.registerLanguage('sql', sql_qdb);
        }
    },

    cname: 'www.questdb.io',

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/favicon.png',
    twitterImage: 'img/favicon.png',

    // For sites with a sizable amount of content, set collapsible to true.
    // Expand/collapse the links and subcategories under categories.
    docsSideNavCollapsible: true,

    // Show documentation's last contributor's name.
    // enableUpdateBy: true,

    // Show documentation's last update time.
    enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...

    repoUrl: 'https://github.com/questdb/questdb',

    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js',
        '/js/console-demo.js',
        '/js/getstarted.js',
        '/js/signup.js'
    ],
    stylesheets: [
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,500,600,700|Source+Code+Pro:400,700|Open+Sans:300,400,600,700',
        '/css/code-block-buttons.css',
    ],
    separateCss: [
        '/css/code-block-buttons.css',
    ]

};


module.exports = siteConfig;
