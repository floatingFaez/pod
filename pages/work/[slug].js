import Image from "next/image";
import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import Subpagehero from "@components/sections/subpagehero";
import Campaign from "@components/work/campaign";
import Newsletter from "@components/newsletter";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";

import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { NextSeo } from "next-seo";
import defaultOG from "/public/img/opengraph.jpg";

import { singleWorkquery, configQuery, pathquery } from "@lib/groq";


export default function Post(props) {

  const { postdata, siteconfig, preview } = props;

  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singleWorkquery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  
  const imageProps = post?.mainImage
    ? GetImage(post?.mainImage)
    : null;

  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {post && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${post.title} - ${siteConfig.title}`}
            description={post.excerpt || ""}
            canonical={`${siteConfig?.url}/post/${post.slug.current}`}
            openGraph={{
              url: `${siteConfig?.url}/post/${post.slug.current}`,
              title: `${post.title} - ${siteConfig.title}`,
              description: post.excerpt || "",
              images: [
                {
                  url: GetImage(post?.mainImage).src || ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: siteConfig.title
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />

          <Container className="!pt-0" py="0">
            <Subpagehero title={post.title} subtitle={post.city}/>
          </Container>

          <Container>
            <div className="grid grid-cols-5 gap-5">
              <div className="col-span-3 pr-5">
                {post?.mainImage && <MainImage image={post.mainImage} />}
              </div>

              <div className="mt-12 mb-12 col-span-2">
                <div className="flex justify-between mb-4">
                  <h2 className="text-3xl font-normal tracking-tight text-center lg:leading-snug text-brand-primary lg:text-2xl dark:text-white">
                    {post?.campaign_name}
                  </h2>
                  <Link href="/work">
                      <a className="px-5 py-2 text-sm text-gray-500 font-regular rounded-full dark:text-gray-500 bg-brand-secondary/20 uppercase">
                        Back to Index
                      </a>
                    </Link>
                </div>
                
                <article className="max-w-screen-md mx-auto mb-5">
                  <div className="mx-auto prose prose-base dark:prose-invert prose-a:text-blue-500">
                    {post.body && <PortableText value={post.body} />}
                    <Campaign post={post} />
                  </div>
                </article>
              </div>
            </div>
          </Container>

          <Newsletter siteconfig={siteconfig} />

        </Layout>
      )}
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mt-12 mb-12 ">
      <Image {...GetImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-dark dark:text-white">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const post = await getClient(preview).fetch(singleWorkquery, {
    slug: params.slug
  });

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
