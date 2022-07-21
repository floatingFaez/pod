import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import HeaderSection from "@components/sections/headerSection";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { workQuery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import Worklist from "@components/worklist";

export default function Work(props) {
  const { postdata, siteconfig, preview } = props;

  const router = useRouter();

  const { data: posts } = usePreviewSubscription(workQuery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`Blog — ${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `Blog — ${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Stablo"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          
          <HeaderSection title="Current Project" subtitle="Our Work" classes="border-b txt-black theme-gray-bg"/>

          <Container className="txt-black theme-gray-bg">
            <div className="grid gap-10 mt-12 mb-12 pb-12 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 text-center">
              {posts.map(post => (
                <Worklist
                  key={post._id}
                  post={post}
                  aspect="square"
                />
              ))}
            </div>
          </Container>

        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(workQuery);
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
