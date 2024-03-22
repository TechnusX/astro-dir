export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        timeZone: "UTC",
    });
}

export function formatBlogPosts(posts, {
    filterOurDrafts = true,
    filterOurFuturePosts = true,
    sortByDate = true,
    limit = undefined,
} = {}) {
    const filteredPosts = posts.reduce((acc, post) => {
        const { date, draft } = post.frontmatter;

        if (filterOurDrafts && draft) return acc;

        if (filterOurFuturePosts && new Date(date) > new Date()) return acc;

        acc.push(post)

        return acc;
    }, [])

    // sortByDate or randomize
    if (sortByDate) {
        filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    } else {
        filteredPosts.sort(() => Math.random() - 0.5)
    }

    if (typeof limit === "number") {
        return filteredPosts.slice(0, limit);
    }
    return filteredPosts

}