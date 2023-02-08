import path from "path";
import fs from "fs";
import matter from "gray-matter";

const POST_PATH = path.join(process.cwd(), 'posts');

export const getSlugs = () => {
    const fileNames = fs.readdirSync(POST_PATH);
    return fileNames.map((fileName) => {
        const [slug, _] = fileName.split('.');
        return slug;
    });
}


//Sorting will go here
export const getAllPosts = () => {
    const posts = getSlugs().map((slug) => getPostFromSlug(slug));
    return posts;
}

export const getPostFromSlug = (slug) => {
    const postPath = path.join(POST_PATH, slug + '.mdx');
    const source = fs.readFileSync(postPath);
    const {content, data} = matter(source);
    
    return {
        content,
        meta:{
            slug,
            data
        }
    }
}