import path from "path";
import fs from "fs";
import matter from "gray-matter";

const PROJECTS_PATH = path.join(process.cwd(), 'projects');

export const getSlugs = () => {
    const fileNames = fs.readdirSync(PROJECTS_PATH);
    return fileNames.map((fileName) => {
        const [slug, _] = fileName.split('.');
        return slug;
    });
}


export const getAllProjects = () => {
    const posts = getSlugs().map((slug) => getProjectFromSlug(slug));
    return posts;
}

export const getProjectFromSlug = (slug) => {
    const postPath = path.join(PROJECTS_PATH, slug + '.mdx');
    const source = fs.readFileSync(postPath);
    const {content, data} = matter(source);
    
    return {
        slug,
        data,
        content
    }
}