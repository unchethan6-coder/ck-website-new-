import { getArticles } from "@/lib/cms";
import BlogClient from "@/components/blog/BlogClient";

export const revalidate = 300;

export default async function BlogPage() {
  const articles = await getArticles();
  return <BlogClient articles={articles} />;
}
