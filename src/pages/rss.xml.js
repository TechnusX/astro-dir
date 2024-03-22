import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export function GET(context) {
    const postImportResult =
        import.meta.glob('./blog/**/*.md', { eager: true });
    const posts = Object.values(postImportResult);
    return rss({
        title: 'Buzz’s Blog',
        description: 'A humble Astronaut’s guide to the stars',
        site: context.site,
        items: posts.map((post) => ({
            link: post.url,
            content: sanitizeHtml(post.compiledContent()),
            ...post.frontmatter,
        })),
        stylesheet: '../../public/rss/styles.xsl',
    });
}