import { Post, Tag } from '.';

async function getPosts() {
    const key = process.env.DEV_TO_API_KEY ?? "";

    const response = await Promise.all([
        fetch("https://dev.to/api/articles?username=cleggacus", {
            headers: {
                "accept": "application/vnd.forem.api-v1+json",
                "api-key": key
            }
        }),
        fetch("https://dev.to/api/tags?per_page=1000", {
            headers: {
                "accept": "application/vnd.forem.api-v1+json",
                "api-key": key
            }
        }),
    ]);

    let posts = await response[0].json();
    let tags = await response[1].json() as Tag[];

    for(let i = 0; i < posts.length; i++) {
        posts[i].tag_list = (posts[i].tag_list as String[]).map(name => {
            let tag = tags.find(tag => tag.name == name)

            if(tag) {
                if(!tag.bg_color_hex) {
                    tag.bg_color_hex = "var(--bg-1)";
                }

                if(!tag.text_color_hex) {
                    tag.text_color_hex = "var(--fg-1)";
                }
            }

            return tag;
        });
    }

    return posts as Post[];
}

export default getPosts;
